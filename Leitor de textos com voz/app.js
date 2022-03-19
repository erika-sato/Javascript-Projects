const main = document.querySelector('main')
const buttonInsertText = document.querySelector('.btn-toggle')
const divTextBox = document.querySelector('.text-box')
const closeDivTextBox = document.querySelector('.close')
const selectElement = document.querySelector('select')
const buttonReadText = document.querySelector('#read')
const textArea = document.querySelector('textarea')

const humanExpressions = [
    { img: './images/drink.jpg', text: 'Estou com sede' },
    { img: './images/food.jpg', text: 'Estou com fome' },
    { img: './images/tired.jpg', text: 'Estou cansado' },
    { img: './images/hurt.jpg', text: 'Estou machucado' },
    { img: './images/happy.jpg', text: 'Estou feliz' },
    { img: './images/angry.jpg', text: 'Estou com raiva' },
    { img: './images/sad.jpg', text: 'Estou triste' },
    { img: './images/scared.jpg', text: 'Estou assustado' },
    { img: './images/outside.jpg', text: 'Quero ir lá fora' },
    { img: './images/home.jpg', text: 'Quero ir para casa' },
    { img: './images/school.jpg', text: 'Quero ir para a escola' },
    { img: './images/grandma.jpg', text: 'Quero ver a vovó' }
]

const utterance = new SpeechSynthesisUtterance()

const setTextMessage = text => {
    utterance.text = text
}

const speakText = () => {
    speechSynthesis.speak(utterance)
}

const setVoice = event => {
    const selectedVoice = voices.find(voice => voice.name === event.target.value)  //find executa fç para cada item do array, e retorna o primeiro item que corresponde à condição especificada
    utterance.voice = selectedVoice
}

const addExpressionBoxesIntoDOM = () => {
    main.innerHTML = humanExpressions.map(({ img, text }) => `
    <div class="expression-box" data-js="${text}">
    <img src="${img}" alt="${text}" data-js="${text}">    
    <p class="info" data-js="${text}">${text}</p>      
    </div>
    `).join('')     //data: atributo html que posso nomear (desde que comece com data-). Usado neste caso para selecionar tanto os P quanto os IMG que possuem este mesmo atributo.
}

addExpressionBoxesIntoDOM()

const setStyleOfClickDiv = dataValue => {
    const div = document.querySelector(`[data-js="${dataValue}"]`)

        div.classList.add('active')
        setTimeout(() => {
            div.classList.remove('active')
        }, 1000)
}

main.addEventListener('click', event => {
    const clickedElement = event.target
    const clickedElementText = clickedElement.dataset.js
    const clickedElementMustBeSpoken = clickedElement.tagName === 'IMG' 
    || clickedElement.tagName === 'P'


    if (clickedElementMustBeSpoken) {
        setTextMessage(clickedElementText)
        speakText()
        setStyleOfClickDiv(clickedElementText)
    }
})

let voices = []

speechSynthesis.addEventListener('voiceschanged', () => {
    voices = speechSynthesis.getVoices()
    console.log(voices);

const googleVoice = voices.find(voice =>
    voice.name === 'Google português do Brasil')
const microsoftVoice = voices.find(voice =>
    voice.name === 'Microsoft Maria - Portuguese (Brazil)')



    voices.forEach(({ name, lang }) => {
        const option = document.createElement('option')

        option.value = name

        if (googleVoice && option.value === googleVoice.name) {
            utterance.voice = googleVoice
            option.selected = true
        } else if (microsoftVoice && option.value === microsoftVoice.name) {
            utterance.voice = microsoftVoice
            option.selected = true
        }

        option.textContent = `${lang} | ${name}`
        selectElement.appendChild(option)
    })
})

buttonInsertText.addEventListener('click', () => {
    divTextBox.classList.add('show')
})

closeDivTextBox.addEventListener('click', () => {
    divTextBox.classList.remove('show')
})

selectElement.addEventListener('change', setVoice)

buttonReadText.addEventListener('click', () => {
    setTextMessage(textArea.value)
    speakText()
})