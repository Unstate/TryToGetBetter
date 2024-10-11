import {RouteObject} from "react-router-dom";

import UsersPage from "./pages/UsersPage.tsx";
import Error from "./pages/Error.tsx";
import HomePage from "./pages/HomePage.tsx";
import UserPage from "./pages/UserPage.tsx";

export const routerPaths:RouteObject[] = [
    {
        path: '/users',
        element: <UsersPage />,
        errorElement: <Error />
    },
    {
        path: '/',
        element: <HomePage />,
        errorElement: <Error />
    },
    {
        path: '/users/:id',
        element: <UserPage />,
        errorElement: <Error />
    },
]