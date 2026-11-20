create extension if not exists pgcrypto;

do $$ begin
  create type cms_role as enum ('super_admin','website_admin','editor','translator','reviewer','read_only');
exception when duplicate_object then null;
end $$;
do $$ begin
  create type cms_status as enum ('draft','pending_review','changes_requested','approved','scheduled','published','unpublished','archived');
exception when duplicate_object then null;
end $$;
do $$ begin
  create type translation_status as enum ('not_started','draft','in_translation','awaiting_review','changes_requested','approved','published');
exception when duplicate_object then null;
end $$;

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  active boolean not null default true,
  role cms_role not null default 'read_only',
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists permissions (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  description text not null
);

create table if not exists role_permissions (
  role cms_role not null,
  permission_id uuid not null references permissions(id) on delete cascade,
  primary key (role, permission_id)
);

create table if not exists content_items (
  id uuid primary key default gen_random_uuid(),
  content_type text not null check (content_type in ('news','statement','engagement','event','publication','institutional_page','ambassador','cooperation')),
  identity_key uuid not null default gen_random_uuid(),
  language text not null check (language in ('en','it','sw')),
  title text not null default '',
  slug text,
  summary text,
  body text,
  featured_media_id uuid,
  category text,
  tags text[] not null default '{}',
  source_reference text,
  seo_title text,
  seo_description text,
  status cms_status not null default 'draft',
  publication_at timestamptz,
  published_at timestamptz,
  created_by uuid not null references profiles(id),
  updated_by uuid references profiles(id),
  assigned_reviewer uuid references profiles(id),
  version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (identity_key, language)
);
create index if not exists content_items_lookup_idx on content_items(content_type, language, status, publication_at);
create index if not exists content_items_slug_idx on content_items(slug) where slug is not null;

create table if not exists diplomatic_engagements (
  id uuid primary key references content_items(id) on delete cascade,
  engagement_date timestamptz,
  location text,
  participants text,
  related_statement_id uuid,
  related_publication_id uuid
);

create table if not exists events (
  id uuid primary key references content_items(id) on delete cascade,
  start_at timestamptz not null,
  end_at timestamptz,
  location text,
  event_status text not null default 'upcoming' check (event_status in ('upcoming','completed','cancelled'))
);

create table if not exists publications (
  id uuid primary key references content_items(id) on delete cascade,
  document_media_id uuid,
  issuing_institution text,
  download_available boolean not null default true
);

create table if not exists media_assets (
  id uuid primary key default gen_random_uuid(),
  original_filename text not null,
  stored_filename text not null,
  bucket text not null,
  storage_path text not null,
  file_type text not null,
  file_size bigint not null check (file_size >= 0),
  dimensions jsonb,
  description text,
  alt_text text,
  photographer text,
  source text,
  copyright_holder text,
  licence_status text not null default 'unverified',
  attribution text,
  usage_permissions text,
  usage_rights_verified boolean not null default false,
  archived boolean not null default false,
  uploaded_by uuid not null references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table content_items add constraint content_featured_media_fk
  foreign key (featured_media_id) references media_assets(id) on delete set null;
alter table publications add constraint publication_document_media_fk
  foreign key (document_media_id) references media_assets(id) on delete set null;

create table if not exists translations (
  id uuid primary key default gen_random_uuid(),
  content_identity uuid not null,
  source_language text not null check (source_language in ('en','it','sw')),
  target_language text not null check (target_language in ('en','it','sw')),
  content_item_id uuid references content_items(id) on delete set null,
  status translation_status not null default 'not_started',
  assigned_to uuid references profiles(id),
  reviewer_id uuid references profiles(id),
  feedback text,
  created_by uuid not null references profiles(id),
  updated_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (content_identity, target_language)
);

create table if not exists approval_records (
  id uuid primary key default gen_random_uuid(),
  content_item_id uuid not null references content_items(id) on delete cascade,
  action text not null check (action in ('submitted','approved','rejected','changes_requested','published','unpublished','archived')),
  actor_id uuid not null references profiles(id),
  reason text,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists publishing_schedules (
  id uuid primary key default gen_random_uuid(),
  content_item_id uuid not null references content_items(id) on delete cascade,
  scheduled_at timestamptz not null,
  timezone text not null default 'Africa/Nairobi',
  cancelled_at timestamptz,
  published_at timestamptz,
  created_by uuid not null references profiles(id),
  created_at timestamptz not null default now()
);

create table if not exists ambassador_content (
  id uuid primary key references content_items(id) on delete cascade,
  portrait_media_id uuid references media_assets(id) on delete set null,
  name text,
  title text,
  diplomatic_priorities text[]
);

create table if not exists timeline_milestones (
  id uuid primary key default gen_random_uuid(),
  content_identity uuid not null unique,
  occurred_at date,
  title text not null,
  description text,
  status cms_status not null default 'draft',
  created_by uuid not null references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists cooperation_priorities (
  id uuid primary key default gen_random_uuid(),
  content_identity uuid not null unique,
  title text not null,
  description text,
  status cms_status not null default 'draft',
  sort_order integer not null default 0,
  created_by uuid not null references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists institutional_pages (
  id uuid primary key references content_items(id) on delete cascade,
  page_key text not null check (page_key in ('about','ambassador','relations','kenya','cooperation','contact','privacy','accessibility'))
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references profiles(id),
  action text not null,
  target_type text,
  target_id uuid,
  metadata jsonb not null default '{}',
  result text not null default 'success',
  created_at timestamptz not null default now()
);
create index if not exists audit_logs_created_idx on audit_logs(created_at desc);

create table if not exists website_settings (
  key text primary key,
  value jsonb not null,
  updated_by uuid references profiles(id),
  updated_at timestamptz not null default now()
);

create or replace function current_profile_role()
returns cms_role language sql stable security definer set search_path = public as $$
  select role from profiles where id = auth.uid() and active = true
$$;

create or replace function has_permission(required text)
returns boolean language sql stable security definer set search_path = public as $$
  select case
    when required is null then false
    when (select role from profiles where id = auth.uid() and active) = 'super_admin' then true
    else exists (
      select 1 from role_permissions rp
      join permissions p on p.id = rp.permission_id
      where rp.role = (select role from profiles where id = auth.uid() and active)
        and p.key = required
    )
  end
$$;

insert into permissions (key, description) values
 ('content.manage','Create and edit managed content'),
 ('content.publish','Publish approved content'),
 ('content.approve','Approve or reject content'),
 ('media.manage','Manage media assets'),
 ('users.manage','Invite and manage staff'),
 ('settings.manage','Manage website settings'),
 ('audit.view','View audit logs'),
 ('translations.manage','Manage translations')
on conflict (key) do nothing;

insert into role_permissions(role, permission_id)
select role, p.id from (values
 ('website_admin','content.manage'), ('website_admin','content.publish'), ('website_admin','media.manage'),
 ('website_admin','translations.manage'), ('website_admin','content.approve'),
 ('editor','content.manage'), ('editor','media.manage'),
 ('translator','translations.manage'),
 ('reviewer','content.approve'), ('reviewer','translations.manage'),
 ('read_only',null)
) x(role,key)
join permissions p on p.key = x.key
on conflict do nothing;

alter table profiles enable row level security;
alter table permissions enable row level security;
alter table role_permissions enable row level security;
alter table content_items enable row level security;
alter table diplomatic_engagements enable row level security;
alter table events enable row level security;
alter table publications enable row level security;
alter table media_assets enable row level security;
alter table translations enable row level security;
alter table approval_records enable row level security;
alter table publishing_schedules enable row level security;
alter table ambassador_content enable row level security;
alter table timeline_milestones enable row level security;
alter table cooperation_priorities enable row level security;
alter table institutional_pages enable row level security;
alter table audit_logs enable row level security;
alter table website_settings enable row level security;

create policy "staff read own profile" on profiles for select using (id = auth.uid() or has_permission('users.manage'));
create policy "admins manage profiles" on profiles for all using (has_permission('users.manage'))
  with check (has_permission('users.manage'));
create policy "authenticated read permissions" on permissions for select to authenticated using (true);
create policy "authenticated read role permissions" on role_permissions for select to authenticated using (true);

create policy "public published content" on content_items for select to anon, authenticated
  using (status = 'published' and publication_at is not null and publication_at <= now());
create policy "staff read content" on content_items for select to authenticated
  using ((select active from profiles where id = auth.uid()) and has_permission('content.manage'));
create policy "staff manage content" on content_items for all to authenticated
  using ((select active from profiles where id = auth.uid()) and has_permission('content.manage'))
  with check ((select active from profiles where id = auth.uid()) and has_permission('content.manage'));

create policy "public published specialized" on diplomatic_engagements for select to anon, authenticated
  using (exists (select 1 from content_items c where c.id = diplomatic_engagements.id and c.status='published' and c.publication_at <= now()));
create policy "staff manage specialized" on diplomatic_engagements for all to authenticated
  using (has_permission('content.manage')) with check (has_permission('content.manage'));

create policy "public published events" on events for select to anon, authenticated
  using (exists (select 1 from content_items c where c.id = events.id and c.status='published' and c.publication_at <= now()));
create policy "staff manage events" on events for all to authenticated
  using (has_permission('content.manage')) with check (has_permission('content.manage'));
create policy "public published publications" on publications for select to anon, authenticated
  using (exists (select 1 from content_items c where c.id = publications.id and c.status='published' and c.publication_at <= now()));
create policy "staff manage publications" on publications for all to authenticated
  using (has_permission('content.manage')) with check (has_permission('content.manage'));

create policy "staff media" on media_assets for all to authenticated
  using (has_permission('media.manage')) with check (has_permission('media.manage'));
create policy "staff translations" on translations for all to authenticated
  using (has_permission('translations.manage')) with check (has_permission('translations.manage'));
create policy "review approval read" on approval_records for select to authenticated
  using (has_permission('content.approve') or has_permission('content.manage'));
create policy "review approval write" on approval_records for insert to authenticated
  with check (has_permission('content.approve') or has_permission('content.publish'));
create policy "staff schedules" on publishing_schedules for all to authenticated
  using (has_permission('content.publish') or has_permission('content.manage'))
  with check (has_permission('content.publish') or has_permission('content.manage'));
create policy "staff ambassador" on ambassador_content for all to authenticated
  using (has_permission('content.manage')) with check (has_permission('content.manage'));
create policy "staff timeline" on timeline_milestones for all to authenticated
  using (has_permission('content.manage')) with check (has_permission('content.manage'));
create policy "staff cooperation" on cooperation_priorities for all to authenticated
  using (has_permission('content.manage')) with check (has_permission('content.manage'));
create policy "staff pages" on institutional_pages for all to authenticated
  using (has_permission('content.manage')) with check (has_permission('content.manage'));
create policy "audit restricted" on audit_logs for select to authenticated using (has_permission('audit.view'));
create policy "audit insert" on audit_logs for insert to authenticated with check (auth.uid() is not null);
create policy "settings read" on website_settings for select to authenticated using (has_permission('settings.manage'));
create policy "settings manage" on website_settings for all to authenticated
  using (has_permission('settings.manage')) with check (has_permission('settings.manage'));

grant usage on schema public to anon, authenticated;
grant select on content_items to anon;
