#Team n.o:5

#team members:Aneez muhammed N & Nirenjana MP

# TeachBridge
A structured bridge between teachers who are in need of serious rest or arent available due to emergency and students. — multi-class demo (B.Tech CSE Sem 3 and Sem 5 / Machine Learning).

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

## Build for Local host

```bash
npm run build
npm run preview
```
#Honest limitations (this is a demo, not a product)
All data is mocked/in-memory (see src/data/mockData.ts) — it resets on page refresh, there's no real database yet.
Login is a mocked password check, not real authentication.
There's no AI actually generating quizzes or grading doubts right now — the teacher fills those in herself, once, ahead of time. The "AI takes the class" framing describes the experience the app is built toward (a class that runs itself once set up) — real AI-assisted content generation, analytics, and auto-recommendations are the natural next step (see below).
Only two demo sections are wired up; more would just mean more entries in mockData.ts today, and a real backend down the line.
Where this goes next
Real database + real authentication

#AI-powered content generation (quiz drafts from the uploaded PDF, auto-suggested videos)
Learning analytics — which topics a class is actually struggling with
Notifications so a teacher on bed rest gets pinged only for what truly needs her
A mobile app, so "checking in on class" takes ten seconds, not ten minutes

## Notes

- All data is mocked/in-memory per class (see `src/data/mockData.ts`) — resets on page refresh.
- Login is a mocked password check, not real auth — fine for a hackathon demo.
- S3 and S5 are two independent mock classes; a teacher editing one never touches the other.
