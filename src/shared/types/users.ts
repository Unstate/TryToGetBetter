export type TUsers = {
    id:number;
    name:string;
    mobile: string;
    email:string;
    created_at: string;
    updated_at:string;
    organization_id:number;
}

export type TUsersArray = Array<TUsers>

export type TInputsOfUsers = Omit<TUsers, 'created_at' & 'updated_at' & 'id'>

export type TPostUser = {
    name:string;
    email:string;
    mobile:string;
    organization_id:number;
}

export type TDeleteUser = {
    id:number;
}

export type TPutUser = TPostUser & {id:number}