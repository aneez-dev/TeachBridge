import type { AppState, ClassId, ClassState, Doubt, QuizAttempt, QuizQuestion, VideoResource } from '../types'

// ---- Class metadata (no more hardcoded single class) ----

export interface ClassCredential {
  id: string
  password: string
  displayName: string
}

export interface ClassMeta {
  classId: ClassId
  label: string
  subject: string
  student: ClassCredential
}

// One shared teacher login — the same teacher account can manage either
// class after logging in, simply by picking S3 or S5.
export const TEACHER_CREDENTIAL: ClassCredential = {
  id: 'faculty',
  password: 'cet@2026',
  displayName: 'Prof. Nandini',
}

export const CLASSES: Record<ClassId, ClassMeta> = {
  S3: {
    classId: 'S3',
    label: 'B.Tech CSE · Semester 3',
    subject: 'Graph Traversal: BFS & DFS',
    student: { id: 'student01', password: 'bcse2026', displayName: 'Aisha Menon' },
  },
  S5: {
    classId: 'S5',
    label: 'B.Tech CSE · Semester 5',
    subject: 'Machine Learning',
    student: { id: 'student05', password: 'ml2026', displayName: 'Devika Suresh' },
  },
}

export const CLASS_LIST: ClassId[] = ['S3', 'S5']

// ---- S3 seed data (Graph Traversal) ----

const s3Resources: VideoResource[] = [
  {
    id: 'r1',
    title: 'Breadth-First Search (BFS) Explained Visually',
    url: 'https://www.youtube.com/watch?v=xlVX7dXLS64',
    channel: 'CS Dojo',
    approved: true,
  },
  {
    id: 'r2',
    title: 'Depth-First Search (DFS) — Full Walkthrough',
    url: 'https://www.youtube.com/watch?v=PMMc4VsIacU',
    channel: 'takeUforward',
    approved: true,
  },
  {
    id: 'r3',
    title: 'BFS vs DFS — When to Use Which',
    url: 'https://www.youtube.com/watch?v=pcKY4hjDrxk',
    channel: 'Abdul Bari',
    approved: false,
  },
]

const s3Quiz: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Which data structure does BFS use to keep track of nodes to visit next?',
    options: ['Stack', 'Queue', 'Priority Queue', 'Linked List'],
    correctIndex: 1,
  },
  {
    id: 'q2',
    question: 'DFS is naturally implemented using which approach?',
    options: ['Iteration only', 'Recursion or an explicit stack', 'Hashing', 'Sorting first'],
    correctIndex: 1,
  },
  {
    id: 'q3',
    question: 'What is the time complexity of BFS/DFS on a graph with V vertices and E edges?',
    options: ['O(V)', 'O(E)', 'O(V + E)', 'O(V * E)'],
    correctIndex: 2,
  },
  {
    id: 'q4',
    question: 'Which traversal is better suited for finding the shortest path in an unweighted graph?',
    options: ['DFS', 'BFS', 'Both equally', 'Neither'],
    correctIndex: 1,
  },
]

const s3Doubts: Doubt[] = [
  {
    id: 'd1',
    studentName: 'Aisha Menon',
    initials: 'AM',
    time: '9:14 AM',
    question: 'Why does BFS use a queue and not a stack — what actually breaks if we swap it?',
    status: 'answered',
    teacherReply: 'A queue keeps traversal level-by-level, which is what guarantees shortest path in unweighted graphs. A stack would make it behave like DFS instead.',
  },
  {
    id: 'd2',
    studentName: 'Rohan Pillai',
    initials: 'RP',
    time: '9:26 AM',
    question: 'In DFS, when do we actually need to mark a node visited — before or after the recursive call?',
    status: 'pending',
  },
  {
    id: 'd3',
    studentName: 'Meera Nair',
    initials: 'MN',
    time: '9:41 AM',
    question: 'Can DFS get stuck in an infinite loop on a graph with cycles if we forget the visited set?',
    status: 'pending',
  },
]

const s3Attempts: QuizAttempt[] = [
  { studentName: 'Aisha Menon', initials: 'AM', score: 4, total: 4, time: '9:20 AM', result: 'Good understanding' },
  { studentName: 'Rohan Pillai', initials: 'RP', score: 3, total: 4, time: '9:31 AM', result: 'Partial understanding' },
  { studentName: 'Meera Nair', initials: 'MN', score: 4, total: 4, time: '9:45 AM', result: 'Good understanding' },
]

// ---- S5 seed data (Machine Learning — L1 / L2) ----

const s5Resources: VideoResource[] = [
  {
    id: 'mr1',
    title: 'Machine Learning Explained in 10 Minutes',
    url: 'https://www.youtube.com/watch?v=ukzFI9rgwfU',
    channel: 'Zach Star',
    approved: true,
  },
  {
    id: 'mr2',
    title: 'Supervised vs Unsupervised Learning',
    url: 'https://www.youtube.com/watch?v=1FZ0A1QCMWc',
    channel: 'IBM Technology',
    approved: true,
  },
  {
    id: 'mr3',
    title: 'Linear Regression, Clearly Explained',
    url: 'https://www.youtube.com/watch?v=nk2CQITm_eo',
    channel: 'StatQuest',
    approved: false,
  },
]

const s5Quiz: QuizQuestion[] = [
  {
    id: 'mq1',
    question: 'Machine Learning is best described as a system that:',
    options: [
      'Follows only hardcoded rules',
      'Learns patterns from data to make predictions',
      'Only stores data in a database',
      'Replaces the need for any data',
    ],
    correctIndex: 1,
  },
  {
    id: 'mq2',
    question: 'Which of these is an example of supervised learning?',
    options: [
      'Grouping customers with no labels',
      'Predicting house prices from labeled past sales',
      'Random number generation',
      'Sorting an array',
    ],
    correctIndex: 1,
  },
  {
    id: 'mq3',
    question: 'In Linear Regression, we are trying to find:',
    options: [
      'A decision tree',
      'The best-fit line minimizing prediction error',
      'The largest cluster',
      'A random weight matrix',
    ],
    correctIndex: 1,
  },
]

const s5Doubts: Doubt[] = [
  {
    id: 'md1',
    studentName: 'Devika Suresh',
    initials: 'DS',
    time: '10:05 AM',
    question: 'What is the actual difference between supervised and unsupervised learning, in one line?',
    status: 'pending',
  },
]

const s5Attempts: QuizAttempt[] = [
  { studentName: 'Devika Suresh', initials: 'DS', score: 3, total: 3, time: '10:12 AM', result: 'Good understanding' },
]

function makeClassState(
  meta: { classId: ClassId; label: string; subject: string },
  topic: string,
  topicOptions: string[],
  pdfs: { id: string; name: string; uploadedAt: string }[],
  resources: VideoResource[],
  quiz: QuizQuestion[],
  doubts: Doubt[],
  attempts: QuizAttempt[],
  attendance: { present: number; total: number }
): ClassState {
  return {
    classId: meta.classId,
    label: meta.label,
    subject: meta.subject,
    classSetup: {
      topic,
      topicOptions,
      pdfs,
      resourcesGenerated: true,
      resources,
      resourcesPublished: true,
      quizGenerated: true,
      quiz,
      quizPublished: true,
    },
    doubts,
    attempts,
    attendance,
    recoveryMode: false,
  }
}

export const initialState: AppState = {
  classes: {
    S3: makeClassState(
      CLASSES.S3,
      'Graph Traversal: BFS & DFS',
      ['Graph Traversal: BFS & DFS', 'Trees & Binary Search Trees'],
      [{ id: 'p1', name: 'graph-traversal-notes.pdf', uploadedAt: '9:00 AM' }],
      s3Resources,
      s3Quiz,
      s3Doubts,
      s3Attempts,
      { present: 41, total: 48 }
    ),
    S5: makeClassState(
      CLASSES.S5,
      'L1: Introduction to Machine Learning',
      ['L1: Introduction to Machine Learning', 'L2: Supervised Learning & Linear Regression'],
      [{ id: 'p2', name: 'ml-L1-intro-notes.pdf', uploadedAt: '10:00 AM' }],
      s5Resources,
      s5Quiz,
      s5Doubts,
      s5Attempts,
      { present: 27, total: 33 }
    ),
  },
}

// Backwards-compatible seed export (used as a fallback when adding a fresh quiz)
export const seedQuiz = s3Quiz
