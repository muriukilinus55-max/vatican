insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('embassy-media','embassy-media',false,10485760,
   array['image/jpeg','image/png','image/webp','image/avif','application/pdf']),
  ('embassy-publications','embassy-publications',false,20971520,
   array['application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "staff upload media" on storage.objects for insert to authenticated
with check (
  bucket_id = 'embassy-media'
  and (select public.has_permission('media.manage'))
);
create policy "staff read media" on storage.objects for select to authenticated
using (
  bucket_id in ('embassy-media','embassy-publications')
  and (select public.has_permission('media.manage'))
);
create policy "staff upload publications" on storage.objects for insert to authenticated
with check (
  bucket_id = 'embassy-publications'
  and (select public.has_permission('content.manage'))
);
create policy "staff delete uploads" on storage.objects for delete to authenticated
using (
  bucket_id in ('embassy-media','embassy-publications')
  and (select public.has_permission('media.manage'))
);
