type ButtonProps = {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function Button({
  size = "md",
  variant = "primary",
  type = "button",
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      className={`button-base button-${variant} button-${size}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

