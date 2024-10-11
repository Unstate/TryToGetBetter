import {FC} from "react";
import {Link} from "react-router-dom";
import {Button} from "@headlessui/react";
import { TrashIcon } from '@heroicons/react/20/solid'
import {useMutation, useQueryClient} from "@tanstack/react-query";

import {TUsers} from "../types/users.ts";
import {deleteUser} from "../api/users.ts";
import ModalUpdateUser from "../widjets/users/ModalUpdateUser.tsx";

type TUser = {
    user: TUsers,
}

const User:FC<TUser> = ({user}) => {

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (id:number) => {
            return deleteUser(id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
        onError: (error) => {
            console.error(error.message)
        }
    })

    return (
        <li className={"flex basis-[400px] h-fit gap-3 border-2 border-white rounded-xl bg-white/5 p-6 backdrop-blur-2xl"}>
            <Link to={`/users/${user.id}`} className={"h-fit max-w-[100px] self-center"}>
                <img src={'/user.png'} alt={'user logo'}/>
            </Link>
            <div className={"flex flex-col gap-1"}>
                <Link to={`/users/${user.id}`} className={""}>
                    <span>Name: {user.name}</span>
                </Link>
                <Link to={`/users/${user.id}`} className={""}>
                    <span>Email: {user.email}</span>
                </Link>
                <Link to={`/users/${user.id}`} className={""}>
                    <span>Mobile: {user.mobile}</span>
                </Link>
                <div className={'flex gap-2'}>
                    <ModalUpdateUser {...user}/>
                    <Button onClick={() => mutation.mutate(user.id)}>
                        <TrashIcon className={'size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180'} />
                    </Button>
                </div>
            </div>
        </li>
    )
}

export default User