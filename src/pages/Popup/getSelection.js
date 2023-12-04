var selection = window.getSelection();
// Only works with a single range 
var range = selection.getRangeAt(0);
var container = range.commonAncestorContainer;

var payload = {
    'text': selection.toString(),
    'html': container.innerHTML
};

chrome.extension.sendRequest(payload); 