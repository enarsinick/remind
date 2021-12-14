const createButton = document.querySelector("#create-note");
const createModel = document.querySelector(".create-model");
const exitCreateButton = document.querySelector("#exit-create-window")
const createModelButton = document.querySelector("#create");
const createTitleField = document.querySelector('#title-field');
const createDescField = document.querySelector('#description-field');
const viewModel = document.querySelector('.model');
const viewModelTitle = document.querySelector('.model-title');
const viewModelDesc = document.querySelector('.model-wrapper-window-description');
const viewModelDate = document.querySelector('#model-date');
const exitViewButton = document.querySelector('#exit-view-model');
const editButton = document.querySelector('#edit');
const editModel = document.querySelector('#edit-model');
const exitEditButton = document.querySelector("#exit-edit-window");
const editSubmitButton = document.querySelector('#edit-note-submit');
const editTitleField = document.querySelector("#edit-title-field");
const editDescField = document.querySelector("#edit-description-field");
const deleteButton = document.querySelector("#delete");
const colours = document.querySelectorAll(".colour-button");
const gridContainer = document.querySelector(".grid-container");


export {
    createButton,
    createTitleField,
    createDescField,
    createModel,
    exitCreateButton,
    createModelButton,
    viewModel,
    exitViewButton,
    editButton,
    editModel,
    exitEditButton,
    editSubmitButton,
    deleteButton,
    colours,
    gridContainer,
    viewModelTitle,
    viewModelDesc,
    viewModelDate, 
    editTitleField, 
    editDescField
}