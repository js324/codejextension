import React, { useState } from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';


const dict = {

}



const Entry = (props) => {
  return (
    <div>
      <h1 className="Word">{props.word}</h1>
      <h2 className="Definition">ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</h2>
    </div>
  )
}



const Popup = () => { //state hook

  function pasteSelection() {
    chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
      function (tab) {
        chrome.tabs.sendMessage(tab[0].id, { method: "getSelection" },
          function (response) {
            var text = document.getElementById('text');
            newEntry(response.data);
            console.log(entry);
            console.log(response.data);
          });
      });
  }

  const [entry, newEntry] = useState("");
  pasteSelection();

  return (
    <div className="App">
      <header className="App-header">
        {/* <h2>highl<span style={{ color: "#E63946" }}>A</span><span style={{ color: "#1D3557" }}>I</span>ter</h2> */}
        <h2>highl<span style={{ color: "#f7b32b" }}>A</span><span style={{ color: "#f7b32b" }}>I</span>ter</h2>
      </header>
      <body className="App-body">

        <Entry word={entry} />
      </body>
    </div>
  );
};

export default Popup;
