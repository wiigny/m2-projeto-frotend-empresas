const baseUrl = 'http://localhost:6278'

export async function loginApi(obj){

    const data = JSON.stringify(obj)

    const options = {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: data
    }

    try{
        const response = await fetch(`${baseUrl}/auth/login`, options)

        const responseJson = await response.json()

        return responseJson

    }catch(error){
        console.log(error)
    }
}

export async function allSector(){
    const options = {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjczOTBhZGYtMzhhNy00Y2VlLTg5ZWQtYzJiYWVmMzY4YmZmIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY2MzE5MzgxMiwiZXhwIjoxNjY0MDU3ODEyLCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.Mu8E39xt0RI29tviIsKXzat7ygEMKX7Ad_xT_jzGWa4`
    }

    try{
        const response = await fetch(`${baseUrl}/sectors`, options)

        const responseJson = await response.json()

        return responseJson

    }catch(error){
        console.log(error)
    }
}

export async function companies(){
    const options = {
        Authorization: `Bearer null`
    }

    try{
        const response = await fetch(`${baseUrl}/companies`, options)

        const responseJson = await response.json()

        return responseJson

    }catch(error){
        console.log(error)
    }
}

export async function registerApi(obj){
    
    const data = JSON.stringify(obj)

    const options = {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: data
    }

    try{
        const response = await fetch(`${baseUrl}/auth/register`, options)

        const responseJson = await response.json()

        return responseJson

    }catch(error){
        console.log(error)
    }

}