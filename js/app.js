const listHamburger = document.getElementById('hamburgers')
const template = document.getElementById('template').content

const fragment = document.createDocumentFragment()

const txtNombre = document.getElementById('inputNombre')
const btnBuscar = document.getElementById('btnBuscar')
const btnTodos = document.getElementById('btnTodos')

const txtNombreAlgo = document.getElementById('inputAlgo')
const btnTodosAlgo = document.getElementById('btnTodosAlgo')

let hamburgers = []

document.addEventListener('DOMContentLoaded', () => {
    getHamburgers()
})

btnBuscar.addEventListener('click', () => {
    console.log('input', txtNombre.value)
    if (txtNombre.value.trim().length === 0) {
        alert('No has escrito nada D:')
        return
    }

    const find = hamburgers.filter(dato => {
        return dato.name === txtNombre.value
    })

    if (find.length > 0) {
        printHamburgers(find)
    }else{
        alert('Hamburguesa no encontrada')
    }

    console.log('find', find)
})

btnTodos.addEventListener('click', () => { printHamburgers(hamburgers)})

/*
txtNombreAlgo.addEventListener('input', () => {
    console.log(':D')
    const encontrados = hamburgers.indexOf( (dato) => {
        return dato.name === txtNombreAlgo.value
    })
    printHamburgers(encontrados)
})
*/

const getHamburgers = () => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a848075595msh980eaae8c09c65fp1eb355jsnfaf6f19f7f7a',
            'X-RapidAPI-Host': 'burgers1.p.rapidapi.com'
        }
    };

    fetch('https://burgers1.p.rapidapi.com/burgers', options)
        .then(response => response.json())
        .then(response => {
            hamburgers = response
            console.log(hamburgers)
            printHamburgers(hamburgers)
        })
        .catch(err => console.error(err))
}

const printHamburgers = (obj) => {
    listHamburger.innerHTML = ''
    obj.forEach(hamburger => {
        template.querySelector('h1').textContent = hamburger.name
        
        template.querySelectorAll('li')[0].textContent = hamburger.ingredients[0]
        template.querySelectorAll('li')[1].textContent = hamburger.ingredients[1]
        template.querySelectorAll('li')[2].textContent = hamburger.ingredients[2]
        
        template.querySelectorAll('span')[1].textContent = hamburger.addresses[0].country
        template.querySelectorAll('span')[2].textContent = hamburger.addresses[0].line1 + ', ' + hamburger.addresses[0].line2 + ' ' + hamburger.addresses[0].number
        template.querySelectorAll('span')[3].textContent = hamburger.addresses[0].postcode

        template.querySelector('a').href = 'https://' + hamburger.web

        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })
    listHamburger.appendChild(fragment)
}