const levelImages = [
  ['💖', '😍', '😊', '😜'], // Level 1
  ['🙌', '🎂', '💋', '🐱‍👤', '🎁', '🌹'], // Level 2
  ['🍕', '🍔', '🍗', '🍰', '🍩', '🍫', '🍪', '🍾'], // Level 3
  ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑'], // Level 4
  ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'], // Level 5
  ['🍎', '🍋', '🍐', '🍊', '🍇', '🍓', '🍒', '🍌'] // Level 6
];

let currentLevel = 0;
let openCards = [];
let matchedCards = [];
let cards = [];

function startGame() {
  const images = levelImages[currentLevel];
  const duplicatedImages = images.concat(images);
  const shuffledImages = shuffleArray(duplicatedImages);

  createCards(shuffledImages);
  showCardsForSeconds(3);
  showLevelText();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCards(images) {
  const board = document.querySelector('.board');
  board.innerHTML = ''; // Clear the board before creating new cards
  cards = [];
  matchedCards = [];

  for (let p = 0; p < images.length; p++) {
    let box = document.createElement("div");
    box.className = 'card';
    box.innerHTML = images[p];

    box.onclick = function() {
      handleCardClick(this);
    };

    board.appendChild(box);
    cards.push(box);
  }
}

function showCardsForSeconds(seconds) {
  cards.forEach(function(card) {
    card.classList.add('boxOpen');
  });

  setTimeout(function() {
    cards.forEach(function(card) {
      card.classList.remove('boxOpen');
    });
  }, seconds * 1000);
}

function showLevelText() {
  const levelText = document.createElement('div');
  levelText.className = 'level-text';
  levelText.textContent = `Level ${currentLevel + 1}`;
  document.body.appendChild(levelText);

  levelText.style.opacity = 0;
  setTimeout(() => {
    levelText.style.transition = 'opacity 1s';
    levelText.style.opacity = 1;
  }, 100);

  setTimeout(() => {
    levelText.style.transition = 'opacity 1s';
    levelText.style.opacity = 0;
  }, 2000);

  setTimeout(() => {
    document.body.removeChild(levelText);
  }, 3000);
}

function handleCardClick(card) {
  if (!card.classList.contains('boxOpen') && !card.classList.contains('matched')) {
    card.classList.add('boxOpen');
    openCards.push(card);

    if (openCards.length === 2) {
      if (openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add('matched');
        openCards[1].classList.add('matched');
        matchedCards.push(openCards[0], openCards[1]);
        openCards = [];
      } else {
        setTimeout(() => {
          openCards[0].classList.remove('boxOpen');
          openCards[1].classList.remove('boxOpen');
          openCards = [];
        }, 500);
      }
    }

    if (matchedCards.length === cards.length) {
      currentLevel++;
      if (currentLevel < levelImages.length) {
        alert(`Congratulations! You've completed Level ${currentLevel}. Get ready for Level ${currentLevel + 1}!`);
        startGame();
      } else {
        alert("Congratulations! You've completed all levels!");
      }
    }
  }
}

window.onload = function() {
  startGame();
};