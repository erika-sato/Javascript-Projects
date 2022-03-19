const postsContainer = document.querySelector('#posts-container')
const loaderContainer = document.querySelector('.loader')
const filterInput = document.querySelector('#filter')

let page = 1

const getPosts = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`)   //fetch faz uma requisição http e traz os dados da url que foi especificada por argumento
    return response.json()    
}

const addPostsIntoDOM = async () => {    //fç async pois dentro dela é invocada a getPosts (que retorna uma Promise), fazendo-se necessário usar o await (que só funciona em fç async) para obter o resultado da Promise. 
    const posts = await getPosts()       //abaixo, utilizado formato de destructuring
    const postsTemplate = posts.map(({id, title, body}) => `    
    <div class="post">
        <div class="number">${id}</div>
        <div class="post-info">
             <h2 class="post-title">${title}</h2>
             <p class="post-body">${body}</p>
        </div>
    </div>
    `).join('')

    postsContainer.innerHTML += postsTemplate  //postsContainer recebe o valor que já possui e é concatenado à string postsTemplate. O innerHTML parseará essa concatenação para HTML
}

addPostsIntoDOM()

//scrollTop: distância entre o topo do doc e o topo visível do doc; 
//scrollHeight: altura total do doc incluindo suas partes não visíveis; 
//clientHeight: altura entre o topo e o final da parte visível.

const getNextPosts = () => {
    setTimeout(() => {
         page++
        addPostsIntoDOM()
    }, 300)  //o tempo para o loader para desaparecer no css é de 300, por isso a fç do 1º argumento deve ser executada após 300 milissegundos, evitando sobreposição do loader sobre os posts 
}

const removeLoader = () => {
    setTimeout(() => {                   //setTimeOut invoca uma fç imediatamente após o tempo especificado. 1º argumento: fç a ser executada; 2º: milissegundos
        loaderContainer.classList.remove('show')
        getNextPosts()   
    }, 1000)  
     
}

const showLoader = () => {
    loaderContainer.classList.add('show')
    removeLoader()
}

window.addEventListener('scroll', () => {
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement
    const isPageBottomAlmostReached = scrollTop + clientHeight >= scrollHeight - 10   
    if (isPageBottomAlmostReached) {
        showLoader()
    }
})

const showPostIfMatchInputValue = inputValue => post => {                          //fç com parâmetro post acessa o inputValue que está em outro escopo
    const postTitle = post.querySelector('.post-title').textContent.toLowerCase()
    const postBody = post.querySelector('.post-body').textContent.toLowerCase()
    if(postTitle.includes(inputValue) || postBody.includes(inputValue)) {
        post.style.display = 'flex'
        return
    }

    post.style.display = 'none'
}

const handleInputValue = event => {       //event: objeto disponibilizado pelo browser que contém informações sobre um evento que aconteceu
    const inputValue = event.target.value.toLowerCase()       //target: armazena a referência do elemento em que o evento ocorreu (neste caso, o elemento é o input)         
    const posts = document.querySelectorAll('.post')

    posts.forEach(showPostIfMatchInputValue(inputValue))  //inputValue passado como argumento para que essa variável possa ser acessada no escopo acima
}

filterInput.addEventListener('input', handleInputValue)