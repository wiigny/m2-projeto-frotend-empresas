export function toasty(msg, color = 'green'){

    const div = document.createElement('div')
        div.id = 'toasty'
        const paragraph = document.createElement('p')
            paragraph.style.color = color
            paragraph.innerText = msg
    div.appendChild(paragraph)

    return div
}