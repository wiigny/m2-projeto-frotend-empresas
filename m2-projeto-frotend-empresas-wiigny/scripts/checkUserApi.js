const baseUrl = 'http://localhost:6278'

export async function checkUser(token){
    const options = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    try{
        const response = await fetch(`${baseUrl}/auth/validate_user`, options)

        const responseJson = await response.json()

        return responseJson

    }catch(error){
        console.log(error)
    }
    
}