import { allCompany, allDepartments, allUser, hireUserApi} from "../../../scripts/adminApi.js"
import { optionsDepart, renderAllDepart, renderAllUsers, universalModal } from "../../../scripts/adminModals.js"
import { checkUser } from "../../../scripts/checkUserApi.js"
import { getToken } from "../../../scripts/getToken.js"
import { toasty } from "../../../scripts/modalToasty.js"

async function checkLocal(){
    if(!localStorage.getItem('@Companies: tokenAcess')){
        window.location.replace('../../../index.html')
    }else{
        const response = await checkUser(JSON.parse(getToken()))

        if(!response.is_admin){
            window.location.replace('../user/userPage.html')
        }
    }

    
    listDepartment()
    listUser()
    makeDepart()
    listSelectCompanies()
}
checkLocal()

const logout = document.querySelector('#logout')
const body = document.querySelector('body')

logout.addEventListener('click', ()=>{
    localStorage.removeItem('@Companies: tokenAcess')
    window.location.replace('../../../index.html')
})

export async function listSelectCompanies(){
    const select = document.querySelector('#selectDepart')

    let option = document.createElement('option')
    option.innerText = 'Todos'
    option.id = 'allDepart'

    select.append(option, ...await optionsDepart())

    select.addEventListener('input', ()=>{
        listDepartment(select.selectedOptions[0].id)
    })
}
export function checkSelectCompanies(){
    const select = document.querySelector('#selectDepart')
    if(select.selectedOptions[0].id){
        listDepartment(select.selectedOptions[0].id)
    }else{
        listDepartment('allDepart')
    }
}

export async function listDepartment(id){
    const listDepart = document.querySelector('#listDepart')
    
    const response = await allDepartments(getToken())

    if(id == 'allDepart' || id == undefined){
        
        listDepart.innerHTML = ''
        response.forEach(elt => {
            listDepart.append(renderAllDepart(elt))
        });
    }else{
        let responseFiltered = response.filter(obj=> obj.companies.uuid == id)
        
        listDepart.innerHTML = ''
        responseFiltered.forEach(elt => {
            listDepart.append(renderAllDepart(elt))
        });
    }

}

export async function listUser(){
    const listUsers = document.querySelector('#listUsers')

    const response = await allUser(getToken())
    listUsers.innerHTML = ''
    response.forEach(async elt => {
        listUsers.append(await renderAllUsers(elt))
    })
}

async function makeDepart(){
    const createDepart = document.querySelector('#createDepart')

    createDepart.addEventListener('click', async ()=>{
        body.insertAdjacentElement("beforeend", await universalModal('make'))
    })
}

export async function nameCompany(uuid){
    const response = await allDepartments(getToken())

    const companyFiltred = response.filter(obj=> obj.uuid == uuid)

    let name = ''

    if(companyFiltred.length){
        name = companyFiltred[0].companies.name
    }

    return name
}

export async function engageUser(id){
    const engage = document.querySelector('#engage')
    const usersOutWork = document.querySelector('#listAllUsers')
    const divId = document.querySelector('#seeMore div').id

    const listAllUsers = document.querySelector('#listAllUsers')
    listAllUsers.innerHTML = ''
    let option = document.createElement('option')
     option.innerText = 'Selecionar usuário...'
     option.disabled = true
     option.hidden = true
     option.selected = true

    listAllUsers.append(option , ... await optionsDepart(getToken()))
    
    engage.addEventListener('click', async ()=>{
        if(usersOutWork.value !== 'Selecionar usuário...'){

            const obj = {
                user_uuid       : usersOutWork.selectedOptions[0].id,
                department_uuid : divId
            }

            body.insertAdjacentElement("beforeend", toasty(`Contratou: ${usersOutWork.value}!`))

            setTimeout(() => {
                document.querySelector('#toasty').remove()
            }, 1500);

            await hireUserApi(getToken(), JSON.stringify(obj))
            hireUsers(id)
            listUser()

            listAllUsers.innerHTML = ''
            let option = document.createElement('option')
            option.innerText = 'Selecionar usuário...'
            option.disabled = true
            option.hidden = true
            option.selected = true
            listAllUsers.append(option , ... await optionsDepart(getToken()))
        }
    })

}
export async function hireUsers(id){
    const listUserEngage = document.querySelector('#listUserEngage')
    
    const response = await allUser(getToken())
    let userFilter = 0
    userFilter = response.filter(obj=>{
        return obj.department_uuid == id
    })

    if(userFilter.length){
        listUserEngage.innerHTML = ''

        userFilter.forEach(async element => {
            listUserEngage.append(await renderAllUsers(element, true, id))
        }); 
    }else if(!userFilter.length){
        listUserEngage.innerHTML = ''
        listUserEngage.insertAdjacentHTML("beforeend",`<h3 class='text__align-center'>Este departamento não possui pessoas empregadas</h3>`)
    }
}