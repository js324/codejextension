// Add bubble to the top of the page.
console.log("TESTING!");
var parent = document.createElement('div');
var bubbleDOM = document.createElement('div');
var title = document.createElement('div');
var body = document.createElement('div');
var footer = document.createElement('div');
var downArrow = document.createElement('div');
parent.setAttribute('class', 'parent');
bubbleDOM.setAttribute('class', 'selection_bubble');
downArrow.setAttribute('class', 'down-arrow');
// chrome.contextMenus.create({
//     title: "Search in UrbanDictionary",
//     contexts: ["selection"],  // ContextType
//     onclick: searchUrbanDict // A callback function
// });
document.body.appendChild(parent);
parent.appendChild(bubbleDOM);
parent.appendChild(downArrow);
bubbleDOM.appendChild(title);
bubbleDOM.appendChild(body);
bubbleDOM.appendChild(footer);
// Lets listen to mouseup DOM events.
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        console.log(request)
        if (request.action === "define_word") {
            console.log('defining')
            var selection = window.getSelection().toString();
            if (selection.length > 0) {
                oRange = window.getSelection().getRangeAt(0); //get the text range
                oRect = oRange.getBoundingClientRect();

                // console.log(oRect.x, oRect.y);
                // console.log(e.clientX, e.clientY);
                // console.log(window.visualViewport.pageTop);

                renderBubble(oRect.x + oRect.width / 2, oRect.y + window.scrollY - 20, selection);
            }
        }

    }
);

// document.addEventListener('mouseup', function (e) {
//     var selection = window.getSelection().toString();
//     if (selection.length > 0) {
//         oRange = window.getSelection().getRangeAt(0); //get the text range
//         oRect = oRange.getBoundingClientRect();

//         // console.log(oRect.x, oRect.y);
//         // console.log(e.clientX, e.clientY);
//         // console.log(window.visualViewport.pageTop);

//         renderBubble(oRect.x + oRect.width / 2, oRect.y + window.scrollY - 20, selection);
//     }

// }, false);
document.addEventListener("scroll", (event) => { parent.style.visibility = 'hidden'; });

// Close the bubble when we click on the screen.
document.addEventListener('mousedown', function (e) {
    console.log("testing!");
    parent.style.visibility = 'hidden';
}, false);

// Move that bubble to the appropriate location.
function renderBubble(mouseX, mouseY, selection) {
    title.innerHTML = selection;
    body.innerText = "TESTING DEFINITION LOREM IPSUM DOLOR"
    footer.innerText = "MORE LINKS"
    console.log("rendering")

    parent.style.top = mouseY - bubbleDOM.offsetHeight + 'px';
    parent.style.left = mouseX - bubbleDOM.offsetWidth / 2 + 'px';
    parent.style.visibility = 'visible';
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.method == "getSelection")
        sendResponse({ data: window.getSelection().toString() });
    else
        sendResponse({}); // snub them.
});