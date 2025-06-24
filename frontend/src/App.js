import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Chatpage from "./Pages/Chatpage";
import ChatProvider from "./Context/ChatProvider";

function App() {
  return (
    <div className="App">
      <ChatProvider>
        <Switch>
          <Route path="/" component={Homepage} exact />
          <Route path="/chats" component={Chatpage} />
        </Switch>
      </ChatProvider>
    </div>
  );
}

export default App;
