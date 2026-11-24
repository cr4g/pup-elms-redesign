import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import RequireAuth from './components/common/RequireAuth'
import Login from './pages/Login'
import StudentHome from './pages/StudentHome'
import MyCourses from './pages/MyCourses'
import Assignment from './pages/Assignment'
import Grades from './pages/Grades'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<RequireAuth />}>
        <Route element={<Layout />}>
          <Route path="/" element={<StudentHome />} />
          <Route path="/courses" element={<MyCourses />} />
          <Route path="/assignment/:id" element={<Assignment />} />
          <Route path="/grades" element={<Grades />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}