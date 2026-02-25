# TOCA Player Portal

Single Page Application using React + TypeScript frontend and Node.js + TypeScript backend.

## Development

Run backend:

```bash
npm --prefix server run dev
```

Run frontend:

```bash
npm --prefix client run dev
```

## Single-Server Host Mode (for sharing on local network)

This mode builds the React app and serves it from the Node server, so there is only one server process and one URL.

One-time setup:

```bash
npm run install:all
```

Start host mode:

```bash
npm run host
```

Stop host mode (kills process on port `3000`):

```bash
npm run stop
```

App URL (same machine):

```text
http://localhost:3000
```

App URL (other devices on same network):

```text
http://<your-local-ip>:3000
```

If needed, allow inbound TCP port `3000` in your firewall settings.

## Manual Test Plan

- Sign in with a known player email and confirm Home loads past sessions and future appointments.
- Click a past training session and confirm Session Details screen opens.
- Open About TOCA and confirm informational content renders.
- Open Profile and confirm player email and profile fields render.
- Click Logout and confirm app returns to Sign in.
- From another device on the same network, open `http://<your-local-ip>:3000` and repeat basic sign-in flow.
