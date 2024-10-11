import {Api} from "./api.ts";
import {BASE_URL} from './baseUrl.ts'
import {TOrganization, TOrganizations, TPostOrganization, TPutOrganization} from "../types/organization.ts";

export const getOrganizations = async () => {
    const api = new Api({baseUrl: BASE_URL, endpoint: 'organizations', method: 'GET', headers: {'Content-Type': 'application/json'}})
    return await api.get<TOrganizations>()
}

export const getOrganization = async (id:number) => {
    const api = new Api({baseUrl: BASE_URL, endpoint: `organizations/${id}`, method: 'GET', headers: {'Content-Type': 'application/json'}})
    return await api.get<TOrganization>()
}

export const postOrganization = async (organization: TPostOrganization) => {
    const api = new Api({baseUrl: BASE_URL, endpoint: 'organizations', method: 'POST', headers: {'Content-Type': 'application/json'}})
    return await api.post(organization)
}

export const deleteOrganization = async (id:number) => {
    const api = new Api({baseUrl: BASE_URL, endpoint: 'organizations', method: 'DELETE', headers: {'Content-Type': 'application/json'}})
    return await api.delete(id)
}

export const putOrganization = async (organization: TPutOrganization) => {
    const api = new Api({baseUrl: BASE_URL, endpoint: 'organizations', method: 'PUT', headers: {'Content-Type': 'application/json'}})
    return await api.put<TPutOrganization>(organization, organization.id)
}