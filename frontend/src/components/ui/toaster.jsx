import { useToast } from "./use-toast"
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport, ToastIcon } from "./toast"
import { cn } from "../../lib/utils"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, variant = "default", ...props }) => (
        <Toast key={id} variant={variant} {...props}>
          <div className="grid gap-1">
            <div className="flex items-center gap-3">
              {variant !== "default" && <ToastIcon variant={variant} />}
              <div className="flex-1">
                {title && (
                  <ToastTitle className={cn(
                    variant === "destructive" && "text-red-700",
                    variant === "default" && "text-green-700",
                  )}>
                    {title}
                  </ToastTitle>
                )}
                {description && (
                  <ToastDescription className={cn(
                    variant === "destructive" && "text-red-600/90",
                    variant === "default" && "text-green-600/90",
                  )}>
                    {description}
                  </ToastDescription>
                )}
              </div>
            </div>
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}
