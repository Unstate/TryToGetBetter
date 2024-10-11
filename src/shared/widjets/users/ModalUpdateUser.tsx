import {FC} from "react";
import clsx from "clsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useToggle} from "@/features/hooks/useToggle.ts";
import {useFormHandler} from "@/features/hooks/useForm.ts";
import {TPutUser, TUsers} from "../../types/users.ts";
import {putUser} from "../../api/users.ts";
import {Input} from "@headlessui/react";
import Modal from "../../ui/Modal.tsx";

type TModal = TUsers

export const ModalUpdateUser:FC<TModal> = ({name,email,mobile,created_at,updated_at, id}) => {

    const queryClient = useQueryClient()
    const { isOpen, open, close } = useToggle();

    const mutation = useMutation({
        mutationFn: (userData:TPutUser) => {
            return putUser(userData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
    })

    const { data, handleChange, handleSubmit } = useFormHandler<TPutUser>(
        { name, email, mobile, id },
        async (userData) => {
            mutation.mutate(userData)
            close();
        },
    );

    return (
        <Modal submitButtonTittle={'Save'} isVisible={isOpen} close={close} open={open} onSubmit={handleSubmit} title={'Edit User'}>
                <div className={'flex flex-col gap-2'}>
                    <Input
                        name={'name'}
                        value={data.name}
                        onChange={(e) => handleChange(e)}
                        className={clsx(
                            "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                        )}
                    />
                    <Input
                        name={'email'}
                        value={data.email}
                        onChange={(e) => handleChange(e)}
                        className={clsx(
                            "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                        )}
                    />
                    <Input
                        name={'mobile'}
                        value={data.mobile}
                        onChange={(e) => handleChange(e)}
                        className={clsx(
                            "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                        )}
                    />
                    <p>Created at: {created_at}</p>
                    <p>Updated at: {updated_at}</p>
                </div>
        </Modal>
    )
}

export default ModalUpdateUser