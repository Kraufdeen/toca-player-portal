# TOCA Player Portal

Single Page Application using React + TypeScript frontend and Node.js + TypeScript backend.


## Single-Server Host Instructions

This mode builds the React app and serves it from the Node server, so there is only one server process and one URL.

One-time setup (node must be installed on the device):

```bash
npm run install:all
```

Start host mode:

```bash
npm run host
```

When the server starts, the last log line prints:

```text
Open in browser: http://localhost:3000
```

This is the address to view the application in a browser.

App URL (other devices on same network):

```text
http://<your-local-ip>:3000
```

If needed, allow inbound TCP port `3000` in your firewall settings.

Stop host mode:

- Press `Ctrl+C` in the terminal running `npm run host`.
- If the terminal was closed, kill by port:
  - macOS/Linux: `lsof -ti :3000 | xargs kill -9`
  - Windows (PowerShell): `Get-NetTCPConnection -LocalPort 3000 | Select-Object -ExpandProperty OwningProcess | ForEach-Object { Stop-Process -Id $_ -Force }`

