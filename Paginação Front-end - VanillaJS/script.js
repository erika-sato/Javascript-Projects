const data = Array.from({ length: 100 })  //criando array de 100 itens
    .map((_, i) => `Item ${( i + 1 )}`)

//=============================================================================


let perPage = 5
const state = {
    page: 1,
    perPage,
    totalPage: Math.ceil(data.length / perPage),  //data length: total de elementos. A divisão resulta no nº de pág, o ceil arredonda p/ cima
    maxVisibleButtons: 5
}

const html = {
    get(element) {
    return document.querySelector(element)
    }
}

const controls = {
    next() {
        state.page++

        if(state.page > state.totalPage) {
            state.page--     //ao chegar na última pág, decrementa para não passar do nº total de pág
        }
    },

    prev() {
        state.page--

        if(state.page < 1) {
            state.page++      //ao chegar na 1ª pág, incrementa para não chegar ao zero 
        }
    },

    goTo(page) {
        if (page < 1) {   // ao estar na 1ª pág, evita que ao clicar na fç, ele vá p/ pág negativas
            page = 1
        }
        
        state.page = +page

        if (page > state.totalPage){
            state.page = state.totalPage  //ao clicar nesta fç estando na última pág, ele continua na última pág, não utrapassando p/ um nº maior
        }
    },

    createListeners() {
        html.get('.first').addEventListener('click', () => {
            controls.goTo(1)
            update()
        })

        html.get('.last').addEventListener('click', () => {
            controls.goTo(state.totalPage)
            update()
        })

        html.get('.next').addEventListener('click', () => {
            controls.next()
            update()
        })

        html.get('.prev').addEventListener('click', () => {
            controls.prev()
            update()
        })
    }
}

const list = {
    create(item) {
        const div = document.createElement('div')
        div.classList.add('item')
        div.innerHTML = item

        html.get('.list').appendChild(div)
    },

    update() {
        html.get('.list').innerHTML = ""

        let page = state.page - 1
        let start = page * state.perPage
        let end = start + state.perPage

        const paginatedItems = data.slice(start, end)

        paginatedItems.forEach(list.create)

    }
}

const buttons = {
    element: html.get('.pagination .numbers'),
    create(number) {
        
        const button = document.createElement('div')

        button.innerHTML = number

        if(state.page == number) {
            button.classList.add('active')
        }

        button.addEventListener('click', (event) => {
            const page = event.target.innerText

            controls.goTo(page)
            update()
        })

        buttons.element.appendChild(button)
        
    },

    update() {
        buttons.element.innerHTML = "" 
        const {maxLeft, maxRight} = buttons.calculateMaxVisible()
    
        for(let page = maxLeft; page <= maxRight; page++) {
            buttons.create(page)
        }
    },
    calculateMaxVisible() {
        const {maxVisibleButtons} = state
        let maxLeft = (state.page - Math.floor(maxVisibleButtons / 2))
        let maxRight = (state.page + Math.floor(maxVisibleButtons / 2))

        if (maxLeft < 1) {
            maxLeft = 1
            maxRight = maxVisibleButtons
        }

        if (maxRight > state.totalPage) {
            maxLeft = state.totalPage - (maxVisibleButtons - 1)
            maxRight = state.totalPage

            if (maxLeft < 1) maxLeft = 1
        }

        return {maxLeft, maxRight}

    }
}

function update() {
    list.update()
    buttons.update()
}

function init () {
    update()
    controls.createListeners()
}

init()



