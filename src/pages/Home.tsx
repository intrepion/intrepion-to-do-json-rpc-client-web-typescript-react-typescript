import { useAuth } from "../context/auth";
import ToDoLists from "./ToDoLists";

export const Home = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <h1>Home</h1>
      <ToDoLists />
    </div>
  );
};

export default Home;
