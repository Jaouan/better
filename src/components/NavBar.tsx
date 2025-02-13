import { SignInButton } from "./SignIn";

export const NavBar = () => (
  <nav className="flex justify-between items-center sticky top-0 p-2 backdrop-blur-xl z-1">
    <span className="mx-2 font-bold text-xl">Better</span>
    <SignInButton />
  </nav>
);
