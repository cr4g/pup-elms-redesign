import { NavLink, Outlet } from 'react-router-dom'
import pupLogo from '../../assets/logo/pup-logo.png'
import notificationIcon from '../../assets/icons/notification.png'
import profileIcon from '../../assets/icons/profile.png'

export default function Layout() {
  return (
    <>
      <header className="app-header">
        <NavLink
          to="/"
          className="app-logo"
          aria-label="PUP eLMS Home"
          title="PUP eLMS"
        >
          <img src={pupLogo} alt="" />
        </NavLink>

        <nav className="app-nav" aria-label="Main navigation">
          <NavLink to="/" end className="nav-link">Home</NavLink>
          <NavLink to="/courses" className="nav-link">My Courses</NavLink>
          <NavLink to="/grades" className="nav-link">Grades</NavLink>
          <button type="button" className="nav-link">Calendar</button>
          <button type="button" className="nav-link">PUP Services ▾</button>
        </nav>

        <div className="header-actions">
          <button type="button" className="icon-btn" aria-label="Notifications">
            <img src={notificationIcon} alt="" />
          </button>
          <button type="button" className="icon-btn" aria-label="Profile">
            <img src={profileIcon} alt="" />
          </button>
        </div>
      </header>

      <main className="container">
        <Outlet />
      </main>
    </>
  )
}