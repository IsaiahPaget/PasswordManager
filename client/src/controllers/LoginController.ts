import type { loginDto } from '@/models/logins/loginDto'
import type { NewLoginRequestDto } from '@/models/logins/NewLoginRequestDto'
import type { UpdateLoginRequest } from '@/models/logins/UpdateLoginRequest'
import { ToNewLoginRequest } from '@/models/ModelMappers'
import type { Pagination } from '@/models/Pagination'
import { JWTSessionToken } from '@/LocalStorage'
import type { UpdateLoginResponse } from '@/models/logins/UpdateLoginResponse'

const ROUTE = "logins"
export async function GetAllLogins(pagination: Pagination): Promise<loginDto[] | undefined> {
    const sessionToken = localStorage.getItem(JWTSessionToken)
    
    if (sessionToken == null) {
        return 
    }
    const data = await fetch(
        `${import.meta.env.VITE_API_URL}/${ROUTE}?startIndex=${pagination.StartIndex}&maxRecords=${pagination.MaxRecords}&searchTerm=${pagination.SearchTerm !== "" ? pagination.SearchTerm : "%02%03"}`, 
        {
            headers: { Authorization: `Bearer ${sessionToken}` }
        }
    )
    if (data.status != 200) {
      return
    }
    const results: loginDto[] = await data.json()
    return results
}

export async function GetLoginById(id: number) {
    throw new Error("not implemented")
}

export async function UpdateLogin(login: UpdateLoginRequest): Promise<UpdateLoginResponse | undefined> {
    const sessionToken = localStorage.getItem(JWTSessionToken)
    
    if (sessionToken == null) {
        return 
    }

    const result = await fetch(
        `${import.meta.env.VITE_API_URL}/${ROUTE}/${login.id}`,
        {
            headers: {
                Authorization: `Bearer ${sessionToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(login)
        }
    )
    if (result.status != 200) {
      return
    }

    const data = await result.json()
    return data

}
export async function CreateLogin(login: NewLoginRequestDto): Promise<loginDto | undefined> {
    const sessionToken = localStorage.getItem(JWTSessionToken)
    
    if (sessionToken == null) {
        return 
    }

    const result = await fetch(
        `${import.meta.env.VITE_API_URL}/${ROUTE}`,
        {
            headers: {
                Authorization: `Bearer ${sessionToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(login)
        }
    )
    
    if (result.status != 201) {
      return
    }

    const data = await result.json()
    return data
}

export async function DeleteLogin(id: number): Promise<number | undefined> {
    const sessionToken = localStorage.getItem(JWTSessionToken)
    
    if (sessionToken == null) {
        return 
    }

    const result = await fetch(
        `${import.meta.env.VITE_API_URL}/${ROUTE}/${id}`,
        {
            headers: {
                Authorization: `Bearer ${sessionToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "DELETE",
        }
    )
    
    if (result.status != 200) {
      return
    }

    const data = await result.json()
    return data
}