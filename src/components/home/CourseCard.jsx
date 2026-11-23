export default function CourseCard({ course, taskCount }) {
  return (
    <div className="course-card">
      <strong>{course.name}</strong>
      <div className="course-meta">
        {course.section} · {course.year}
      </div>
      {taskCount > 0 && (
        <div className="course-tasks">
          {taskCount} {taskCount === 1 ? 'Task' : 'Tasks'} Due
        </div>
      )}
    </div>
  )
}