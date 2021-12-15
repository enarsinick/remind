import buildElement from './createElement.js';
import insertIntoEditModel from './editModel.js';
import { 
    gridContainer, 
    viewModel,
    editModel } 
    from './elementSelectors.js';
import insertIntoViewModel from './viewModel.js';

// Get all notes from database and display on page
export default () => {
    axios.get("http://localhost:8080/getAll")
     .then(response => {
        const notes = response.data;
        
        // Empty page before refreshing contents
        gridContainer.innerHTML = "";
        
        // Loop over each note and create card for homepage
        notes.forEach(note => {
            // build card element
            const card = buildElement("article", note.colour, null, {
                "id": "card",
                "data-id": note.id, 
                "class": ["card", "grid-item"]
            });

            // Add event listener to open view note window
            card.addEventListener('click', function(e) {
                if (e.target.classList.contains("card")) {
                    viewModel.firstElementChild.firstElementChild.style.backgroundColor = note.colour;
                    viewModel.style.display = "block";
                    const id = e.target.getAttribute("data-id");
                    
                    // Build View Model Window
                    axios.get(`http://localhost:8080/get/${id}`)
                         .then(response => insertIntoViewModel(response))
                         .catch(err => console.log(err));
                }
            })

            // Build all inner elements of card
            const h3 = buildElement("h3", null, note.title, null);
            const cardInfoCont = buildElement("div", null, null, {"class": ["card-info-container"]});
            const date = buildElement("p", null, note.date, {"class": ["card-date"]});
            const cardButtonCont = buildElement("div", null, null, {"data-id": note.id, "class": ["card-options-container"]});
            const icon = buildElement("img", null, null, null);
            icon.src = "./src/edit1.svg";

            // When edit icon is clicked on card, open the edit window for that card
            cardButtonCont.addEventListener('click', function(e) {
                document.querySelector(".edit-form-error").style.display = "none";
                editModel.style.display = "block";
                const id = e.target.getAttribute("data-id");

                // // Get note info and add to edit model
                axios.get(`http://localhost:8080/get/${id}`)
                    .then(response => insertIntoEditModel(response))
                    .catch(err => console.log(err));
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