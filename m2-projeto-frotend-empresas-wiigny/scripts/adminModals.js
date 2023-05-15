import { allCompany, createDepartments, usersOutOfWork, allUser, deletUser, editUser, editDepart, deletDepart, dismissUser } from "./adminApi.js"
import { getToken } from "./getToken.js"
import { checkSelectCompanies, engageUser, hireUsers, listDepartment, listUser ,nameCompany } from "../pages/dashBoard/admin/adminPage.js"
import { toasty } from "./modalToasty.js"

const body = document.querySelector('body')

export function renderAllDepart(obj){
    let li = document.createElement('li')
        li.classList = 'dspl-flex flex__direc-column justy__cont-SB'
        li.id = obj.uuid
        let div1 = document.createElement('div')
            div1.classList = 'dspl-flex flex__direc-column gap10'

            let h2 = document.createElement('h2')
                h2.innerText = obj.name
            
            let descrip = document.createElement('p')
                descrip.innerText = obj.description
            
            let companie = document.createElement('p')
                companie.innerText = obj.companies.name
        div1.append(h2, descrip, companie)

        let div2 = document.createElement('div')
            div2.classList = 'dspl-flex justy__cont-center gap10'
            let button1  = document.createElement('button')
                button1.className = 'viewMore'
            let button2  = document.createElement('button')
                button2.className = 'editDepart'
            let button3  = document.createElement('button')
                button3.className = 'deletDepart'
        div2.append(button1, button2, button3)
    li.append(div1, div2)

    button1.addEventListener('click', async (e)=>{
       body.insertAdjacentHTML("beforeend",seeMore(li.id, h2.innerText, descrip.innerText, companie.innerText))

       const buttonClose = document.querySelector('#buttonClose')
       const modal = document.querySelector('#seeMore')

       closeModal(buttonClose, modal)
       engageUser(li.id)
       hireUsers(li.id)
    })

    button2.addEventListener('click', async ()=>{
        body.insertAdjacentElement('beforeend', await universalModal('editDepart', li.id, descrip.innerText))
    })

    button3.addEventListener('click', async ()=>{
        body.insertAdjacentElement('beforeend', modalDelet(`Realmente deseja deletar o departamento ->" ${descrip.innerText} ", e demitir seus funcionários?`, 'Confirmar' ,li.id))
    })

    return li
}

export async function renderAllUsers(obj, delet, idDepart){
    if(obj.is_admin){
        return ''
    }
    let li = document.createElement('li')
        li.classList = 'dspl-flex flex__direc-column justy__cont-SB'
        let div1 = document.createElement('div')
            div1.classList = 'dspl-flex flex__direc-column gap10'

            let h2 = document.createElement('h2')
                h2.innerText = obj.username
            
            let descrip = document.createElement('p')
                descrip.innerText = obj.professional_level
            
            let companie = document.createElement('p')
                companie.innerText = await nameCompany(obj.department_uuid)
        div1.append(h2, descrip, companie)

        let div2 = document.createElement('div')
            div2.classList = 'dspl-flex justy__cont-center align__items-center gap10'
            let button = [...buttonsOrDelet(delet, obj.uuid, obj.username, idDepart)]
        div2.append(...button)

    li.append(div1, div2)

    return li
}

function buttonsOrDelet(delet, uuid, nameUser, idDepart){
    if(delet){
        let buttonDismiss = document.createElement('button')
            buttonDismiss.id = 'buttonDismiss'
            buttonDismiss.classList = 'button1'
            buttonDismiss.innerText = 'Desligar'

            buttonDismiss.addEventListener('click', async ()=>{
                await dismissUser(getToken(), uuid)
                
                body.insertAdjacentElement("beforeend",toasty("Usuário demitido!"))

                setTimeout(() => {
                    document.querySelector('#toasty').remove()
                }, 2000);
                
                setTimeout(() => {
                    hireUsers(idDepart)
                    engageUser(idDepart)
                }, 500);

            })

        return [buttonDismiss]
    }else{
        let buttonEdit  = document.createElement('button')
            buttonEdit.className = 'editDepartColor'
        let buttonDelet  = document.createElement('button')
            buttonDelet.className = 'deletDepart'

        buttonEdit.addEventListener('click', async ()=>{
            body.insertAdjacentElement('beforeend', await universalModal('edit', uuid))
        })
        buttonDelet.addEventListener('click', ()=>{
            body.insertAdjacentElement('beforeend',modalDelet(`Realmente deseja remover o usuário ${nameUser} ?`,'Deletar' , uuid))
        })
        return [buttonEdit,buttonDelet]
        
    }
}

export function universalModal(string, uuid, descrip){
    if(string === 'make'){
        return makeDepart()

    }else if(string === 'edit'){
        return editInfoUser(uuid)

    }else if(string === 'editDepart'){
        return editInfoDepart(uuid, descrip)
    }
}

async function makeDepart(){
    let section = document.createElement('section')
        section.classList.add('dspl-flex', 'align__items-center', 'justy__cont-center')
        section.id = 'sectionModal'

        let form = document.createElement('form')
            form.classList.add('dspl-flex', 'flex__direc-column', 'gap20')

            let titleModal = document.createElement('h2')
                titleModal.innerText = 'Criar Departamento'
            
            let buttonClose = document.createElement('button')
                buttonClose.classList = 'button3'
                buttonClose.id = 'buttonClose'
                let img = document.createElement('img')
                    img.src = '../../../assets/close.svg'
            buttonClose.appendChild(img)

            buttonClose.addEventListener('click', ()=>{
                section.remove()
            })

            let input1 = document.createElement('input')
                input1.classList = 'input1'
                input1.type = 'text'
                input1.placeholder = 'Nome do departamento'

            let input2 = document.createElement('input')
                input2.classList = 'input1'
                input2.type = 'text'
                input2.placeholder = 'Descrição'

            let select = document.createElement('select')
                select.classList = 'input1'
                let option = document.createElement('option')
                    option.innerText = 'Selecionar empresa'
                    option.disabled = true
                    option.hidden = true
                    option.selected = true
            select.append( option ,...await optionsDepart())
                
            
            let buttonModal = document.createElement('button')
                buttonModal.innerText = 'Criar o departamento'
                buttonModal.classList = 'button2'
                buttonModal.disabled = true

            form.addEventListener('keyup', ()=>{
                if(input1.value !== '' && input2.value !== ''){
                    buttonModal.disabled = false
                }else{
                    buttonModal.disabled = true
                }
            })
            
            buttonModal.addEventListener('click', (e)=>{
                e.preventDefault()

                const info = {
                    name: input1.value,
                    description: input2.value,
                    company_uuid: select.selectedOptions[0].id
                }

                createDepartments(getToken(), JSON.stringify(info))

                listDepartment()
            })

        form.append(titleModal,buttonClose, input1, input2, select ,buttonModal)
    
    section.appendChild(form)

    return section
}
async function editInfoUser(uuid){
    let section = document.createElement('section')
    section.classList.add('dspl-flex', 'align__items-center', 'justy__cont-center')
    section.id = 'sectionModal'

    let form = document.createElement('form')
        form.classList.add('dspl-flex', 'flex__direc-column', 'gap20')

        let titleModal = document.createElement('h2')
            titleModal.innerText = 'Editar Usuário'
        
        let buttonClose = document.createElement('button')
            buttonClose.classList = 'button3'
            buttonClose.id = 'buttonClose'
            let img = document.createElement('img')
                img.src = '../../../assets/close.svg'
        buttonClose.appendChild(img)

        buttonClose.addEventListener('click', ()=>{
            section.remove()
        })

        let select = document.createElement('select')
            select.classList = 'input1'
            let option = document.createElement('option')
                option.innerText = 'Selecionar modalidade de trabalho'
                option.disabled = true
                option.hidden = true
                option.selected = true
        select.append( option ,...await optionsDepart(false, ['estágio', 'júnior', 'pleno', 'sênior']))
        
        let select2 = document.createElement('select')
            select2.classList = 'input1'
            let option2 = document.createElement('option')
                option2.innerText = 'Selecionar nível profissional'
                option2.disabled = true
                option2.hidden = true
                option2.selected = true
        select2.append( option2 ,...await optionsDepart(false, ['home office','presencial', 'híbrido']))
        
        let buttonModal = document.createElement('button')
            buttonModal.innerText = 'Editar'
            buttonModal.classList = 'button2'
            buttonModal.disabled = true

        form.addEventListener('input', ()=>{
            if(select.value !== 'Selecionar modalidade de trabalho' && select2.value !== 'Selecionar nível profissional'){
                buttonModal.disabled = false
            }else{
                buttonModal.disabled = true
            }
        })
        
        buttonModal.addEventListener('click', (e)=>{
            e.preventDefault()

            const info = {
                kindofwork: select2.value,
                professional_level: select.value,
            }

            editUser(getToken(), uuid ,JSON.stringify(info))

            body.insertAdjacentElement('beforeend',toasty('Usuário atualizado!'))

            setTimeout(() => {
                section.remove()
                listUser()
            }, 500);
            setTimeout(() => {
                document.querySelector('#toasty').remove()
            }, 2000);
        })

    form.append(titleModal,buttonClose, select, select2 ,buttonModal)

section.appendChild(form)

return section
}
async function editInfoDepart(uuid, descrip){
    let section = document.createElement('section')
    section.classList.add('dspl-flex', 'align__items-center', 'justy__cont-center')
    section.id = 'sectionModal'

    let form = document.createElement('form')
        form.classList.add('dspl-flex', 'flex__direc-column', 'gap20')

        let titleModal = document.createElement('h2')
            titleModal.innerText = 'Editar Departamento'
        
        let buttonClose = document.createElement('button')
            buttonClose.classList = 'button3'
            buttonClose.id = 'buttonClose'
            let img = document.createElement('img')
                img.src = '../../../assets/close.svg'
        buttonClose.appendChild(img)

        buttonClose.addEventListener('click', ()=>{
            section.remove()
        })

        let textArea = document.createElement('textarea')
        textArea.wrap = 'hard'
        textArea.style.height = '150px'
        textArea.style.resize = 'none'
        textArea.textContent = descrip
        
        let buttonModal = document.createElement('button')
            buttonModal.innerText = 'Salvar alterações'
            buttonModal.classList = 'button2'
            buttonModal.disabled = true

        form.addEventListener('input', ()=>{
            if(textArea.textContent){
                buttonModal.disabled = false
            }else{
                buttonModal.disabled = true
            }
        })
        
        buttonModal.addEventListener('click', (e)=>{
            e.preventDefault()

            const info = {
                description: textArea.value
            }

            editDepart(getToken(), uuid ,JSON.stringify(info))

            body.insertAdjacentElement('beforeend',toasty('Departamento atualizado!'))

            setTimeout(() => {
                section.remove()
                checkSelectCompanies()
            }, 500);
            setTimeout(() => {
                document.querySelector('#toasty').remove()
            }, 2000);
        })

    form.append(titleModal,buttonClose, textArea ,buttonModal)

section.appendChild(form)

return section
}

export async function optionsDepart(outOfWork, list){
    const response = await allCompany()    
    debugger
    if(outOfWork){
        let users = 0
        users = await usersOutOfWork(outOfWork) 

        let object = 0
        object = users.map(obj=>{

            let opt = document.createElement('option')
            opt.id = obj.uuid
            opt.innerText = obj.username
            return opt
        })

        return object
    }

    if(list){
        
        const users = list

        let object = 0
        object = users.map(string=>{

            let opt = document.createElement('option')
            opt.innerText = string
            return opt
        })

        return object
    }

    let object = 0
    object = response.map(obj=>{
        let opt = document.createElement('option')
        opt.id = obj.uuid
        opt.innerText = obj.name
        return opt
    })
    
    return object
}

function seeMore(id, h2, descrip, companie){
    const section = `
        <section id="seeMore" class="dspl-flex align__items-center">
            <div id="${id}" class="dspl-flex flex__direc-column gap20 container" style="position: relative ;">
                <h2>${h2}</h2>
                <div class="dspl-flex align__items-center justy__cont-SB">
                    <div class="dspl-flex gap10 flex__direc-column justy__cont-SB">
                        <p>${descrip}</p>
                        <p>${companie}</p>
                    </div>  

                    <div class="dspl-flex gap30 flex__direc-column align__items-end" style="width: 40%;">
                        <select id="listAllUsers" class="input1 wFullPerc"></select>
                        <button id="engage" class="button4">Contratar</button>
                    </div>
                </div>

                <ul id="listUserEngage" class="dspl-flex gap20 flex__direc-row align__items-center">
                    <h3 class='text__align-center'>Este departamento não possui pessoas empregadas</h3>
                </ul>

                <button id="buttonClose" class="button3">
                    <img src="../../../assets/close.svg" alt="close">
                </button>
            </div>
        </section>
    `

    return section
}

function closeModal(buttonClose, modal){
    buttonClose.addEventListener('click', ()=>{
        modal.remove()
    })
}

function modalDelet(msg,buttonName, uuid){
    let section = document.createElement('section')
    section.classList.add('dspl-flex', 'align__items-center', 'justy__cont-center')
    section.id = 'sectionModal'

        let div = document.createElement('div')
        div.classList = 'dspl-flex flex__direc-column justy__cont-SA align__items-center'

            let buttonClose = document.createElement('button')
                buttonClose.classList = 'button3'
                buttonClose.id = 'buttonClose'
                let img = document.createElement('img')
                    img.src = '../../../assets/close.svg'
                buttonClose.appendChild(img)

            buttonClose.addEventListener('click', ()=>{
                section.remove()
            })
            
            let h2 = document.createElement('h2')
                h2.classList = 'text__align-center'
                h2.innerText = msg

            let button = document.createElement('button')
                button.classList = 'button4'
                button.innerText = buttonName

            eventButton(button,buttonName,uuid,section)
    
        div.append(buttonClose, h2, button)
    section.append(div)

    return section
}
function eventButton(button, buttonName,uuid,section){
    if(buttonName == 'Confirmar'){
        button.addEventListener('click', ()=>{

            deletDepart(getToken(), uuid)

            body.insertAdjacentElement('beforeend',toasty('Departamento excluído!'))

            setTimeout(() => {
                section.remove()
                checkSelectCompanies()
            }, 500);
            setTimeout(() => {
                document.querySelector('#toasty').remove()
            }, 2000);
        })
    }else{
        button.addEventListener('click', ()=>{
            deletUser(getToken(), uuid)
            listUser()
        })
    }
}