const form = document.querySelector('#form')
const searchInput = document.querySelector('#search')
const songsContainer = document.querySelector('#songs-container')
const prevAndNextContainer = document.querySelector('#prev-and-next-container')

const apiURL = `https://api.ksoft.si/lyrics/search`

const insertSongsIntoPage = songsInfo => {
    songsContainer.innerHTML = songsInfo.data.map(song => `
    <li class="song">
    <span class="song-artist" ><strong>${song.artist.name}</strong> - ${song.title}</span>
    <button class="btn" data-artist="${song.artist.name}" data-song-title="${song.title}">Ver letra</button>
    </li>
    `).join('')
}

const fetchSongs = async term => {
    const response = await fetch(`${apiURL}/suggest/${term}`)   //invocando o fetch, estamos solicitando que o browser traga dados da url passsada no argumento
    const data = await response.json()                         //o response.json sozinho retorna uma Promise, já com o await, ele espera a Promise ser resolvida e atribuirá o valor da Promise para a const data
    insertSongsIntoPage(data)
}

form.addEventListener('submit', event => {
    event.preventDefault()                                     //evitar que o form seja enviado, pois iremos fazer a busca dentro da aplicação
    const searchTerm = searchInput.value.trim()                //trim irá remover os espaços em branco caso o usuário digite
    
    if (!searchTerm) {
        songsContainer.innerHTML = `<li class="warning-message">Por favor, digite um termo válido</li>`
        return                                                 //com o return, o else se torna descartável. a execução é parada e qualquer código abaixo será ignorado
    }

    fetch(searchTerm)
})
