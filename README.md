# CAPcomp

Live site: https://capcomp-xi.vercel.app/

## What this is
Next.js app deployed on Vercel with Supabase for data.

## How it works
- Frontend: Next.js (App Router).
- Data: Supabase (tables, policies).
- Deploys: Auto from GitHub → Vercel.

## Environment variables (set in Vercel → Project → Settings → Environment Variables)
- NEXT_PUBLIC_SUPABASE_URL = https://kewvlusxomsdbygpngmc.supabase.co
- NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtld3ZsdXN4b21zZGJ5Z3BuZ21jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5MjUyMDcsImV4cCI6MjA3NDUwMTIwN30.Ua0Y99PctOhGBtU6N30k_Z1tb5ug2g2HuhmHUkKgFVU

## Edit & Deploy
- Edit files in GitHub → Commit → Vercel auto-rebuilds.
- Homepage: `app/page.tsx`
- Layout: `app/layout.tsx`
- Public assets (images): `/public`

## Useful links
- Vercel dashboard: https://capcomp-xi.vercel.app/
- Supabase dashboard: https://kewvlusxomsdbygpngmc.supabase.co
