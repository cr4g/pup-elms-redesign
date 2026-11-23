// Relative sa oras ngayon para laging may "Due in 2 hrs" sa demo
const hoursFromNow = (h) =>
  new Date(Date.now() + h * 60 * 60 * 1000).toISOString()

export const assignments = [
  {
    id: 'a1',
    courseId: 'hci',
    title: 'Assignment 1',
    type: 'assignment',
    dueAt: hoursFromNow(2),
    instructions:
      'Submit your usability evaluation of a school system as a single PDF file.',
    acceptedTypes: ['application/pdf'],
    acceptedLabel: 'PDF',
    maxSizeMB: 2,
    maxFiles: 1,
  },
  {
    id: 'q1',
    courseId: 'cyber',
    title: 'Quiz 1',
    type: 'quiz', // quizzes are outside project scope, display lang
    dueAt: hoursFromNow(72),
    instructions: '',
  },
]