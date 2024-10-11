import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useToggle} from "../../../features/hooks/useToggle.ts";
import {useFormHandler} from "../../../features/hooks/useForm.ts";
import {Input} from "@headlessui/react";
import clsx from "clsx";
import Modal from "../../ui/Modal.tsx";
import {putReport} from "../../api/reports.ts";
import {TPutReport, TReport} from "../../types/reports.ts";
import {FC} from "react";

export const ModalChangeReport:FC<TPutReport> = ({userId, id,description,title}) => {

    const queryClient = useQueryClient()
    const { isOpen, open, close } = useToggle();

    const mutation = useMutation({
        mutationFn: (reportData:TPutReport) => {
            return putReport({userId: userId,id:id,title: reportData.title, description: reportData.description})
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reports'] })
        },
    })

    const { data, handleChange, handleSubmit } = useFormHandler<TReport>(
        {title, description},
        async (reportData) => {
            mutation.mutate(reportData)
            close();
        },
    );

    return (
        <Modal submitButtonTittle={'Save'} isVisible={isOpen} close={close} open={open} onSubmit={handleSubmit} title={'Create report'}>
            <div className={'flex flex-col gap-2'}>
                <Input
                    name={'title'}
                    value={data.title}
                    placeholder={'Enter title of report'}
                    onChange={(e) => handleChange(e)}
                    className={clsx(
                        "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                    )}
                />
                <Input
                    name={'description'}
                    value={data.description}
                    placeholder={'Enter description of report'}
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

export default ModalChangeReport