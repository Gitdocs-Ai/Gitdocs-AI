interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg";
}

const Button = ({ children }: ButtonProps) => {
  return (
    <div
      className={`border border-white w-2/3 mx-auto text-white text-md rounded-full overflow-hidden flex items-center justify-center py-2`}
    >
      {children}
    </div>
  );
};

export default Button;
