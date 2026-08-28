
## Simple Portfolio (React)

Simple Portfolio Website made with React.js.


## Demo

https://rahmanow.com


## Development

```bash
npm install
npm start        # dev server on http://localhost:3000
npm test         # jest + testing-library
npm run build    # production build into ./build
```

Site content (name, bio, skills, social links, footer) lives in `src/data.js`.
Skills are ordered by `level` and dimmed as the level drops; `level: "0"` hides
a skill entirely.


## Deployment (Cloudflare Workers)

The site is served as an assets-only Worker — the build output is uploaded and
served from Cloudflare's edge, with no Worker script. Configuration is in
`wrangler.jsonc`.

```bash
npm run preview  # build + serve locally through wrangler
npm run deploy   # build + wrangler deploy
```

`wrangler deploy` needs credentials: either run `wrangler login` once, or set
`CLOUDFLARE_API_TOKEN` (a token with the *Edit Cloudflare Workers* template).
