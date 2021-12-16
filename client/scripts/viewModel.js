import { viewModelTitle as title, viewModelDate as date, viewModelDesc as description, editButton } from './elementSelectors.js'

export default function insertIntoViewModel(response) {
    const note = response.data;
    title.innerText = note.title;
    date.innerText = note.date;
    description.innerText = note.description;
    editButton.setAttribute("data-id", note.id);
}