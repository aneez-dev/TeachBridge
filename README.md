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

## Notes

- All data is mocked/in-memory per class (see `src/data/mockData.ts`) — resets on page refresh.
- Login is a mocked password check, not real auth — fine for a hackathon demo.
- S3 and S5 are two independent mock classes; a teacher editing one never touches the other.
- "Ask AI" has been removed — students submit doubts directly to their teacher ("Ask Teacher"), and teachers reply from their dashboard.
