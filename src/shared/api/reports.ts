import {Api} from "./api.ts";
import {BASE_URL} from './baseUrl.ts'
import {TPostReport, TPutReport, TReports} from "../types/reports.ts";

export const getReports = async () => {
    const api = new Api({baseUrl: BASE_URL, endpoint: 'reports', method: 'GET', headers: {'Content-Type': 'application/json'}})
    return await api.get<TReports>()
}

export const getReport = async (id:number) => {
    const api = new Api({baseUrl: BASE_URL, endpoint: `reports/${id}`, method: 'GET', headers: {'Content-Type': 'application/json'}})
    return await api.get<TReports>()
}

export const postReport = async (report: TPostReport) => {
    const api = new Api({baseUrl: BASE_URL, endpoint: 'reports', method: 'POST', headers: {'Content-Type': 'application/json'}})
    return await api.post<TPostReport>(report)
}

export const deleteReport = async (id:number) => {
    const api = new Api({baseUrl: BASE_URL, endpoint: 'reports', method: 'DELETE', headers: {'Content-Type': 'application/json'}})
    return await api.delete(id)
}

export const putReport = async (report: TPutReport) => {
    const api = new Api({baseUrl: BASE_URL, endpoint: 'reports', method: 'PUT', headers: {'Content-Type': 'application/json'}})
    return await api.put<TPutReport>(report, report.id)
}