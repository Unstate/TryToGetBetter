import * as yup from 'yup'

const regExpEmail = new RegExp(/^\S+@\S+\.\S+$/)
const regExpPhone = new RegExp(/^\+?[1-9][0-9]{7,14}$/)

export const validationSchema = yup.object().shape({
    name: yup.string().trim().required('Required field').min(2, 'Minimum length must be 2 symbols'),
    email: yup.string().required('Required field').matches(regExpEmail, 'Incorrect format of email'),
    mobile: yup.string().required('Required field').matches(regExpPhone, 'Incorrect format of phone')
})