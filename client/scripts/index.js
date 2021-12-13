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

// Get all notes from database and display on page
const displayAllNotes = () => {
    axios.get("http://localhost:8080/getAll")
     .then(response => {
        const notes = response.data;
        const gridContainer = document.querySelector(".grid-container");
        gridContainer.innerHTML = "";
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
                    const id = e.target.getAttribute("data-id");
                    
                    // Build View Model Window
                    axios.get(`http://localhost:8080/get/${id}`)
                         .then(response => {
                             const note = response.data;
                             document.querySelector('.model-title').innerText = note.title;
                             document.querySelector('#model-date').innerText = note.date;
                             document.querySelector('.model-wrapper-window-description').innerText = note.description;
                             document.querySelector('#edit').setAttribute("data-id", id);
                         })
                         .catch(err => console.log(err));
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
}


/////////////////////////////////////////////////////////////////////
// Element Selectors
/////////////////////////////////////////////////////////////////////

// Creating
const createButton = document.querySelector("#create-note");
const createModel = document.querySelector(".create-model");
const exitCreateButton = document.querySelector("#exit-create-window")
const createModelButton = document.querySelector("#create");

// Viewing
const viewModel = document.querySelector('.model');
const exitViewButton = document.querySelector('#exit-view-model');
const editButton = document.querySelector('#edit');

// Editing
const editModel = document.querySelector('#edit-model');
const exitEditButton = document.querySelector("#exit-edit-window");
const editSubmitButton = document.querySelector('#edit-note-submit');

// Others
const colours = document.querySelectorAll(".colour-button");



/////////////////////////////////////////////////////////////////////
// Event Listeners
/////////////////////////////////////////////////////////////////////


// Open create model window
createButton.addEventListener('click', function() {
    createModel.style.display = "block";
});

// Closes create model window with exit icon
exitCreateButton.addEventListener('click', function() {
    createModel.style.display = "none";
});

// Closes edit model window with exit icon
exitEditButton.addEventListener('click', function() {
    editModel.style.display = "none";
});

// Closes create model if black overlay is clicked
createModel.addEventListener('click', function(e) {
    if (e.target.className === "create-model-wrapper") {
        createModel.style.display = "none";
    } 
});

// Closes edit model if black overlay is clicked
editModel.addEventListener('click', function(e) {
    if (e.target.className === "create-model-wrapper") {
        editModel.style.display = "none";
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

// When edit button is clicked, open edit window and close view window
// Plus adds in note data to fields
editButton.addEventListener('click', function(e) {
    viewModel.style.display = "none";
    editModel.style.display = "block";
    const id = e.target.getAttribute("data-id");

    // Get note info and add to edit model
    axios.get(`http://localhost:8080/get/${id}`)
         .then(response => {
            const note = response.data;
            document.querySelector("#edit-title-field").value = note.title;
            document.querySelector("#edit-description-field").value = note.description;0
            colours.forEach(col => {
                if (col.getAttribute("data-value") === note.colour) {
                    colours.forEach(element => element.classList.remove("selected"));
                    col.classList.add("selected");
                }
            });
            editSubmitButton.setAttribute("data-id", id);
         })
         .catch(err => console.log(err));
}); 

// When the user clicks the submit button on the edit model
// The information is sent to the DB
editSubmitButton.addEventListener('click', function(e) {
    const id = e.target.getAttribute("data-id");

    // Get info from fields and build object
    let title = document.querySelector("#edit-title-field").value;
    let description = document.querySelector("#edit-description-field").value;
    const date = new Date();
    let chosenColour;

    colours.forEach(col => {
        if (col.classList.contains("selected")) {
            chosenColour = col.getAttribute("data-value");
        }
    })

    const data = {
        "title": title, 
        "description": description,
        "colour": chosenColour,
        "date": date.toLocaleDateString("en-GB", {year: "numeric", month: "long", day: "numeric"})
    }

    axios.put(`http://localhost:8080/update/${id}`, data)
         .then(response => console.log(response))
         .catch(err => console.log(err));
    
    location.reload();
}); 

// Allow users to select colour of card when creating new note
colours.forEach(col => {
    col.addEventListener('click', (e) => {
        colours.forEach(element => {
            element.classList.remove("selected");
        })
        e.target.classList.add("selected");
    });
})

// Package all form data and send to API when user clicks create button
createModelButton.addEventListener('click', () => {
    let title = document.querySelector("#title-field").value;
    let description = document.querySelector("#description-field").value;
    const date = new Date();
    let chosenColour;

    colours.forEach(col => {
        if (col.classList.contains("selected")) {
            chosenColour = col.getAttribute("data-value");
        }
    })

    const data = {
        "title": title, 
        "description": description,
        "colour": chosenColour,
        "date": date.toLocaleDateString("en-GB", {year: "numeric", month: "long", day: "numeric"})
    }

    axios.post("http://localhost:8080/create", data)
         .then(response => console.log(response))
         .catch(err => console.log(err));

    displayAllNotes();
    window.location.reload();
    // createModel.style.display = "none";

});




// call functions
displayAllNotes();