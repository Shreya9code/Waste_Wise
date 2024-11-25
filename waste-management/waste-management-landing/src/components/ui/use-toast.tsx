'use client'

import { motion } from 'framer-motion'
import { useToast,
  ToastProps,
  ToastActionElement,
} from '@/hooks/use-toast'

export { useToast, type ToastProps }

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end space-y-4">
      {toasts.map((toast) => (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: -50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className={`px-4 py-2 rounded-lg shadow-lg ${toast.className}`}
        >
          <h3 className="font-semibold">{toast.title}</h3>
          {toast.description && <p className="text-sm mt-1">{toast.description}</p>}
          {toast.action && <div className="mt-2">{toast.action}</div>}
        </motion.div>
      ))}
    </div>
  )
}