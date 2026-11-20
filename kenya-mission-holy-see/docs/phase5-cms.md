# Phase 5 CMS integration

## Status

The application boundaries, schema and RLS migration are implemented, but the CMS is blocked from live operation until an independent Supabase project is provisioned and authorised.

No production credentials, fake accounts or invented records are included.

## Required configuration

Set only these server/environment values in the deployment:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `CMS_SCHEDULER_SECRET`
- `SUPABASE_SERVICE_ROLE_KEY` on the server only

Do not place the service-role key or scheduler secret in browser code or `NEXT_PUBLIC_*` variables.

## Database migrations

Apply:

1. `supabase/migrations/20261118000000_phase5_cms.sql`
2. `supabase/migrations/20261118000100_phase5_storage.sql`

Use one project dedicated exclusively to this website. Do not use an IBMS or other application's database.

## Authentication

Supabase Auth handles password and session security. Public registration routes do not exist. Administrators must invite staff through the Supabase/Auth administration process and set an active profile record. Enable MFA in Supabase Auth for administrative accounts where supported.

The `/admin` proxy is an optimistic route check; server components, server actions and RLS remain the authoritative authorization boundaries.

## Roles

- Super Administrator: all permissions and user/settings/audit administration.
- Website Administrator: content, publication, media and translation management.
- Editor: content and media management.
- Translator: translation management.
- Reviewer: approval and translation review.
- Read-only Officer: no mutation permission.

## Publishing schedule

`POST /api/admin/publish-scheduled` requires `Authorization: Bearer <CMS_SCHEDULER_SECRET>`. Configure an external cron or Supabase scheduled function to call it periodically. The endpoint publishes only schedules due at execution time whose linked content status is `approved`.

Default administrative timezone is Africa/Nairobi. Store scheduled timestamps in UTC and display Africa/Nairobi unless a location-specific event timezone is selected.

## Storage

The migration creates private `embassy-media` and `embassy-publications` buckets. Storage policies require staff media/content permissions. Public publication must be implemented with a server-controlled, signed/publication-eligible mapping; uploaded files are not public merely because they exist.

## Backup and recovery

Actual backup frequency and retention are determined by the selected Supabase plan. Until a project is configured, no backup arrangement has been verified. Database and object storage backups must be configured and tested separately. Document restoration ownership and a staff-account recovery process before production use.
