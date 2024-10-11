import {FC, useState} from "react";
import {useNavigate} from "react-router-dom";
import {createPortal} from "react-dom";
import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {yupResolver} from "@hookform/resolvers/yup";
import {validationSchema} from "@/features/schema/validationSchema.ts";
import {useToggle} from "@/features/hooks/useToggle.ts";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {ChevronDownIcon, PencilIcon, TrashIcon} from "@heroicons/react/20/solid";
import {TOrganization, TOrganizations} from "../types/organization.ts";
import {TPostUser} from "../types/users.ts";
import ModalChangeOrganization from "./organizations/ModalChangeOrganization.tsx";
import {postUser} from "../api/users.ts";
import {deleteOrganization} from "../api/organization.ts";
import CustomButton from "../ui/CustomButton.tsx";
import InputField from "../ui/InputField.tsx";

export type TField = {
    name: 'name' | 'email' | 'mobile',
    label?:string,
    placeholder?:string,
}

export type TFormProps = {
    fields: Array<TField>,
    title:string;
    organizations: TOrganizations;
}

const Form:FC<TFormProps> = ({fields, title, organizations}) => {

    const navigate = useNavigate();
    const queryClient = useQueryClient()
    const [selectedOrg, setSelectedOrg] = useState<TOrganization>(organizations[0] || {})
    const {isOpen,toggle} = useToggle(false)

    const changeSelectedOrg = (org:TOrganization) => {
        setSelectedOrg(org)
    }

    const {formState: {errors},register,reset,handleSubmit} = useForm<Omit<TPostUser, 'organization_id'>>({
        resolver: yupResolver(validationSchema),
        mode: 'onChange',
    })

    const mutation = useMutation({
        mutationFn: (userData:TPostUser) => {
            return postUser(userData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']})
        },
    })

    const mutationOrg = useMutation({
        mutationFn: (id:number) => {
            return deleteOrganization(id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organization']})
        },
    })

    const onSubmit = (data:Omit<TPostUser, 'organization_id'>) => {
        mutation.mutate({...data, organization_id: selectedOrg.id})
        navigate('/users')
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'w-1/2 max-w-[600px] h-auto p-4 flex flex-col gap-5 border-2 border-neutral-100 rounded-xl'}>
            <h1 className={'self-center'}>{title}</h1>
            {
                fields.map(field => <InputField key={field.name} inputProps={register(field.name)} label={field.label} placeholder={field.placeholder} errorMessage={errors[field.name]?.message} />)
            }
            <Menu>
                <MenuButton className="flex justify-between">
                    {selectedOrg.name}
                    <ChevronDownIcon className="size-4 fill-white/60" />
                </MenuButton>

                <MenuItems
                    transition
                    anchor="bottom end"
                    className="w-52 origin-top-right bg-black rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                    {organizations.length && organizations.map(org =>
                        <MenuItem key={org.id}>
                            <button
                                className="group flex justify-between w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                                <p onClick={() => changeSelectedOrg(org)} className={'w-full text-left'}>{org.name}</p>
                                <div className={'flex gap-2'}>
                                    <PencilIcon onClick={() => {
                                        setSelectedOrg(org)
                                        toggle()
                                    }} className={'size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180 min-w-[20px]'} />
                                    <TrashIcon onClick={() => {
                                        mutationOrg.mutate(org.id)
                                        setSelectedOrg(organizations[0])
                                    }} className={'size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180 min-w-[20px]'}/>
                                </div>
                            </button>
                        </MenuItem>)}
                </MenuItems>
            </Menu>
            <CustomButton
                type={'submit'}
                title={'Submit'}
                classname="opacity-1 inline-flex self-start items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white disabled:opacity-[20%]"/>
            {isOpen && createPortal(<ModalChangeOrganization toggleVisible={toggle} {...selectedOrg} />, document.body)}
        </form>
    )
}

export default Form