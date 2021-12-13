"use strict"

const cardColours = ["colour-orange",
                     "colour-peach",
                     "colour-lime",
                     "colour-blue",
                     "colour-purple",
                     "colour-pink", 
                     "colour-grey"];


/////////////////////////////////////////////////////////////////////
// API Requests
/////////////////////////////////////////////////////////////////////

// Get all notes from database
axios.get("http://localhost:8080/getAll")
     .then(response => {
        const notes = response.data;
        const gridContainer = document.querySelector(".grid-container");

        notes.forEach(note => {
            // build card element
            const card = document.createElement("article");
            card.classList.add("card", "grid-item");
            card.setAttribute("id", "card");
            card.style.backgroundColor = note.colour;
            card.setAttribute("data-id", note.id);

            // Add event listener to open view note window
            card.addEventListener('click', function(e) {
                if (e.target.classList.contains("card")) {
                    viewModel.firstElementChild.firstElementChild.style.backgroundColor = note.colour;
                    viewModel.style.display = "block";
                }
            })

            // Card header
            const h3 = document.createElement("h3");
            h3.innerText = note.title;

            // card info and button section
            const cardInfoCont = document.createElement("div");
            cardInfoCont.classList.add("card-info-container");
            const date = document.createElement("p");
            date.classList.add("card-date");
            date.innerText = note.date;

            const cardButtonCont = document.createElement("div");
            cardButtonCont.classList.add("card-options-container");
            const icon = document.createElement("img");
            icon.src = "./src/edit1.svg";

            // When edit icon is clicked on card, open the edit window for that card
            cardButtonCont.addEventListener('click', function(e) {
                createModel.style.display = "block";
            });

            // Add elements to card
            cardButtonCont.appendChild(icon);
            cardInfoCont.appendChild(date);
            cardInfoCont.appendChild(cardButtonCont);
            card.appendChild(h3);
            card.appendChild(cardInfoCont);

            gridContainer.appendChild(card);
        })
        
     })
     .catch(err => console.log(err));

/////////////////////////////////////////////////////////////////////
// Element Selectors
/////////////////////////////////////////////////////////////////////

const createButton = document.querySelector("#create-note");
const createModel = document.querySelector(".create-model");
const exitCreateButton = document.querySelector("#exit-create-window")

const viewModel = document.querySelector('.model');
const exitViewButton = document.querySelector('#exit-view-model');

const editButton = document.querySelector('#edit');



/////////////////////////////////////////////////////////////////////
// Event Listeners
/////////////////////////////////////////////////////////////////////


// Open create model window
createButton.addEventListener('click', function() {
    createModel.style.display = "block";
});

// Closes create/edit model window with exit icon
exitCreateButton.addEventListener('click', function() {
    createModel.style.display = "none";
});

// Closes create model if black overlay is clicked
createModel.addEventListener('click', function(e) {
    if (e.target.className === "create-model-wrapper") {
        createModel.style.display = "none";
    } 
});

// Closes view window when clicking exit icon
exitViewButton.addEventListener('click', function() {
    viewModel.style.display = "none";
});

// Closes view model if black overlay is clicked
viewModel.addEventListener('click', function(e) {
    if (e.target.className === "model-wrapper") {
        viewModel.style.display = "none";
    } 
});

// When edit button is clicked, open create/edit window and close view window
editButton.addEventListener('click', function() {
    viewModel.style.display = "none";
    createModel.style.display = "block";
}); 



