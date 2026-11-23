export default function AnnouncementList({ items }) {
  if (items.length === 0) {
    return <p className="muted">No announcements yet.</p>
  }

  return (
    <ul className="announcement-list">
      {items.map((n) => (
        <li key={n.id} className="announcement">
          <div>
            <span className="announcement-course">{n.courseName}:</span>{' '}
            <strong>{n.title}</strong>
          </div>
          <p>{n.body}</p>
        </li>
      ))}
    </ul>
  )
}