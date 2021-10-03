let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys();
});

// Submit button event listener:
document.querySelector("form.add-toy-form").addEventListener("submit", handleSumbit);

// Submit button event handler function:
function handleSumbit(e) {
  e.preventDefault();
  let toyObject = {
    id:e.target.id,
    name:e.target.name.value,
    image:e.target.image.value,
    likes: 0
  }

  createCard(toyObject);
  postCard(toyObject);
}

// Fetch all toy objects:
function getToys() {
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(json => json.forEach(toy => createCard(toy)))
};

//Create a new card div for each toy object in json and append each div to the toy collection::
function createCard(toy) {
  let div =document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} Likes</p>
    <button class="like-btn" id="${toy.id}">Like</button>
  `
  // Add event listener to like button:
  div.querySelector('button.like-btn').addEventListener('click', () => {
    toy.likes++
    div.querySelector('p').textContent = toy.likes + ' Likes';
    updateLikes(toy);
  });

  // Append new div card to collection:
  document.querySelector('div#toy-collection').appendChild(div);
}

// POST a new toy to the toy collection:
function postCard(toy) {
  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toy)
  })
  .then(res => res.json())
  .then(toy => console.log(toy));
}

// PATCH a toy's likes in the collection:
function updateLikes(toy) {
  fetch(`http://localhost:3000/toys/${toy.id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toy)
  })
  .then(res => res.json())
  .then(toy => console.log(toy));
}

// DELETE a toy from the toy collection:
function deleteCard(toy) {
  fetch(`http://localhost:3000/toys/${toy.id}`,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toy)
  })
  .then(res => res.json())
  .then(toy => console.log(toy));
}