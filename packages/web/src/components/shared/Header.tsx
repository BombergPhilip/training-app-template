import { Link } from "react-router-dom";

interface HeaderProps {
  buttons: boolean;
}

const Header = ({ buttons }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-10 py-6 dark:border-gray-900 dark:bg-gray-950">
      <div className="flex items-center gap-2">
        <h1 className="font-gilroy text-2xl font-bold text-gray-900">Training App</h1>
      </div>

      {buttons && (
        <div className="flex items-center gap-4">
          <Link
            to="/auth/login"
            className="font-medium text-gray-400 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Sign In
          </Link>

          <Link
            to="/auth/signup"
            className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;