
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
a skill entirely. The dimming bottoms out at `text-gray-500`, the lightest gray
that still clears WCAG's 4.5:1 contrast minimum on the white page; a test
asserts this, so lightening the ramp further fails CI.


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


## CI

`.github/workflows/ci.yml` runs tests and a build on every push and pull
request, then deploys to Cloudflare Workers on pushes to `master`. The deploy
reuses the artifact the test job built, so what ships is what was tested.

It calls the pinned `wrangler` devDependency directly rather than a third-party
action. To enable deploys, add one repository secret under
**Settings > Secrets and variables > Actions**:

| Secret | Required | Notes |
| --- | --- | --- |
| `CLOUDFLARE_API_TOKEN` | yes | Create from the *Edit Cloudflare Workers* template |
| `CLOUDFLARE_ACCOUNT_ID` | only if the token can see more than one account | |

Until the token is set, the deploy job fails fast with a message saying so;
tests and builds still run.
