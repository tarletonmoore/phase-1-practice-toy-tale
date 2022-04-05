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
  fetchToys()
  let form = document.querySelector(".add-toy-form")
  form.addEventListener("submit", handleSubmit)
});
function handleSubmit(event) {
  event.preventDefault()
  console.log(event.target[1].value)
  const userNameInput = event.target[0].value
  const userImageInput = event.target[1].value

  let userObj = {
    name: userNameInput,
    image: userImageInput,
    likes: 0
  }
  const configureObj = {
    method: "POST",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify(userObj)

  }
  fetch("http://localhost:3000/toys", configureObj)

}






function fetchToys() {
  fetch("http://localhost:3000/toys")

    .then(response => response.json())
    .then(data => data.forEach(toy => renderToys(toy)))
}



function renderToys(toy) {
  console.log(toy)
  let collection = document.getElementById(`toy-collection`)
  let h2 = document.createElement("h2")
  // toyName = document.getElementsByClassName(`input-text`)
  let img = document.createElement("img")
  img.src = toy.image
  img.class = "toy-avatar"

  h2.innerText = toy.name

  let p = document.createElement("p")
  p.innerText = toy.likes


  let button = document.createElement("button")
  button.class = "like-btn"
  button.id = "[toy_id]"
  button.innerText = "Like ❤️"

  button.addEventListener(`click`, () => {
    toy.likes += 1
    p.innerText = toy.likes
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

      body: JSON.stringify({ "likes": toy.likes })
    })

  })

  // collection.append(h2)
  let toyDiv = document.createElement("div")
  toyDiv.class = "card"
  toyDiv.append(h2, img, p, button)
  collection.append(toyDiv)
}


