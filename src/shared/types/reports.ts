export type TReport = {
    userId:number;
    id:number;
    title:string;
    description:string;
}

export type TReports = Array<TReport>

export type TPostReport = Omit<TReport, 'id'>
export type TPutReport = TReport