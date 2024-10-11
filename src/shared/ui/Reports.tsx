import {FC} from "react";
import Report from "./Report.tsx";
import {TReports} from "../types/reports.ts";
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";

type TReportsProps = {
    reports: TReports
}

const Reports:FC<TReportsProps> = ({reports}) => {
    return (
        <section className="w-full">
            <div className="mx-auto w-full divide-y divide-white/5 rounded-xl bg-white/5">
                <Disclosure as="div" className="p-6" defaultOpen={true}>
                    <DisclosureButton className="group flex w-full items-center justify-between">
                        <h3 className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
                          User reports
                        </h3>
                        <ChevronDownIcon
                            className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180"/>
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
                        <ul className={'w-full flex gap-5'}>{reports.map(report => <Report
                            key={report.id} {...report} />)}</ul>
                    </DisclosurePanel>
                </Disclosure>
            </div>
        </section>
    )
}

export default Reports