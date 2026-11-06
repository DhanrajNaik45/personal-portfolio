# Dhanraj Naik: Portfolio

Personal portfolio for a software and CRM developer. The contact form saves each message as a new row in a private Google Sheet.

## Run locally

```bash
npm install
cp .env.example .env   # then fill in the values
npm start
```

Open http://localhost:3000

## Deploy on Vercel

The site is served from `public/`. The contact form is the serverless function `api/contact.js`. In the Vercel project, open **Settings, then Environment Variables**, and add:

| Name | Value |
|---|---|
| `GOOGLE_SHEET_ID` | the ID from your sheet's link |
| `GOOGLE_SHEET_TAB` | `Contacts` |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | the full contents of your service account JSON key |

Then redeploy. `local-server.js` is for local development only.

## Contact form setup

1. Create a Google Cloud service account and turn on the Google Sheets API.
2. Save its JSON key as `service-account.json` (or set `GOOGLE_SERVICE_ACCOUNT_JSON` on your host).
3. Share your Google Sheet with the service account's email as Editor.
4. Set `GOOGLE_SHEET_ID` and `GOOGLE_SHEET_TAB` in `.env`.

`.env` and `service-account.json` are git-ignored. Never commit them.

## Edit the content

All text, projects and links are in `public/data.js`. The photo is `public/photo.jpg`.

## Test

```bash
npm test
```
