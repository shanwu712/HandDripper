import { ReactNode } from "react";
import Logo from "./Logo";

interface NavProp {
  children?: ReactNode;
}
export default function NavBar({ children }: NavProp) {
  return (
    <nav className="fixed top-0 z-0 mt-0 flex h-16 w-full items-center bg-dark-beige">
      <Logo />
      {children}
    </nav>
  );
}
