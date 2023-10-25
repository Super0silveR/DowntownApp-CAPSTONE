import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStore } from "../stores/store";

{/** Component for private routes so we make sure the user is authenticated for features in our Application. */}
export default function RequireAuthentication() {
    const { userStore: { isLoggedIn } } = useStore();
    const location = useLocation();

    if (!isLoggedIn) return <Navigate to='/' state={{from: location}} />
    return <Outlet />
}