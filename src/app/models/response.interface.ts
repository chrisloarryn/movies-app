interface PayloadI {
    refresh_token: string
    token: string
    type: 'bearer' | string
}

interface PayloadRefreshedI {
    token: string
    type: 'bearer' | string
}

interface UserI {
    email: string
    firstName: string
    lastName: string
}

interface DataResponse {
    payload: PayloadI
    user: UserI
}

interface DataResponseRefreshed {
    payload: PayloadRefreshedI
    user: UserI
}


export interface ResponseI {
    data: DataResponse
}

export interface ResponseRefreshedI {
    data: DataResponseRefreshed
}