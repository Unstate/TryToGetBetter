import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useToggle} from "../../../features/hooks/useToggle.ts";
import {useFormHandler} from "../../../features/hooks/useForm.ts";
import {Input} from "@headlessui/react";
import clsx from "clsx";
import Modal from "../../ui/Modal.tsx";
import {TOrganization, TPostOrganization} from "../../types/organization.ts";
import {postOrganization} from "../../api/organization.ts";

export const ModalCreateOrganization = () => {

    const queryClient = useQueryClient()
    const { isOpen, open, close } = useToggle();

    const mutation = useMutation({
        mutationFn: ({name,adreas,email}:TPostOrganization) => {
            return postOrganization({name,email,adreas})
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organization'] })
        },
    })

    const { reset,data, handleChange, handleSubmit } = useFormHandler<TOrganization>(
        {},
        async (organizationData) => {
            mutation.mutate(organizationData)
            close();
            reset();
        },
    );

    return (
        <Modal submitButtonTittle={'Save'} openButtonTitle={'Create organization'} isVisible={isOpen} close={close} open={open} onSubmit={handleSubmit} title={'Create organization'}>
            <div className={'flex flex-col gap-2'}>
                <Input
                    name={'name'}
                    value={data.name}
                    placeholder={'Enter name of organization'}
                    onChange={(e) => handleChange(e)}
                    className={clsx(
                        "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                    )}
                />
                <Input
                    name={'email'}
                    value={data.email}
                    placeholder={'Enter email of organization'}
                    onChange={(e) => handleChange(e)}
                    className={clsx(
                        "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                    )}
                />
                <Input
                    name={'adreas'}
                    value={data.adreas}
                    placeholder={'Enter address of organization'}
                    onChange={(e) => handleChange(e)}
                    className={clsx(
                        "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                    )}
                />
            </div>
        </Modal>
    )
}

export default ModalCreateOrganization