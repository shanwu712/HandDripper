import { NavLink } from "react-router-dom";

export default function Logo() {
  return (
    <NavLink to="/" className="flex h-16">
      <img src="/fullLogo.jpg" alt="handDripper" />
    </NavLink>
  );
}
