import {FC} from "react";
import clsx from "clsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Button, Dialog, DialogPanel, DialogTitle, Input} from "@headlessui/react";
import {useToggle} from "@/features/hooks/useToggle.ts";
import {useFormHandler} from "@/features/hooks/useForm.ts";
import {TOrganization, TPutOrganization} from "../../types/organization.ts";
import {putOrganization} from "../../api/organization.ts";

const ModalChangeOrganization:FC<TPutOrganization & {toggleVisible: () => void}> = ({id,name,email,adreas, toggleVisible}) => {

    const queryClient = useQueryClient()
    const { isOpen, close } = useToggle(true);

    const mutation = useMutation({
        mutationFn: ({adreas,email,name}:TPutOrganization) => {
            return putOrganization({id:id,name,email,adreas})
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organization']})
        },
    })

    const { reset,data, handleChange, handleSubmit } = useFormHandler<TOrganization>(
        {email, name, adreas},
        async (organizationData) => {
            mutation.mutate(organizationData)
            close();
            reset();
        },
    );

    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={() => {
            close()
            toggleVisible()
        }}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <form onSubmit={(e) => handleSubmit(e)} className={'text-white'}>
                            <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                                Change organizations
                            </DialogTitle>
                            <div className={'flex flex-col gap-2'}>
                                <Input
                                    name={'name'}
                                    value={data.name}
                                    placeholder={'Enter title of report'}
                                    onChange={(e) => handleChange(e)}
                                    className={clsx(
                                        "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                                    )}
                                />
                                <Input
                                    name={'email'}
                                    value={data.email}
                                    placeholder={'Enter description of report'}
                                    onChange={(e) => handleChange(e)}
                                    className={clsx(
                                        "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                                    )}
                                />
                                <Input
                                    name={'adreas'}
                                    value={data.adreas}
                                    placeholder={'Enter description of report'}
                                    onChange={(e) => handleChange(e)}
                                    className={clsx(
                                        "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                                    )}
                                />
                            </div>
                            <div className="mt-4">
                                <Button
                                    type={'submit'}
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                >
                                    Save
                                </Button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default ModalChangeOrganization