import { allSector} from "./routesApi.js"

export function modalSectors(obj){
    let li = document.createElement('li')
        li.id = obj.uuid
        let p = document.createElement('p')
            p.innerText = obj.description
    li.appendChild(p)

    li.addEventListener('click', ()=>{
        console.log(p.innerText)
    })

    return li
}

export async function modalAllSectors(){
    const response = await allSector()

    const object = response.map(obj=>{
        let opt = document.createElement('option')
        opt.id = obj.uuid
        opt.innerText = obj.description
        return opt
    })
    
    return object
}  


export function modalCompanies(obj){
    const li = `
        <li id="${obj.uuid}" class="dspl-flex justy__cont-SB flex__direc-column p20">
            <h3>${obj.name}</h3>
            <div class="dspl-flex flex__direc-column gap20">
                <p>${obj.opening_hours}</p>
                <span>${obj.sectors.description}</span>
            </div>
        </li>
    `
    return li
}