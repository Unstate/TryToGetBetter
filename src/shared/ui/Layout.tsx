import {FC, ReactNode} from "react";

type TLayout = {
    children:ReactNode
}

const Layout:FC<TLayout> = ({children}) => {
    return (
        <main className={'w-full h-screen flex flex-col items-center justify-center text-white relative'}>
            {children}
        </main>
    )
}

export default Layout
