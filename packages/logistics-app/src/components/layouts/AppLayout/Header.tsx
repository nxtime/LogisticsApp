import { Link } from "react-router-dom";
import { authStore } from "../../../stores/Auth.store";

const AppHeader = () => {
  const { user } = authStore;

  return (
    <header className="w-full flex justify-center p-4 bg-neutral">
      <div className="flex justify-between items-center w-full max-w-screen-lg">
        <Link to="/" className="text-2xl font-medium">
          Dashboard
        </Link>
        <div className="flex gap-4 items-center">
          {/* <Link to="/dashboard">Dashboard</Link> */}
          <div className="flex gap-2 items-center">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="h-12 w-12 rounded-full"
            />
            <span>{user?.name}</span>
          </div>
          <button
            type="button"
            className="btn"
            onClick={() => authStore.logout()}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
