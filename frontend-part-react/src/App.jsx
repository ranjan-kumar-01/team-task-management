import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/SignUp";
import Dashboard from "./pages/admin/Dashboard";
import CreateTask from "./pages/admin/CreateTask";
import ManageTask from "./pages/admin/ManageTask";
import ManageUsers from "./pages/admin/ManageUsers";
import PrivateRoute from "./routes/PrivateRoute";
import UserDashboard from "./pages/user/UserDashboard";
import MyTask from "./pages/user/MyTask";
import TaskDetails from "./pages/user/TaskDetails";

const App = () => {
	return (
		<div>
			<BrowserRouter>
				{/* Public routes */}
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />

					{/* admin routes */}
					<Route element={<PrivateRoute allowedRoles={["admin"]} />}>
						<Route
							path="/admin/dashboard"
							element={<Dashboard />}
						/>
						<Route
							path="/admin/create-task"
							element={<CreateTask />}
						/>
						<Route path="/admin/tasks" element={<ManageTask />} />
						<Route path="/admin/users" element={<ManageUsers />} />
					</Route>

					{/* users routes */}
					<Route element={<PrivateRoute allowedRoles={["user"]} />}>
						<Route
							path="/user/dashboard"
							element={<UserDashboard />}
						/>
						<Route path="/user/tasks" element={<MyTask />} />
						<Route
							path="/user/task-details/:id"
							element={<TaskDetails />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
