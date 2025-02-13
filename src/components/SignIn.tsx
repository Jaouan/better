import { FaGoogle } from "react-icons/fa";
import { useAuthStore } from "@/stores";

export const SignInButton = () => {
  const { loading, login, logout, user } = useAuthStore();

  return loading || user ? (
    <div
      className={
        "select-none cursor-pointer w-8 h-8 bg-secondary text-secondary-content font-bold rounded-full overflow-hidden flex items-center justify-center"
      }
      onClick={logout}
    >
      {user && (
        <span className={"animate-fade"}>
          {user?.displayName?.charAt(0).toLocaleUpperCase()}
        </span>
      )}
    </div>
  ) : (
    <button
      onClick={login}
      className="transition-all flex p-1 px-3 items-center gap-2 cursor-pointer bg-secondary hover:bg-secondary/80 rounded-lg"
    >
      <FaGoogle /> Se connecter
    </button>
  );
};
