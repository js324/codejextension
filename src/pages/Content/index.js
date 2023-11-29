// Add bubble to the top of the page.
console.log("TESTING!");

var bubbleDOM = document.createElement('div');
bubbleDOM.setAttribute('class', 'selection_bubble');
// chrome.contextMenus.create({
//     title: "Search in UrbanDictionary",
//     contexts: ["selection"],  // ContextType
//     onclick: searchUrbanDict // A callback function
// });
document.body.appendChild(bubbleDOM);
// Lets listen to mouseup DOM events.
document.addEventListener('mouseup', function (e) {
    var selection = window.getSelection().toString();


    if (selection.length > 0) {
        oRange = window.getSelection().getRangeAt(0); //get the text range
        oRect = oRange.getBoundingClientRect();

        console.log(oRect.x, oRect.y);
        console.log(e.clientX, e.clientY);
        console.log(window.visualViewport.pageTop);

        renderBubble(oRect.x, oRect.y + window.scrollY - 10, selection);
    }

}, false);


// Close the bubble when we click on the screen.
document.addEventListener('mousedown', function (e) {
    console.log("testing!");
    bubbleDOM.style.visibility = 'hidden';
}, false);

// Move that bubble to the appropriate location.
function renderBubble(mouseX, mouseY, selection) {
    bubbleDOM.innerHTML = selection;
    console.log("rendering")

    bubbleDOM.style.top = mouseY - bubbleDOM.offsetHeight + 'px';
    bubbleDOM.style.left = mouseX + 'px';
    bubbleDOM.style.visibility = 'visible';
}