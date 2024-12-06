import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  styles: string;
}

export default function Button({ children, styles }: ButtonProps) {
  return <button className={`${styles} px-4 py-2`}>{children}</button>;
}
