import { campuses } from '../data/campuses'

// Format: YEAR-NUMBER-CAMPUSCODE-0/1  (hal. 2023-00123-MN-0)
// 0 = regular, 1 = irregular
export function parseStudentNumber(raw) {
  const value = (raw ?? '').trim().toUpperCase()

  if (!value) {
    return { valid: false, error: 'Please enter your student number.' }
  }

  const match = value.match(/^(\d{4})-(\d{4,6})-([A-Z]{2})-([01])$/)
  if (!match) {
    return {
      valid: false,
      error:
        'Use the format YEAR-NUMBER-CAMPUS-0 or 1, for example 2023-00123-MN-0.',
    }
  }

  const [, year, number, campusCode, statusFlag] = match

  const campus = campuses[campusCode]
  if (!campus) {
    return { valid: false, error: `Campus code "${campusCode}" is not recognized.` }
  }

  const yearNum = Number(year)
  if (yearNum < 1990 || yearNum > new Date().getFullYear()) {
    return { valid: false, error: `Year "${year}" is not valid.` }
  }

  return {
    valid: true,
    studentNumber: value,
    year,
    number,
    campusCode,
    campus,
    status: statusFlag === '0' ? 'Regular' : 'Irregular',
  }
}