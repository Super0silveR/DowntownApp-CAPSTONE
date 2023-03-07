import { createBrowserRouter, RouteObject } from "react-router-dom";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import EventDetails from "../../features/events/details/EventDetails";
import EventForm from "../../features/events/form/EventForm";
import App from "../layout/App";

/** Tree-like structure to represents the different routes in our Application. */
export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path: 'events', element: <EventDashboard />},
            {path: 'events/:id', element: <EventDetails />},
            {path: 'createEvent', element: <EventForm key='create' />},
            {path: 'manage/:id', element: <EventForm key='manage' />}
        ]
    }
];

/** Router object used in the RouterProvider. */
export const router = createBrowserRouter(routes);