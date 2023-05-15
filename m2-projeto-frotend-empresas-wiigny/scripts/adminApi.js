const baseUrl = 'http://localhost:6278'

export async function allDepartments(token){
    
    const options = {
        headers:{
            Authorization: `Bearer ${JSON.parse(token)}`
        }
    }


    try{
        const response = await fetch(`${baseUrl}/departments`, options)

        const responseJson = await response.json()

        return responseJson

    }catch(error){
        console.log(error)
    }
}

export async function allUser(token){
    
    const options = {
        headers:{
            Authorization: `Bearer ${JSON.parse(token)}`
        }
    }


    try{
        const response = await fetch(`${baseUrl}/users`, options)

        const responseJson = await response.json()

        return responseJson

    }catch(error){
        console.log(error)
    }
}

export async function allCompany(){
    try{
        const response = await fetch(`${baseUrl}/companies`)

        const responseJson = await response.json()

        return responseJson

    }catch(error){
        console.log(error)
    }
}

export async function createDepartments(token, obj){
    
    const options = {
        method: 'POST',
        headers:{
            'Content-type':'application/json',
            Authorization: `Bearer ${JSON.parse(token)}`
        },
        body: obj
    }


    try{
        const response = await fetch(`${baseUrl}/departments`, options)

        const responseJson = await response.json()

        console.log(responseJson)

        return responseJson

    }catch(error){
        console.log(error)
    }
}

export async function usersOutOfWork(token){
    
    const options = {
        headers:{
            Authorization: `Bearer ${JSON.parse(token)}`
        }
    }

    try{
        const response = await fetch(`${baseUrl}/admin/out_of_work`, options)

        const responseJson = await response.json()

        return responseJson

    }catch(error){
        console.log(error)
    }
}

export async function hireUserApi(token, obj){
    
    const options = {
        method: 'PATCH',
        headers:{
            'Content-type':'application/json',
            Authorization: `Bearer ${JSON.parse(token)}`
        },
        body: obj
    }


    try{
        const response = await fetch(`${baseUrl}/departments/hire/`, options)

        const responseJson = await response.json()

        return responseJson

    }catch(error){
        console.log(error)
    }
}

export async function deletUser(token, uuid){
    const options = {
        method: 'DELETE',
        headers:{
            Authorization: `Bearer ${JSON.parse(token)}`
        }
    }

    try{
        const response = await fetch(`${baseUrl}/admin/delete_user/${uuid}`, options)

        const responseJson = await response.json()

        console.log(responseJson)

        return responseJson

    }catch{
        console.log('Usuário excluido')
    }
}

export async function editUser(token, uuid, obj){
    const options = {
        method: 'PATCH',
        headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${JSON.parse(token)}`
        },
        body: obj
    }

    try{
        const response = await fetch(`${baseUrl}/admin/update_user/${uuid}`, options)

        const responseJson = await response.json()

        return responseJson

    }catch{
        console.log('Usuário excluido')
    }
}

export async function editDepart(token, uuid, obj){
    const options = {
        method: 'PATCH',
        headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${JSON.parse(token)}`
        },
        body: obj
    }

    try{
        const response = await fetch(`${baseUrl}/departments/${uuid}`, options)

        const responseJson = await response.json()

        return responseJson

    }catch{
        console.log('Usuário excluido')
    }
}

export async function deletDepart(token, uuid){
    const options = {
        method: 'DELETE',
        headers:{
            Authorization: `Bearer ${JSON.parse(token)}`
        }
    }

    try{
        const response = await fetch(`${baseUrl}/departments/${uuid}`, options)

        const responseJson = await response.json()

        return responseJson

    }catch{
        console.log('Departamento excluído')
    }
}

export async function dismissUser(token,uuid){
    const options = {
        method: 'PATCH',
        headers:{
            Authorization: `Bearer ${JSON.parse(token)}`
        }
    }

    try{
        const response = await fetch(`${baseUrl}/departments/dismiss/${uuid}`, options)

        const responseJson = await response.json()

        return responseJson

    }catch{
        console.log('Usuário demitido')
    }
}