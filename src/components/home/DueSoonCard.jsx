import { Link } from 'react-router-dom'
import useCountdown from '../../hooks/useCountdown'

export default function DueSoonCard({ assignment, courseName }) {
  const { label, urgent } = useCountdown(assignment.dueAt)
  const isAssignment = assignment.type === 'assignment'

  const content = (
    <>
      <div className="task-top">
        <strong>{assignment.title}</strong>
        <span className="task-due">{label}</span>
      </div>
      <div className="task-course">{courseName}</div>
    </>
  )

  const className = `task-card ${urgent ? 'task-urgent' : ''}`

  // Quiz = display lang (outside scope), assignment lang ang clickable
  return isAssignment ? (
    <Link to={`/assignment/${assignment.id}`} className={className}>
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  )
}