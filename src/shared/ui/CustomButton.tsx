import {ButtonHTMLAttributes, FC, ReactNode} from "react";
import {Button} from "@headlessui/react";
import clsx from "clsx";

type IButtonProps = {
    icon?:ReactNode;
    title?:string;
    classname?:string;
} & ButtonHTMLAttributes<HTMLButtonElement>

export const CustomButton:FC<IButtonProps> = ({title, icon,classname, ...rest}) => {
    return (
        <Button {...rest} className={clsx(classname, '')}>
            {icon && icon}
            {title && <p>{title}</p>}
        </Button>
    )
}

export default CustomButton