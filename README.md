# metabase-NEOLAiA

Public dashboard viewer built with a Node.js/Express backend and a React frontend. Dashboards are embedded as signed iframes from a Metabase instance.

---

## Project structure

```
metabase/                              # Docker Compose for Metabase
public_dashboard/
  backend/
    server.js                          # Express API — generates signed embed URLs
  frontend/metabase-dash/
    public/
      dashboards.json                  # ← edit this to add/remove dashboards
    src/
      hooks/
        useDashboards.js               # Fetches dashboards.json at runtime
      pages/
        home.js                        # Landing page — reads dashboards.json
        EmbedDash.js                   # Generic iframe component
        DashLoader.js                  # Resolves :dashId from URL → EmbedDash
      App.js                           # Router (no changes needed for new dashboards)
      api.js                           # Backend base URL
```

---

## How to add a new dashboard

### 1 — Enable embedding in Metabase

Open your Metabase instance, navigate to the target dashboard and make sure **Embedding** is enabled. Note the **numeric dashboard ID** shown in the URL (e.g. `5`).

### 2 — Add a backend endpoint (`server.js`)

Open `public_dashboard/backend/server.js` and add a new route:

```js
app.get("/nodedash/my-new-dashboard", (req, res) => {
  const payload = {
    resource: { dashboard: 5 },   // ← Metabase dashboard ID
    params: {},
    exp: Math.round(Date.now() / 1000) + 10 * 60,
  };
  const token = jwt.sign(payload, METABASE_SECRET_KEY);
  const iframeUrl = `${METABASE_SITE_URL}/embed/dashboard/${token}#bordered=true&titled=true`;
  res.json({ iframeUrl });
});
```

### 3 — Add an entry to `dashboards.json`

Open `public/dashboards.json` and append a new object to the array:

```json
{
  "id": "my-new-dashboard",
  "label": "My New Dashboard",
  "description": "Short description shown on the landing card.",
  "icon": "📊",
  "path": "my-new-dashboard",
  "endpoint": "my-new-dashboard"
}
```

| Field | Description |
|---|---|
| `id` | Unique identifier (used as React key) |
| `label` | Title shown on the card and in the iframe |
| `description` | Subtitle shown on the card |
| `icon` | Emoji shown on the card |
| `path` | URL segment: `/neoview/<path>` |
| `endpoint` | Backend route name (without `/nodedash/`) — must match step 2 |

That's it. No changes to `App.js` or any other React source file are required.

### 4 — Restart the services

```bash
# backend
cd public_dashboard/backend && npm start

# frontend
cd public_dashboard/frontend/metabase-dash && npm start
```

The new dashboard will appear as a card on `/neoview/` and will open in a new tab at `/neoview/my-new-dashboard`.

---

## Environment variables (backend)

Create a `.env` file in `public_dashboard/backend/`:

```
METABASE_SITE_URL=https://your-metabase-instance.example.com
METABASE_SECRET_KEY=your_metabase_secret_key
PORT=5000
```
