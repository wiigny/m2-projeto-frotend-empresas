import { editEmployee } from "./employee.js"
import { getToken } from "./getToken.js"

const body = document.querySelector('body')

export function checkCall(element){
    if(element == 'editUser'){
        return renderModal("Editar Perfil", 3, 'Editar perfil')
    }
}

export function renderModal(title,button){
    let section = document.createElement('section')
        section.classList.add('dspl-flex', 'align__items-center', 'justy__cont-center')
        section.id = 'sectionModal'

        let form = document.createElement('form')
            form.classList.add('dspl-flex', 'flex__direc-column', 'gap20')

            let titleModal = document.createElement('h2')
                titleModal.innerText = title 
            
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
                input1.type = 'text'
                input1.placeholder = 'Seu nome'

            let input2 = document.createElement('input')
                input2.type = 'email'
                input2.placeholder = 'Seu e-mail'

            let input3 = document.createElement('input')
                input3.type = 'password'
                input3.placeholder = 'Sua senha'
            
            let buttonModal = document.createElement('button')
                buttonModal.innerText = button
                buttonModal.classList = 'button2'
                buttonModal.disabled = true

            form.addEventListener('keyup', ()=>{
                if(input1.value !== '' && input2.value !== '' && input3.value !== ''){
                    buttonModal.disabled = false
                }else{
                    buttonModal.disabled = true
                }
            })
            
            buttonModal.addEventListener('click', (e)=>{
                e.preventDefault()
                const info = {
                    username:input1.value,
                    password:input3.value,
                    email:input2.value
                }
               
                editEmployee(JSON.stringify(info), getToken())
                setTimeout(() => {
                    location.reload()
                }, 2000);
            })

        form.append(titleModal,buttonClose, input1, input2, input3, buttonModal)
    
    section.appendChild(form)

    return section
}

export function renderDepartment(obj){
    let li = document.createElement('li')
        li.classList = 'dspl-flex flex__direc-column gap20'

        let h3 = document.createElement('h3')
            h3.innerText = obj.username

        let p = document.createElement('p')
            p.innerText = obj.professional_level
    li.append(h3,p)

    return li
}

export function modalButtons(btn1, btn2){
    const div = `
        <div id="modalButtons" class="dspl-flex gap20">
        <button id="${btn2.toLowerCase()}" class="button1 dspl-initial text6 font-w700">${btn2}</button>
        <button id="${btn1.toLowerCase()}" class="button2 dspl-initial text6 font-w700">${btn1}</button>
        </div>
    `
    return div
}