import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getUser} from "@/shared/api/users.ts";
import Loading from "@/shared/ui/Loading.tsx";
import ErrorBoundary from "@/shared/ui/ErrorBoundary.tsx";
import Nav from "@/shared/ui/Nav.tsx";
import ModalCreateReport from "@/shared/widjets/reports/ModalCreateReport.tsx";
import {getReport} from "@/shared/api/reports.ts";
import {getOrganization} from "@/shared/api/organization.ts";
import Organization from "@/shared/ui/Organization.tsx";
import Reports from "@/shared/ui/Reports.tsx";
import {Button} from "@headlessui/react";
import {useToggle} from "@/features/hooks/useToggle.ts";
import ModalChangeOrganization from "@/shared/widjets/organizations/ModalChangeOrganization.tsx";

const UserPage = () => {

    const {isOpen, toggle} = useToggle(false)
    const {id} = useParams()
    const user = useQuery({
        queryKey:['user'],
        queryFn: () => getUser(Number(id))})

    const reports = useQuery({
        queryKey:['reports'],
        queryFn: () => getReport(Number(id))})

    const organization = useQuery({
        queryKey:['organization'],
        queryFn: () => getOrganization(user?.data?.organization_id || 1),
        enabled: !!user.data?.organization_id })

    if (user.isLoading || reports.isLoading || organization.isLoading) {
        return <Loading />
    }

    if (user.isError) {
        return <ErrorBoundary message={user.error.message} />
    }

    return (
        <section className={'w-full min-h-screen p-10 flex flex-col gap-5'}>
            <Nav />
            <div className={'flex gap-10'}>
                <img src={'/user.png'} alt={'user logo'} className={'max-w-[200px]'}/>
                <div className={'flex flex-col gap-10'}>
                    <div className={'flex gap-10'}>
                        <div className={'flex flex-col gap-2'}>
                            <h1 className={''}>Name: {user?.data?.name}</h1>
                            <p className={''}>Email: {user?.data?.email}</p>
                            <p className={''}>Mobile: {user?.data?.mobile}</p>
                        </div>
                        <div className={'flex flex-col gap-2'}>
                            <p className={''}>Created at: {user?.data?.created_at}</p>
                            <p className={''}>Updated at: {user?.data?.updated_at}</p>
                        </div>
                    </div>
                    <div className={'flex gap-3'}>
                        {id ? <ModalCreateReport userId={Number(id)}/> : null}
                        <Button
                            onClick={toggle}
                            className={'opacity-1 inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white disabled:opacity-[20%]'}
                        >
                            Change organization
                        </Button>
                        {!!organization.data && isOpen && <ModalChangeOrganization toggleVisible={toggle} {...organization.data} />}
                    </div>
                </div>
            </div>
            <div className={'flex flex-col gap-4'}>
                <Organization
                    name={organization?.data?.name || ''}
                    email={organization?.data?.email || ''}
                    address={organization?.data?.adreas || ''}/>
                {reports.data && <Reports reports={reports.data}/>}
            </div>
        </section>
    )
}

export default UserPage