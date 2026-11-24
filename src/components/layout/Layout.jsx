import { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import pupLogo from '../../assets/logo/pup-logo.png'
import notificationIcon from '../../assets/icons/notification.png'
import profileIcon from '../../assets/icons/profile.png'
import './layout.css'

export default function Layout() {
  const { user, logout } = useApp()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  // Isara ang menu kapag nag-click sa labas o nag-Escape
  useEffect(() => {
    if (!menuOpen) return
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const handleLogout = () => {
    setMenuOpen(false)
    logout()
    navigate('/login')
  }

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

          <div className="profile-menu-wrap" ref={menuRef}>
            <button
              type="button"
              className="icon-btn"
              aria-label="Profile menu"
              aria-haspopup="true"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <img src={profileIcon} alt="" />
            </button>

            {menuOpen && (
              <div className="profile-menu">
                <div className="profile-menu-info">
                  <strong>{user?.studentNumber}</strong>
                  <span>{user?.campus}</span>
                  <span>{user?.status} student</span>
                </div>
                <button
                  type="button"
                  className="profile-menu-logout"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container">
        <Outlet />
      </main>
    </>
  )
}