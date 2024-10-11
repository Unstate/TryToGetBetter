import {TField} from "@/shared/widjets/Form.tsx";

export const CREATE_USER_FORM_FIELDS:TField[] = [
    {
        name: 'name',
        label: 'Enter name of user',
        placeholder: 'Unstate',
    },{
        name: 'email',
        label: 'Enter user`s email',
        placeholder: 'Someone@gmail.com',
    },{
        name: 'mobile',
        label: 'Enter user`s mobile number',
        placeholder: '89106925670 or +79106925670',
    },
]