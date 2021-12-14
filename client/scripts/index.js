"use strict"

// IMPORTS
import displayAllNotes from "./displayAllNotes.js";
import showHide from "./showHideElement.js";
import { createButton, createModel, exitCreateButton, createModelButton,
        viewModel, exitViewButton, editButton, editModel, exitEditButton, 
        editSubmitButton, deleteButton, colours, editTitleField, editDescField, 
        createTitleField, createDescField } from "./elementSelectors.js";
import insertIntoEditModel from "./editModel.js";

/////////////////////////////////////////////////////////////////////
// Event Listeners
/////////////////////////////////////////////////////////////////////

// Open create model window
createButton.addEventListener('click', () => { showHide(createModel, "block") });

// Closes create model window with exit icon
exitCreateButton.addEventListener('click', function() { showHide(createModel, "none") });

// Closes edit model window with exit icon
exitEditButton.addEventListener('click', function() { showHide(editModel, "none") });

// Closes create model if black overlay is clicked
createModel.addEventListener('click', function(e) {
    e.target.className === "create-model-wrapper" ? showHide(createModel, "none") : null
});

// Closes edit model if black overlay is clicked
editModel.addEventListener('click', function(e) {
    e.target.className === "create-model-wrapper" ? showHide(editModel, "none") : null 
});

// Closes view window when clicking exit icon
exitViewButton.addEventListener('click', function() { showHide(viewModel, "none") });

// Closes view model if black overlay is clicked
viewModel.addEventListener('click', function(e) {
   e.target.className === "model-wrapper" ? showHide(viewModel, "none") : null 
});

// When edit button is clicked, open edit window and close view window
// Plus adds in note data to fields
editButton.addEventListener('click', function(e) {
    viewModel.style.display = "none";
    editModel.style.display = "block";
    const id = e.target.getAttribute("data-id");

    // Get note info and add to edit model
    axios.get(`http://localhost:8080/get/${id}`)
         .then(response => insertIntoEditModel(response))
         .catch(err => console.log(err));
}); 

// When the user clicks the submit button on the edit model
// The information is sent to the DB
editSubmitButton.addEventListener('click', function(e) {
    const id = e.target.getAttribute("data-id");
    let chosenColour;

    colours.forEach(col => {
        if (col.classList.contains("selected")) {
            chosenColour = col.getAttribute("data-value");
        }
    })

    const data = {
        "title": editTitleField.value, 
        "description": editDescField.value,
        "colour": chosenColour,
        "date": new Date().toLocaleDateString("en-GB", {year: "numeric", month: "long", day: "numeric"})
    }

    axios.put(`http://localhost:8080/update/${id}`, data)
         .then(response => console.log(response))
         .catch(err => console.log(err));
    
    location.reload();
}); 


// Delete a note from the DB
deleteButton.addEventListener('click', e => {
    const id = e.target.getAttribute("data-id");
    axios.delete(`http://localhost:8080/delete/${id}`)
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
    let chosenColour;
    colours.forEach(col => {
        if (col.classList.contains("selected")) {
            chosenColour = col.getAttribute("data-value");
        }
    })

    const data = {
        "title": createTitleField.value, 
        "description": createDescField.value,
        "colour": chosenColour,
        "date": new Date().toLocaleDateString("en-GB", {year: "numeric", month: "long", day: "numeric"})
    }

    axios.post("http://localhost:8080/create", data)
         .then(response => console.log(response))
         .catch(err => console.log(err));

    window.location.reload();
});

// display all notes to page
displayAllNotes();
