import { modalButtons } from "../../scripts/modal.js"
import { modalSectors, modalCompanies, modalAllSectors } from "../../scripts/modalSectors.js"
import { allSector, companies } from "../../scripts/routesApi.js"

const ulTag = document.querySelector('#listCompany')
const selectSector = document.querySelector('#selectList')
const nav = document.querySelector('nav')

async function events(){

    let option = document.createElement('option')
        option.innerText = 'Selecionar Setor'
        option.disabled = true
        option.hidden = true
        option.selected = true
    let option2 = document.createElement('option')
        option2.innerText = 'Todos'
    selectSector.append(option,option2)

    selectSector.append(...await modalAllSectors())

    selectSector.addEventListener('input', async ()=>{
        renderDepartments(selectSector.value)
    })
    
}
events()

async function renderDepartments(string){
    const response = await companies()
    let listFilter = response

    
    if(string && string != 'Todos'){
        listFilter = listFilter.filter(obj=> obj.sectors.description == string)
        ulTag.innerHTML = ''
        listFilter.forEach(obj=>{
            ulTag.insertAdjacentHTML("afterbegin",modalCompanies(obj))
        })
    }else{
        ulTag.innerHTML = ''
        listFilter.forEach(obj=>{
            ulTag.insertAdjacentHTML("afterbegin",modalCompanies(obj))
        })
    }
}
renderDepartments()

function buttons(){
    const buttons = [...nav.children]
    buttons.forEach(btn =>{
        btn.addEventListener('click', ()=>{

            if(btn.id == 'hamburguer'){
                
                const imgHambgr = document.querySelector('#hamburguer img')
                if(imgHambgr.src.includes('hamburguer')){
                    imgHambgr.src = './assets/close.svg'
                    document.querySelector('header').insertAdjacentHTML("beforeend", modalButtons('Cadastro', 'Login'))
                    redirect()
                }else{
                    imgHambgr.src = './assets/hamburguer.svg'
                    document.querySelector('#modalButtons').remove()
                }
            }else if(btn.id == 'login'){
                window.location.replace('./pages/login/login.html')
            }else{
                window.location.replace('./pages/register/register.html')
            }
        })
    })
}
buttons()
function redirect(){
    const modalButton = document.querySelector('#modalButtons')
    const buttons = [...modalButton.children]

    buttons.forEach(btn=>{
        btn.addEventListener('click', (e)=>{
            e.preventDefault()
            if(btn.id == 'login'){
                window.location.replace('./pages/login/login.html')
            }else{
                window.location.replace('./pages/register/register.html')
            }
        })
    })
}
