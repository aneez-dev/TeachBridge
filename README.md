# TeachBridge

A structured bridge between teachers and students — multi-class demo (B.Tech CSE Sem 3 and Sem 5 / Machine Learning).

## Run via Vercel:

https://teach-bridge-one.vercel.app/

**Demo logins**

| Class | Role | Password |
|---|---|---|
| S3 — Graph Traversal (BFS & DFS) | Teacher | `cet@2026` |
| S3 — Graph Traversal (BFS & DFS) | Student | `bcse2026` |
| S5 — Machine Learning (L1 / L2) | Teacher | `ml@2026` |
| S5 — Machine Learning (L1 / L2) | Student | `ml2026` |

Name field accepts anything — pick the class + role tabs on the login screen, the password shown for that combo is filled in as a hint at the bottom of the form.

A logged-in teacher can also jump between S3 and S5 instantly via the "Switch class" control in the header (demo convenience — each class's data stays fully separate).

## Build

```bash
npm run build
npm run preview
```

## Deploy to Vercel (via GitHub)

1. Push this folder to a new GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "TeachBridge MVP"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. Go to https://vercel.com/new, import the repo.
3. Framework preset: **Vite**. Build command `npm run build`, output dir `dist` (Vercel usually auto-detects this).
4. Deploy. The included `vercel.json` handles client-side routing so `/student` and `/` both work on refresh.

## Notes

- All data is mocked/in-memory per class (see `src/data/mockData.ts`) — resets on page refresh.
- Login is a mocked password check, not real auth — fine for a hackathon demo.
- S3 and S5 are two independent mock classes; a teacher editing one never touches the other.
- "Ask AI" has been removed — students submit doubts directly to their teacher ("Ask Teacher"), and teachers reply from their dashboard.
