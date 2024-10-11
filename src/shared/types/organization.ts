export type TOrganization = {
    id:number;
    name:string;
    adreas:string;
    email:string;
}

export type TOrganizations = Array<TOrganization>

export type TPostOrganization = Omit<TOrganization, 'id'>
export type TPutOrganization = TOrganization