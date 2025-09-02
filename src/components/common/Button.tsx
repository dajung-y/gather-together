type ButtonProps = {
  variant?: "primary" | "secondary" | "outline";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children?: React.ReactNode;
}
export default function Button(props: ButtonProps) {
  return (
    <button
      className={`button-${props.variant ?? "primary"}`}
      type={props.type ?? "button"}
      onClick={props.onClick}>
      {props.children}
    </button>
  )
}
