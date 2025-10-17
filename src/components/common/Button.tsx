type ButtonProps = {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline" | "disabled";
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export default function Button({
  size = "md",
  variant = "primary",
  type = "button",
  onClick,
  children,
  className,
  disabled = false
}: ButtonProps) {
  const isDisabled = variant === "disabled" || disabled;
  return (
    <button
      className={`
        button-base 
        button-${variant} 
        button-${size} 
        flex justify-center
        ${disabled ? "cursor-not-allowed" : "hover:brightness-95 cursor-pointer"} 
        ${className && className}`}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}

