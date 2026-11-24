import { useApp } from '../context/AppContext'
import DueSoonCard from '../components/home/DueSoonCard'
import CourseCard from '../components/home/CourseCard'
import AnnouncementList from '../components/home/AnnouncementList'
import './home.css'

export default function StudentHome() {
  const { student, courses, assignments, announcements, submissions } = useApp()

  const currentCourses = courses.filter((c) => c.semester === 'current')

 
  const dueSoon = assignments
    .filter((a) => !submissions[a.id])
    .sort((a, b) => new Date(a.dueAt) - new Date(b.dueAt))

  const courseName = (id) => courses.find((c) => c.id === id)?.name ?? ''
  const taskCount = (courseId) =>
    dueSoon.filter((a) => a.courseId === courseId).length

  return (
    <div className="home-grid home-page">
      <div>
        <h1 className="home-welcome">Welcome back, {student.name}!</h1>

        <section aria-labelledby="due-soon">
          <h2 id="due-soon">Due Soon</h2>
          {dueSoon.length === 0 ? (
            <p className="muted">You're all caught up. No pending tasks.</p>
          ) : (
            <div className="task-list">
              {dueSoon.map((a) => (
                <DueSoonCard
                  key={a.id}
                  assignment={a}
                  courseName={courseName(a.courseId)}
                />
              ))}
            </div>
          )}
        </section>

        <section aria-labelledby="my-courses" style={{ marginTop: 'var(--space-4)' }}>
          <h2 id="my-courses">My Courses</h2>
          <div className="course-grid">
            {currentCourses.map((c) => (
              <CourseCard key={c.id} course={c} taskCount={taskCount(c.id)} />
            ))}
          </div>
        </section>
      </div>

      <aside aria-labelledby="announcements">
        <h2 id="announcements">Announcements</h2>
        <div className="card">
          <AnnouncementList items={announcements} />
        </div>
      </aside>
    </div>
  )
}