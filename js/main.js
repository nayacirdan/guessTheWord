const words = [{
    word: 'apple',
    definition: 'An ___ a day keeps the doctor away'
}, {
    word: 'semi-bold',
    definition: 'One of the of font-weight property values'
}, {
    word: 'raisin',
    definition: 'Dried grape'
},
    {
        word: 'run',
        definition: 'When you walk very quickly'
    }, {
        word: 'glasses',
        definition: 'You wear this to see better'
    }]

function getWords() {
    return words
}

const tryLetterButton = document.getElementById('try');
const lettersBlock = document.getElementById('letters')
const definitionBlock = document.getElementById('definition')
const counterBlock = document.getElementById('counter')
const startButton = document.getElementById('startButton');
const interactiveBlock = document.getElementById('interactive');
const counterContainer = document.getElementsByClassName('counter')[0]
const newGameButton = document.getElementById('newGame');


const chooseTheWord = () => {
    const words = getWords()
    const currentWord = words[Math.floor(Math.random() * words.length)]
    return currentWord
}

const showLetterBlocks = (currentWord) => {

    Array.from(currentWord).map((letter) => {
        const letterBlock = document.createElement('div');
        letterBlock.classList.add('letter');
        if (!/[A-Za-z]/.test(letter)) {
            letterBlock.innerText = letter;

        } else {
            letterBlock.innerText = '_';
        }

        lettersBlock.append(letterBlock)

    })

}
const showDefinition = (definition) => {
    definitionBlock.innerHTML = definition
}
const onKeyPress = (event) => {
    if (!/[A-Za-z]/.test(event.key) || event.target.value.length > 0) {
        event.preventDefault()
    }
}
const userLetter = document.getElementById('userLetter');
userLetter.addEventListener('keypress', onKeyPress)


let counter = 5
const setCounter = (value) => {
    counter = value
    counterBlock.innerHTML = `${counter.toString()}`
}
const checkLetter = (currentWord, letter) => {
    if (counter === 0) {
        alert(`You run out of tries. Start new game. The correct word was "${currentWord}"`)
        return
    }
    if (!currentWord.toUpperCase().includes(letter.toString().toUpperCase())) {
        alert('There is no such letter in the word')
        setCounter(counter -= 1)
        return
    }
    const letters = Array.from(lettersBlock.children)

    for (let i = 0; i < currentWord.length; i++) {
        if (currentWord.toUpperCase()[i] === letter.toUpperCase()) {
            letters[i].innerHTML = letter
        }
    }

    if (!letters.map(letter => letter.innerHTML).includes('_')) {
        alert('Congratulations! You won!')
        return
    }
}

const showHideGameElements = () => {
    lettersBlock.innerHTML = ''
    startButton.classList.add('hidden')
    interactiveBlock.classList.remove('hidden')
    counterContainer.classList.remove('hidden')
}

const startGame = () => {
    showHideGameElements()
    const currentWord = chooseTheWord()
    setCounter(currentWord.word.length - 2)
    showLetterBlocks(currentWord.word)
    showDefinition(currentWord.definition)

    tryLetterButton.addEventListener('click', () => checkLetter(currentWord.word, userLetter.value))

}

const prepareGame = () => {
    interactiveBlock.classList.add('hidden')
    counterContainer.classList.add('hidden')
    startButton.addEventListener('click', startGame)
    newGameButton.addEventListener('click', startGame)
}

document.addEventListener('DOMContentLoaded', prepareGame);

const removeListeners = ()=> {
    document.removeEventListener('DOMContentLoaded', prepareGame);
    tryLetterButton.removeEventListener('click', () => checkLetter('', userLetter.value))
    userLetter.removeEventListener('keypress', onKeyPress)
    startButton.removeEventListener('click', startGame)
    newGameButton.removeEventListener('click', startGame)
    return;
}
window.onbeforeunload(removeListeners)


