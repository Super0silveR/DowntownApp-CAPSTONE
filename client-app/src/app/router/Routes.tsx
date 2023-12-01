import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import TestErrors from "../../features/errors/TestErrors";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import EventDetails from "../../features/events/details/EventDetails";
import EventForm from "../../features/events/form/EventForm";
import ProfilePage from "../../features/profiles/ProfilePage";
import App from "../layout/App";
import RequireAuthentication from "./RequireAuthentication";
import EventLive from "../../features/events/EventLive";
import MessageDashboard from "../../features/messages/MessageDashboard";

/** Tree-like structure to represents the different routes in our Application. */
export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            /** Error related routes. */
            {path: 'not-found', element: <NotFound key='errors' />},
            {path: 'server-error', element: <ServerError key='errors' />},

            /** Any routes that doesn't match our own routes. */
            {path: '*', element: <Navigate replace to='/not-found' key='not-foud' />},

            /** Creating a custom routing element to `protect` some sections of our Applicatio
             *  for authenticated users. (Private Routes)
             * 
             *  Hiding our valuable features behind a curtain.
             */
            {element: 
                <RequireAuthentication />, 
                children: [
                    /** Event related routes. */
                    {path: 'events', element: <EventDashboard />},
                    {path: 'events/:id', element: <EventDetails />},
                    {path: 'createEvent', element: <EventForm key='create' />},
                    {path: 'events/:id/live', element: <EventLive />},
                    {path: 'manageEvent/:id', element: <EventForm key='manage' />},

                    /** User related routes. */
                    {path: 'profiles/:userName', element: <ProfilePage />},

                    /** Errors related routes */
                    {path: 'errors', element: <TestErrors key='errors' />},

                    /** Messages & conversations routes. */
                    {path: 'messages', element: <MessageDashboard />}
            ]}
        ]
    }
];

/** Router object used in the RouterProvider. */
export const router = createBrowserRouter(routes);