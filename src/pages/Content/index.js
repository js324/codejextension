// Add bubble to the top of the page.


console.log("TESTING!");
var parent = document.createElement('div');
var bubbleDOM = document.createElement('div');
var title = document.createElement('div');
var body = document.createElement('div');
var footer = document.createElement('div');
var downArrow = document.createElement('div');
footer.setAttribute('class', 'footer');
title.setAttribute('class', 'title');

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
            var selection = window.getSelection().toString();
            if (selection.length > 0) {
                oRange = window.getSelection().getRangeAt(0); //get the text range
                oRect = oRange.getBoundingClientRect();
                // console.log(oRect.x, oRect.y);
                // console.log(e.clientX, e.clientY);
                // console.log(window.visualViewport.pageTop);

                renderBubble(oRect.x + oRect.width / 2, oRect.y + window.scrollY - 20, selection, request.url);
            }
        }
        return true;

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
async function renderBubble(mouseX, mouseY, selection, url) {
    title.innerHTML = selection
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');;
    const site = url
    const input = title.innerHTML
    console.log(`http://localhost:3004/?site=${site}&input=${input}`);
    const resp = await fetch(`http://localhost:3004/?site=${site}&input=${input}`)
    const respP = await resp.json();
    console.log(respP)
    body.innerText = respP.definition
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