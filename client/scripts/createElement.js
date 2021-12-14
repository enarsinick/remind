export default function buildElement(type, colour, text, attributes) {
    var element = document.createElement(type);
    if (colour) element.style.backgroundColor = colour;
    if (text) element.innerText = text;
    for (let key in attributes) {
        if (key == "class") {
            element.classList.add.apply(element.classList, attributes[key]); // add all classes at once
        } else {
            element.setAttribute(key, attributes[key]);
        }
    }
    return element;
}