type ButtonProps = {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export default function Button({
  size = "md",
  variant = "primary",
  type = "button",
  onClick,
  children,
  className
}: ButtonProps) {
  return (
    <button
      className={`button-base button-${variant} button-${size} flex justify-center ${className && className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

