import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import StudentHome from './pages/StudentHome'
import MyCourses from './pages/MyCourses'
import Assignment from './pages/Assignment'
import Grades from './pages/Grades'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<StudentHome />} />
        <Route path="/courses" element={<MyCourses />} />
        <Route path="/assignment/:id" element={<Assignment />} />
        <Route path="/grades" element={<Grades />} />
      </Route>
    </Routes>
  )
}