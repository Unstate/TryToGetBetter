import {FC, FormEvent, ReactNode} from "react";
import {Button, Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import { PencilIcon } from '@heroicons/react/20/solid'

type TModal = {
    submitButtonTittle:string;
    openButtonTitle?:string;
    isVisible:boolean;
    close:() => void;
    open:() => void;
    children: ReactNode;
    onSubmit: (e:FormEvent<HTMLFormElement>) => Promise<void>,
    title:string;
}

const Modal:FC<TModal> = ({close, isVisible, submitButtonTittle, children, open, openButtonTitle,onSubmit,title}) => {
    return (
        <>
            <Button
                onClick={open}
                className={openButtonTitle ? 'opacity-1 inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white disabled:opacity-[20%]' : ''}
            >
                {openButtonTitle || <PencilIcon className={'size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180'} />}
            </Button>

            <Dialog open={isVisible} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <form onSubmit={(e) => onSubmit(e)} className={'text-white'}>
                                <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                                    {title}
                                </DialogTitle>
                                {children}
                                <div className="mt-4">
                                    <Button
                                        type={'submit'}
                                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                    >
                                        {submitButtonTittle}
                                    </Button>
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default Modal