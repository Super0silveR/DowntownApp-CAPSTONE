import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import TestErrors from "../../features/errors/TestErrors";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import EventDetails from "../../features/events/details/EventDetails";
import EventForm from "../../features/events/form/EventForm";
import ProfilePage from "../../features/profiles/ProfilePage";
import LoginForm from "../../features/users/LoginForm";
import App from "../layout/App";

/** Tree-like structure to represents the different routes in our Application. */
export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            /** Event related routes. */
            {path: 'events', element: <EventDashboard />},
            {path: 'events/:id', element: <EventDetails />},
            {path: 'createEvent', element: <EventForm key='create' />},
            {path: 'manageEvent/:id', element: <EventForm key='manage' />},

            /** Error related routes. */
            {path: 'errors', element: <TestErrors key='errors' />},
            {path: 'not-found', element: <NotFound key='errors' />},
            {path: 'server-error', element: <ServerError key='errors' />},

            /** User related routes. */
            {path: 'login', element: <LoginForm key='login-form' />},
            {path: 'profiles/:userName', element: <ProfilePage />},

            /** Any routes that doesn't match our own routes. */
            {path: '*', element: <Navigate replace to='/not-found' key='not-foud' />}
        ]
    }
];

/** Router object used in the RouterProvider. */
export const router = createBrowserRouter(routes);