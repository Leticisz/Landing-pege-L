const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

// mudar nome dos pesonagens 
const characters = [
    'Eleven',
    'Mike',
    'Will', 
    'Lucas',
    'Max',
    'Dustin',
    'Steve',
    'Jim hopper',
    'Erica',
    'Robin'
]

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element; 
}

let firtsCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');
    if (disabledCards.length === 20) {
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu Tempo foi: ${timer.innerHTML}`);
    }
}

const  checkCards = () => {
    const firtsCharacter = firtsCard.getAttribute('data-character');
    const secondCharacter = secondCard .getAttribute('data-character');

    if (firtsCharacter == secondCharacter){

        firtsCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firtsCard = '';
        secondCard = '';

        checkEndGame();
        
    } else {

        setTimeout(() => {
            firtsCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firtsCard = '';
            secondCard = '';
        }, 500);

      
    }
};

const revealCard = ({target}) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firtsCard == '') {
        target.parentNode.classList.add('reveal-card');
        firtsCard = target.parentNode;

    } else if (secondCard == '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();

    }

   
}

const creatCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../imagens/${character}.jpg')`;
    

   card.appendChild(front);
   card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character)

   return card;

}

const loadGame = () => {
    duplicateCharacter = [ ...characters, ...characters];

    const shuffleArray =  duplicateCharacter.sort(() => Math.random() - 0.5);

    shuffleArray.forEach((character) => {
        const card = creatCard(character);
        grid.appendChild(card);
    });
}

const startTimer = () => {
   this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
}


