import React, { useState } from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';


const dict = {
  "Python": "A programming language named after a movie",
}


const Entry = (props) => {
  return (
    <div>
      <h1 className="Word">{props.word}</h1>
      <h2 className="Definition">{props.def}</h2>
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
            if (response.data in dict) {
              newDefinition(dict[response.data]);
            }
            console.log(entry);
            console.log(response.data);
          });
      });
  }

  const [entry, newEntry] = useState("");
  const [definition, newDefinition] = useState("");

  pasteSelection();

  return (
    <div className="App">
      <header className="App-header">
        {/* <h2>highl<span style={{ color: "#E63946" }}>A</span><span style={{ color: "#1D3557" }}>I</span>ter</h2> */}
        <h2>highl<span style={{ color: "#f7b32b" }}>A</span><span style={{ color: "#f7b32b" }}>I</span>ter</h2>
      </header>
      <body className="App-body">
        <Entry word={entry} def={definition} />
      </body>
    </div>
  );
};

export default Popup;
