import {FC} from "react";
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/react";
import { ChevronDownIcon } from '@heroicons/react/20/solid'

type TOrganizationProps = {
    name: string,
    email:string,
    address:string,
}

const Organization:FC<TOrganizationProps> = ({address,email,name,}) => {

    return (
        <div className="w-full">
            <div className="mx-auto w-full divide-y divide-white/5 rounded-xl bg-white/5">
                <Disclosure as="div" className="p-6" defaultOpen={true}>
                    <DisclosureButton className="group flex w-full items-center justify-between">
                        <h3 className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
                          Info about organisation
                        </h3>
                        <ChevronDownIcon
                            className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180"/>
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
                        <p>Name {name}</p>
                        <p>Email: {email}</p>
                        <p>Address: {address}</p>
                    </DisclosurePanel>
                </Disclosure>
            </div>
        </div>
    )
}

export default Organization