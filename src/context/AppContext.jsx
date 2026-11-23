import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { initialCourses, enrollmentKeys } from '../data/courses'
import { assignments } from '../data/assignments'
import { announcements } from '../data/announcements'
import { grades } from '../data/grades'
import { services } from '../data/services'
import Toast from '../components/common/Toast'

const AppContext = createContext(null)
const STORAGE_KEY = 'pup-elms-state-v1'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AppProvider({ children }) {
  const [courses, setCourses] = useState(() => load()?.courses ?? initialCourses)
  const [submissions, setSubmissions] = useState(() => load()?.submissions ?? {})
  const [toast, setToast] = useState(null)

  // Persist para di mawala pagka-refresh
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ courses, submissions }))
    } catch {
      /* ignore */
    }
  }, [courses, submissions])

  // Auto-hide ng toast after 4 seconds
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 4000)
    return () => clearTimeout(timer)
  }, [toast])

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() })
  }, [])

  // Returns { ok: true, course } o { ok: false, message }
  const joinCourse = (rawKey) => {
    const key = rawKey.trim().toUpperCase()
    if (!key) return { ok: false, message: 'Please enter an enrollment key.' }

    const course = enrollmentKeys[key]
    if (!course) {
      return { ok: false, message: 'Key not recognized. Check it with your instructor.' }
    }
    if (courses.some((c) => c.id === course.id)) {
      return { ok: false, message: `You are already enrolled in ${course.name}.` }
    }

    setCourses((prev) => [course, ...prev])
    showToast(`You joined ${course.name}`)
    return { ok: true, course }
  }

  // file = File object galing sa input/drop. Pangalan, laki at oras lang ang sine-save.
  const submitAssignment = (assignmentId, file) => {
    setSubmissions((prev) => ({
      ...prev,
      [assignmentId]: {
        fileName: file.name,
        fileSize: file.size,
        submittedAt: new Date().toISOString(),
      },
    }))
    showToast('Assignment submitted for grading')
  }

  const removeSubmission = (assignmentId) => {
    setSubmissions((prev) => {
      const next = { ...prev }
      delete next[assignmentId]
      return next
    })
    showToast('Submission removed')
  }

  // Para sa presentation: ibalik sa simula
  const resetDemo = () => {
    localStorage.removeItem(STORAGE_KEY)
    setCourses(initialCourses)
    setSubmissions({})
  }

  const value = {
    student: { name: 'Pabs' },
    courses,
    assignments,
    announcements,
    grades,
    services,
    submissions,
    joinCourse,
    submitAssignment,
    removeSubmission,
    showToast,
    resetDemo,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </AppContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}