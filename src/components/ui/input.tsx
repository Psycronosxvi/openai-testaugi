import * as React from "react"

// Utility function to join class names
export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

// Defining the input props type
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// Forwarding ref to the actual input element
const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

// Display name for debugging purposes
Input.displayName = "Input"

// Export the Input component
export { Input }

