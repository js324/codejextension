import React from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';

const Popup = () => {
  function pasteSelection() {
    chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
      function (tab) {
        chrome.tabs.sendMessage(tab[0].id, { method: "getSelection" },
          function (response) {
            var text = document.getElementById('text');
            text.innerHTML = response.data;
          });
      });
  }
  pasteSelection();

  return (
    <div className="App">
      <header className="App-header">
        <h2>highl<span style={{ color: "#E63946" }}>A</span><span style={{ color: "#1D3557" }}>I</span>ter</h2>
      </header>
      <body className="App-body">
        <h1 id="text">Oscar
          ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</h1>
      </body>
    </div>
  );
};

export default Popup;

{/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/pages/Popup/Popup.jsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!

        </a> */}