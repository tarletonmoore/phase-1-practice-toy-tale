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
  cardImages()
});

function cardImages() {
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(data => data.forEach(card => renderToys(card)))
}
function renderToys(toys) {
  console.log(toys)
  let collection = document.getElementById(`toy-collection`)
  let h2 = document.createElement("h2")
  // toyName = document.getElementsByClassName(`input-text`)
  let img = document.createElement("img")
  img.src = toys.image
  img.class = "toy-avatar"

  h2.innerText = toys.name

  let p = document.createElement("p")
  p.innerText = toys.likes


  let button = document.createElement("button")
  button.class = "like-btn"
  button.id = "[toy_id]"
  button.innerText = "Like ❤️"

  button.addEventListener(`click`, () => {
    toys.likes += 1
    p.innerText = toys.likes
  })

  // collection.append(h2)
  let toyDiv = document.createElement("div")
  toyDiv.class = "card"
  toyDiv.append(h2, img, p, button)
  collection.append(toyDiv)
}


