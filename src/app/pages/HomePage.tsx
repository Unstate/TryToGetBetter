import Form from "../../shared/widjets/Form.tsx";
import Nav from "../../shared/ui/Nav.tsx";
import {CREATE_USER_FORM_FIELDS} from "../../features/constants/CreateUserForm.ts";
import ModalCreateOrganization from "../../shared/widjets/organizations/ModalCreateOrganization.tsx";
import {useQuery} from "@tanstack/react-query";
import {getOrganizations} from "../../shared/api/organization.ts";
import Loading from "../../shared/ui/Loading.tsx";
import ErrorBoundary from "../../shared/ui/ErrorBoundary.tsx";

const HomePage = () => {

    const {data, isLoading, isError, error} = useQuery({queryKey:['organization'], queryFn: () => getOrganizations()})

    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        return <ErrorBoundary message={error.message} />
    }

    return (
        <section className={'w-full min-h-screen flex flex-col justify-center items-center gap-2'}>
            <Nav />
            {!!data?.length && <Form fields={CREATE_USER_FORM_FIELDS} title={"Create a new User"} organizations={data}/>}
            <ModalCreateOrganization />
        </section>
    )
}

export default HomePage