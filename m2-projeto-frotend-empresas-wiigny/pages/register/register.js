import { registerApi } from "../../scripts/routesApi.js"
import { toasty } from "../../scripts/modalToasty.js"
import { modalButtons } from "../../scripts/modal.js"

const form = document.querySelector('form')
const nav = document.querySelector('nav')

async function eventsForm(){
    const elements = [...form.elements]
    
    elements[4].disabled = true

    form.addEventListener('keyup', ()=>{
        elements.forEach(elt =>{
            if(elements[0].value !== '' && elements[1].value !== '' && elements[2].value !== ''){
                elements[4].disabled = false
            }else{
                elements[4].disabled = true
            }
        })
    })

    elements.forEach(elt=>{
        if(elt.tagName == 'BUTTON' && elt.id == 'registerUser'){
            elt.addEventListener('click', async (e) =>{
                e.preventDefault()
                
                const objeto = {
                    username            : elements[0].value,
                    password            : elements[2].value,
                    email               : elements[1].value,
                    professional_level  : elements[3].value.toLowerCase()
                }

                if(objeto.professional_level == 'nível profissional'){
                    objeto.professional_level = null 
                }

                const response = await registerApi(objeto)
                if(response.error){
                    document.querySelector('body').insertAdjacentElement("beforeend", toasty(response.error[0], 'red'))
                    
                    setTimeout(() => {
                        document.querySelector('#toasty').remove()
                    }, 1500);
                }

                if(response.uuid){
                    document.querySelector('body').insertAdjacentElement('beforeend', toasty('Conta registrada com sucesso!'))
                    
                    setTimeout(() => {
                        window.location.replace('../login/login.html')
                    }, 1500);
                }
                
            })    
        }
        if(elt.tagName == 'BUTTON' && elt.id == 'resume'){
            elt.addEventListener('click', ()=>{
                elements[4].disabled = true
            })
        }
    })  
}
eventsForm()

function buttons(){
    const buttons = [...nav.children]
    buttons.forEach(btn =>{
        btn.addEventListener('click', ()=>{

            if(btn.id == 'hamburguer'){
                
                const imgHambgr = document.querySelector('#hamburguer img')
                if(imgHambgr.src.includes('hamburguer')){
                    imgHambgr.src = '../../assets/close.svg'
                    document.querySelector('header').insertAdjacentHTML("beforeend", modalButtons('Home', 'Login'))
                    redirect()
                }else{
                    imgHambgr.src = '../../assets/hamburguer.svg'
                    document.querySelector('#modalButtons').remove()
                }
            }else if(btn.id == 'login'){
                window.location.replace('../login/login.html')
            }else{
                window.location.replace('../../index.html')
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
                window.location.replace('../../pages/login/login.html')
            }else{
                window.location.replace('../../index.html')
            }
        })
    })
}