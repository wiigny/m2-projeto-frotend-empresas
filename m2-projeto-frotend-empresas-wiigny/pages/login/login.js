import { loginApi } from "../../scripts/routesApi.js";
import { checkUser } from "../../scripts/checkUserApi.js";
import { toasty } from "../../scripts/modalToasty.js";
import { modalButtons } from "../../scripts/modal.js";

const body = document.querySelector('body')
const nav = document.querySelector('nav')
const tagForm = document.querySelector('form')
const pEmail = document.querySelector('.email')
const pPass = document.querySelector('.password')

async function form(){
    const elements = [...tagForm.elements]

    elements.forEach(elt =>{
        elt.addEventListener('click', async (e)=>{
            e.preventDefault()

            if(elt.tagName == "BUTTON" && elt.id == 'loginUser'){
                const email = elements[0].value
                const password = elements[1].value

                const data = {
                    email: email,
                    password: password
                }

                const token = await loginApi(data)

                if(token.error){
                    if(token.error == 'email invalid!'){
                        pEmail.classList.remove('dspl-none')
                        setTimeout(()=>{
                            pEmail.classList.add('dspl-none')
                        }, 1500)
                    }
                    if(token.error == 'password invalid!'){
                        pPass.classList.remove('dspl-none')
                        setTimeout(()=>{
                            pPass.classList.add('dspl-none')
                        }, 1500)
                    }
                }

                if(token.token){

                    localStorage.setItem('@Companies: tokenAcess', JSON.stringify(token.token))
    
                    const user = await checkUser(token.token)

                    body.insertAdjacentElement("beforeend", toasty('Login efetuado com sucesso!'))

                    setTimeout(() => {
                        if(user.is_admin){
                            window.location.replace('../dashBoard/admin/adminPage.html')
                        }else{
                            window.location.replace('../dashBoard/user/userPage.html')
                        }
                    }, 2000);
                }
            }

            if(elt.tagName == "BUTTON" && elt.id == 'registerUser'){
                window.location.replace('../register/register.html')
            }
        })
    })

}
form()

function buttons(){
    const buttons = [...nav.children]
    buttons.forEach(btn =>{
        btn.addEventListener('click', ()=>{

            if(btn.id == 'hamburguer'){
                
                const imgHambgr = document.querySelector('#hamburguer img')
                if(imgHambgr.src.includes('hamburguer')){
                    imgHambgr.src = '../../assets/close.svg'
                    document.querySelector('header').insertAdjacentHTML("beforeend", modalButtons('Cadastro', 'Home'))
                    redirect()
                }else{
                    imgHambgr.src = '../../assets/hamburguer.svg'
                    document.querySelector('#modalButtons').remove()
                }
            }else if(btn.id == 'home'){
                window.location.replace('../../index.html')
            }else{
                window.location.replace('../register/register.html')
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
            if(btn.id == 'cadastro'){
                window.location.replace('../../pages/register/register.html')
            }else{
                window.location.replace('../../index.html')
            }
        })
    })
}