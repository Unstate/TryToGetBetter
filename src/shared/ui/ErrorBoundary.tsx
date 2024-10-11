import {FC} from "react";

type TError = {
    message:string;
}

const ErrorBoundary:FC<TError> = ({message}) => {
    return (
        <aside className={'w-full h-screen flex justify-center items-center'}>
            <p>
                {message}
            </p>
        </aside>
    )
}

export default ErrorBoundary