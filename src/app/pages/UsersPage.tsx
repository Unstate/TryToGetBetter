import { Link } from "react-router-dom";

import User from "@/shared/ui/User.tsx";
import {getUsers} from "@/shared/api/users.ts";
import Loading from "@/shared/ui/Loading.tsx";
import ErrorBoundary from "@/shared/ui/ErrorBoundary.tsx";
import Nav from "@/shared/ui/Nav.tsx";

import {useQuery} from "@tanstack/react-query";

const UsersPage = () => {

    const {data:users, isLoading, isError, error} = useQuery({queryKey:['users'], queryFn: () => getUsers()})

    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        return <ErrorBoundary message={error.message} />
    }

    return (
        <ul className={"flex flex-wrap justify-center items-center w-full p-4 gap-5"}>
            <Nav />
            {users?.length
                ? users.map(user => <User key={user.id} user={user} />)
                : <p>There is no user yet! Go to <Link className={'underline'} to={'/'}>Home page</Link> and create someone</p>}
        </ul>
    );
};

export default UsersPage;
