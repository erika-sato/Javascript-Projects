const secondsContainer = document.querySelector('#seconds')
const minutesContainer = document.querySelector('#minutes')
const hoursContainer = document.querySelector('#hours')
const daysContainer = document.querySelector('#days')
const nextYearContainer = document.querySelector('#year')
const spinnerLoading = document.querySelector('#loading')
const countdownContainer = document.querySelector('#countdown')


const nextYear = new Date().getFullYear() + 1
const newYearTime = new Date(`January 01 ${nextYear} 00:00:00`)

nextYearContainer.textContent = nextYear

const updateContdown = () => {
    const currentTime = new Date()
    const difference = newYearTime - currentTime
    const days = Math.floor(difference / 1000 / 60 / 60 / 24)                      //floor arredonda o número
    const hours = Math.floor(difference / 1000 / 60 / 60) % 24                    // o módulo (%) leva em consideração as horas de hoje que já se passaram
    const minutes = Math.floor(difference / 1000 / 60) % 60                      // o módulo (%) leva em consideração os minutos de hoje que já se passaram, retornando o valor dos minutos que faltam para a hora atual acabar
    const seconds = Math.floor(difference / 1000) % 60

    secondsContainer.textContent = seconds < 10 ? '0'+ seconds : seconds
    minutesContainer.textContent = minutes < 10 ? '0'+ minutes : minutes
    hoursContainer.textContent = hours < 10 ? '0'+ hours : hours
    daysContainer.textContent = days < 10 ? '0'+ days : days
}

setTimeout(() => {
    spinnerLoading.remove()
    countdownContainer.style.display = 'flex'
}, 1000)                                                                    // setTimeout: invoca uma fç no tempo em que especificarmos
setInterval(updateContdown, 1000)                                               //setInterval invoca uma fç repetidamente, e essa repetição acontece no intervalo de tempo que eu especificar em milissegundos
