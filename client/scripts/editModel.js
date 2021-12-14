import { deleteButton, editTitleField, editDescField, colours, editSubmitButton } from "./elementSelectors.js";

export default function insertIntoEditModel(response) {
    const note = response.data;
    deleteButton.setAttribute("data-id", note.id);
    editTitleField.value = note.title;
    editDescField.value = note.description;
    colours.forEach(col => {
        if (col.getAttribute("data-value") === note.colour) {
            colours.forEach(element => element.classList.remove("selected"));
            col.classList.add("selected");
        }
    });
    editSubmitButton.setAttribute("data-id", note.id);
};