import {Link} from "react-router-dom";
import {UsersIcon, UserPlusIcon} from '@heroicons/react/20/solid'

const Nav = () => {
    return (
        <nav className={'fixed left-2 top-2 z-10'}>
            <ul className={'flex gap-3'}>
                <li className={'relative p-1 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-white hover:before:w-2/4 before:transition-all'}>
                    <Link to={'/'} aria-label={'Create a new user'}>
                        <UserPlusIcon
                            className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180"/>
                    </Link>
                </li>
                <li className={'relative p-1 border-1 border-white-500 rounded-[50vw] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-white hover:before:w-2/4 before:transition-all'}>
                    <Link to={'/users'} aria-label={'List of users'}>
                        <UsersIcon
                            className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180"/>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav