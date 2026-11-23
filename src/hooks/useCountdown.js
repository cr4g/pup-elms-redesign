import { useEffect, useState } from 'react'

export function getCountdown(dueAt, now = Date.now()) {
  const diff = new Date(dueAt).getTime() - now
  if (diff <= 0) return { label: 'Overdue', urgent: true, overdue: true }

  const mins = Math.ceil(diff / 60000)
  if (mins < 60) {
    return {
      label: `Due in ${mins} min${mins === 1 ? '' : 's'}`,
      urgent: true,
      overdue: false,
    }
  }

  const hrs = Math.floor(mins / 60)
  if (hrs < 24) {
    return {
      label: `Due in ${hrs} hr${hrs === 1 ? '' : 's'}`,
      urgent: true,
      overdue: false,
    }
  }

  const days = Math.floor(hrs / 24)
  return {
    label: `Due in ${days} day${days === 1 ? '' : 's'}`,
    urgent: false,
    overdue: false,
  }
}

export default function useCountdown(dueAt) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30000)
    return () => clearInterval(timer)
  }, [])

  return getCountdown(dueAt, now)
}