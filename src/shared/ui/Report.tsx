import {FC} from "react";
import {TReport} from "../types/reports.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteReport} from "../api/reports.ts";
import {TrashIcon} from "@heroicons/react/20/solid";
import {Button} from "@headlessui/react";
import ModalChangeReport from "../widjets/reports/ModalChangeReport.tsx";

const Report:FC<TReport> = ({description,title, id, userId}) => {

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (id:number) => {
            return deleteReport(id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reports'] })
        },
    })

    return (
        <li className={'flex flex-col gap-3 border-2 border-white rounded-xl p-4 min-w-[200px]'}>
            <h3>{title}</h3>
            <p>{description}</p>
            <div className={'flex gap-2'}>
                <ModalChangeReport userId={userId} id={id} title={title} description={description} />
                <Button onClick={() => mutation.mutate(id)}>
                    <TrashIcon className={'size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180'} />
                </Button>
            </div>
        </li>
    )
}

export default Report