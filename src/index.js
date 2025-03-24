
document.addEventListener('DOMContentLoaded', () => {
  const characterBar = document.getElementById('character-bar');
  const detailedInfo = document.getElementById('detailed-info');
  const voteForm = document.getElementById('votes-form');
  const resetButton = document.getElementById('reset-btn');
  const characterForm = document.getElementById('character-form');

  // Fetch characters and display in character bar
  fetch('http://localhost:3000/characters')
    .then(response => response.json())
    .then(characters => {
      characters.forEach(character => {
        const span = document.createElement('span');
        span.textContent = character.name;
        span.addEventListener('click', () => displayCharacterDetails(character));
        characterBar.appendChild(span);
      });
    });

  // Display character details
  function displayCharacterDetails(character) {
    detailedInfo.querySelector('#name').textContent = character.name;
    detailedInfo.querySelector('#image').src = character.image;
    detailedInfo.querySelector('#vote-count').textContent = character.votes;
    voteForm.dataset.characterId = character.id;
  }

  // Handle vote form submission
  voteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const votesInput = document.getElementById('votes');
    const votesToAdd = parseInt(votesInput.value);
    const characterId = voteForm.dataset.characterId;
    const voteCountElement = detailedInfo.querySelector('#vote-count');
    const currentVotes = parseInt(voteCountElement.textContent);
    const newVotes = currentVotes + votesToAdd;
    voteCountElement.textContent = newVotes;
    votesInput.value = '';
  });

  // Handle reset votes button click
  resetButton.addEventListener('click', () => {
    const voteCountElement = detailedInfo.querySelector('#vote-count');
    voteCountElement.textContent = 0;
  });

  // Handle new character form submission
  characterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameInput = document.getElementById('name');
    const imageUrlInput = document.getElementById('image-url');
    const newCharacter = {
      name: nameInput.value,
      image: imageUrlInput.value,
      votes: 0
    };

    fetch('http://localhost:3000/characters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCharacter)
    })
      .then(response => response.json())
      .then(character => {
        const span = document.createElement('span');
        span.textContent = character.name;
        span.addEventListener('click', () => displayCharacterDetails(character));
        characterBar.appendChild(span);
        displayCharacterDetails(character);
      });

    nameInput.value = '';
    imageUrlInput.value = '';
  });
});