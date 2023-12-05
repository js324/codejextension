console.log('This is the background page.');
console.log('Put the background scripts here.');
chrome.contextMenus.onClicked.addListener(genericOnClick);

// A generic onclick callback function.
function genericOnClick(info) {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "define_word", url: tabs[0].url }, function (response) { });
    });

}


chrome.runtime.onInstalled.addListener(function () {
    // Create one test item for each context type.
    let contexts = [
        'selection',
    ];
    for (let i = 0; i < contexts.length; i++) {
        let context = contexts[i];
        let title = "Test %s menu item";
        chrome.contextMenus.create({
            title: 'Define \"%s\" with Highlighter',
            contexts: ['selection'],
            id: 'selection',
        });
    }

    // Intentionally create an invalid item, to show off error checking in the
    // create callback.
    chrome.contextMenus.create(
        { title: 'Oops', parentId: 999, id: 'errorItem' },
        function () {
            if (chrome.runtime.lastError) {
                console.log('Got expected error: ' + chrome.runtime.lastError.message);
            }
        }
    );
});