const baseUrl = 'http://localhost:6278'

export async function editEmployee(info, token){

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(token)}`
        },
        body: info
    }

    try{
        const response = await fetch(`${baseUrl}/users`, options)

        const responseJson = response.json()

        console.log(responseJson)

    }catch(error){
        console.log(error)
    }
}

export async function getUser(token){
    const options = {
        headers: {
            Authorization: `Bearer ${JSON.parse(token)}`
        }
    }

    try{
        const response = await fetch(`${baseUrl}/users/profile`, options)

        const responseJson = response.json()

        return responseJson

    }catch(error){
        console.log(error)
    }
}

export async function getEmployeeDepart(token){

    const options = {
        headers: {
            Authorization: `Bearer ${JSON.parse(token)}`
        }
    }

    try{
        const response = await fetch(`${baseUrl}/users/departments/coworkers`, options)

        const responseJson = response.json()

        return responseJson 

    }catch(error){
        console.log(error)
    }
}