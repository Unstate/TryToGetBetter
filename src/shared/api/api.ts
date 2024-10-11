type TApi = {
    baseUrl:string;
    headers?:HeadersInit;
    method: 'POST' | 'GET' | 'PUT' | 'DELETE';
    endpoint: string;
}

export class Api {
    baseUrl:TApi['baseUrl'];
    headers?: TApi['headers'];
    method: TApi['method'];
    endpoint: TApi['endpoint']

    constructor({method,baseUrl,headers, endpoint}:TApi) {
        this.baseUrl = baseUrl
        this.method = method
        this.headers = headers
        this.endpoint = endpoint
    }

    async request<T>(url:string, data?:T):Promise<T | undefined> {

        const config: RequestInit = {
            method: this.method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (data) {
            config.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(url, {
                method: this.method,
                headers: this.headers,
                body: JSON.stringify(data)
            })
            return response.json()
        } catch (e) {
            console.error(e)
        }
    }

    async get<T>():Promise<T | undefined> {
        return this.request<T>(`${this.baseUrl}/${this.endpoint}`)
    }

    async post<T>(data: T) {
        return this.request<T>(`${this.baseUrl}/${this.endpoint}`, data)
    }

    async put<T>(data: T, id:number) {
        return this.request<T>(`${this.baseUrl}/${this.endpoint}/${id}`, data)
    }

    async delete(id:number) {
        return this.request(`${this.baseUrl}/${this.endpoint}/${id}`)

    }
}
