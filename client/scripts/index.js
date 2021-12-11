"use strict"

const cardColours = ["colour-orange",
                     "colour-peach",
                     "colour-lime",
                     "colour-blue",
                     "colour-purple",
                     "colour-pink", 
                     "colour-grey"];

/////////////////////////////////////////////////////////////////////
// Element Selectors
/////////////////////////////////////////////////////////////////////

const createButton = document.querySelector("#create-note");
const createModel = document.querySelector(".create-model");
const exitCreateButton = document.querySelector("#exit-create-window")

const card = document.querySelectorAll('.card'); 
const viewModel = document.querySelector('.model');
const exitViewButton = document.querySelector('#exit-view-model');
const cardEditButtons = document.querySelectorAll('.card-options-container');

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

// Opens view window when card clicked and adds correct colour to model window bg
card.forEach(element => {
    element.addEventListener('click', function(e) {
        if (e.target.classList.contains("card")) {
            viewModel.style.display = "block";
        }
        // cardColours.forEach(element => {
        //     if (e.target.classList.contains(element)) {
        //         viewModel.firstElementChild.firstElementChild.classList.add(element);
        //         viewModel.style.display = "block";
        //     }
        // });
    });
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

// When edit icon is clicked on card, open the edit window for that card
cardEditButtons.forEach(element => {
    element.addEventListener('click', function(e) {
        createModel.style.display = "block";
    });
});