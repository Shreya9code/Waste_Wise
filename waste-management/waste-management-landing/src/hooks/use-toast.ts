import { useState, useEffect, ReactNode } from 'react'

export interface ToastProps {
  id?: string
  title: string
  description?: string
  action?: ReactNode
  duration?: number
  className?: string
}

export type ToastActionElement = React.ReactElement<HTMLButtonElement>

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setToasts((prevToasts) =>
        prevToasts.filter((toast) => {
          if (toast.duration === Infinity) return true
          const timeLeft = (toast.duration || 5000) - (Date.now() - Number(toast.id))
          return timeLeft > 0
        })
      )
    }, 100)

    return () => clearInterval(timer)
  }, [])

  const toast = (props: Omit<ToastProps, 'id'>) => {
    const id = Date.now().toString()
    setToasts((prevToasts) => [...prevToasts, { ...props, id }])
  }

  return { toast, toasts }
}