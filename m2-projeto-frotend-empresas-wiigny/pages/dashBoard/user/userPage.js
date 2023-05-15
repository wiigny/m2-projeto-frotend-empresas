async function checkLocal(){
    if(!localStorage.getItem('@Companies: tokenAcess')){
        window.location.replace('../../../index.html')
    }else{
        const response = await checkUser(JSON.parse(getToken()))

        if(response.is_admin){
            window.location.replace('../admin/adminPage.html')
        }
    }

    getUserInApi()
    listAllCompanyName()
}
checkLocal()

import { renderModal, checkCall, renderDepartment } from "../../../scripts/modal.js"
import { getUser, getEmployeeDepart} from "../../../scripts/employee.js"
import { getToken } from "../../../scripts/getToken.js"
import { checkUser } from "../../../scripts/checkUserApi.js"

const body = document.querySelector('body')
const pen = document.querySelector('#pen')
const logout = document.querySelector('#logout')

logout.addEventListener('click', ()=>{
    localStorage.removeItem('@Companies: tokenAcess')
    window.location.replace('../../login/login.html')
})

pen.addEventListener('click', ()=>{
    body.insertAdjacentElement("beforeend",checkCall('editUser'))
})

async function getUserInApi(){

    const userName = document.querySelector('#userName')
    const userEmail = document.querySelector('#email')
    const userLevel = document.querySelector('#level')
    const departament = document.querySelector('#department')

    const storage = getToken()

    const response = await getUser(storage)

    if(response.departament_uuid == null){
        response.departament_uuid = ''
    }
    if(response.professional_level == null){
        response.professional_level = ''
    }

    userName.innerText = response.username
    userEmail.innerText = response.email
    userLevel.innerText = response.professional_level
    departament.innerText = response.departament_uuid 
}

async function listAllCompanyName(){
    const emptyList = document.querySelector('#emptyList')
    const departmentName = document.querySelector('#departmentName')
    const ulTag = document.querySelector('#companyName ul')

    const response = await getEmployeeDepart(getToken())

    if(response.length > 0){
        emptyList.classList.add('dspl-none')
        departmentName.classList.remove('dspl-none')
        
        document.querySelector('#nameCompany').innerText = response[0].name
        document.querySelector('#nameDepart').innerText = response[0].description


        response.forEach(obj=>{
            obj.users.forEach(user=>{
                ulTag.append(renderDepartment(user))
            })
        })
    }



}
