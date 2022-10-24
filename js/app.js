const listHamburger = document.getElementById('hamburgers')
const template = document.getElementById('template').content

const fragment = document.createDocumentFragment()

let hamburgers = []

document.addEventListener('DOMContentLoaded', () => {
    getHamburgers()
})

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
            printHamburgers()
        })
        .catch(err => console.error(err))
}

const printHamburgers = () => {
    hamburgers.forEach(hamburger => {
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