# ANVL Documents Section — Setup Guide

## What's Included

New files to add to your `anvl-website` project:

```
src/
├── app/
│   ├── api/auth/documents/
│   │   └── route.ts          ← Password validation API
│   └── documents/
│       ├── layout.tsx         ← Auth gate (checks cookie)
│       ├── page.tsx           ← Documents hub (list of papers)
│       └── whitepaper/
│           └── page.tsx       ← Full white paper (all 12 sections + appendices)
└── components/custom/
    └── DocumentsAuth.tsx      ← Password input UI
```

## Setup

### 1. Copy files into your project

Extract the zip and copy the `src` folder contents into your existing `src` directory. 
No existing files are overwritten — these are all new paths.

### 2. Set the password

Add to your `.env.local` (create if it doesn't exist):

```
DOCUMENTS_PASSWORD=your-password-here
```

For Vercel production, add the same variable in:
**Vercel Dashboard → Settings → Environment Variables**

### 3. Test locally

```bash
npm run dev
```

Visit: `http://localhost:3000/documents`

You should see the password gate. Enter your password → redirects to the documents hub.

### 4. Update navigation (optional)

If you want to link to `/documents` from your main nav or the existing `/whitepaper` page, 
update those components to point to `/documents` instead.

You may also want to redirect `/whitepaper` → `/documents` so old links still work.
Add to `next.config.js`:

```js
async redirects() {
  return [
    {
      source: '/whitepaper',
      destination: '/documents',
      permanent: true,
    },
  ];
},
```

## How It Works

- **Password gate**: Server-side cookie check in `layout.tsx`. If no valid cookie, 
  shows the `DocumentsAuth` component instead of page content.
- **Cookie**: Set via API route, httpOnly, 30-day expiry, scoped to `/documents`.
- **Logout**: Button on the documents hub clears the cookie.
- **Adding new documents**: Edit the `documents` array in `/documents/page.tsx`.

## Future: Email-Gated Access

When ready to upgrade from shared password to email capture:
1. Replace the API route with email verification logic
2. Add a database (or use Vercel KV) to store authorized emails
3. The layout/cookie pattern stays the same — only the auth method changes
