# Desk, London hacker house

Rent a desk by the hour: 5 USDC an hour, paid from a Solana wallet through Mesub (plan `desk`). Sign once, it renews every hour, cancel anytime. The rental ends Nov 12, 23:59 UTC.

## Run

```sh
npm install
cp .env.example .env.local   # then fill both values
npm run dev
```

- `MESUB_API_KEY`: the project's API key, from the Mesub dashboard (Developers). Server only.
- `SESSION_SECRET`: any long random string, signs the session cookie (`openssl rand -hex 32`).

## How it is wired

- `lib/mesub.ts`: the one Mesub client of the server.
- `lib/session.ts`, `app/login/`: a demo login, an HMAC-signed cookie. The only source of who is asking.
- `app/api/mesub/[...mesub]/route.ts`: the routes the widget calls.
- `app/api/desk/route.ts`: a paid API, gated with `withMesub`.
- `app/desk/page.tsx`: the paid page, gated on the server with `hasAccess`.
- `components/mesub-root.tsx`: `MesubProvider`, on `solana:mainnet`.
- `components/desk-buttons.tsx`: Rent (`SubscribeButton`) and Manage (`ManageButton`).
