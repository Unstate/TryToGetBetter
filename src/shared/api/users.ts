import {Api} from "./api.ts";
import {BASE_URL} from './baseUrl.ts'
import {TPostUser, TPutUser, TUsers, TUsersArray} from "../types/users.ts";

export const getUsers = async () => {
    const api = new Api({baseUrl: BASE_URL, endpoint: 'users', method: 'GET', headers: {'Content-Type': 'application/json'}})
    return await api.get<TUsersArray>()
}

export const getUser = async (id:number) => {
    const api = new Api({baseUrl: BASE_URL, endpoint: `users/${id}`, method: 'GET', headers: {'Content-Type': 'application/json'}})
    return await api.get<TUsers>()
}

export const postUser = async (user: TPostUser) => {
    const api = new Api({baseUrl: BASE_URL, endpoint: 'users', method: 'POST', headers: {'Content-Type': 'application/json'}})
    return await api.post<TPostUser>(user)
}

export const deleteUser = async (id:number) => {
    const api = new Api({baseUrl: BASE_URL, endpoint: 'users', method: 'DELETE', headers: {'Content-Type': 'application/json'}})
    return await api.delete(id)
}

export const putUser = async (user: TPutUser) => {
    const api = new Api({baseUrl: BASE_URL, endpoint: 'users', method: 'PUT', headers: {'Content-Type': 'application/json'}})
    return await api.put<TPutUser>(user, user.id)
}