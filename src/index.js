import React from "react";
import ReactDOm from "react-dom";
import Header from "./components/common/Header";
import "./index.css";
import List from "./components/list/list";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFound from "./components/notFound/NotFound";
import Detail from "./components/detail/Detail";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path="/" component={List} exact />
          <Route path="/currency/:id" component={Detail} exact />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

ReactDOm.render(<App />, document.getElementById("root"));

export default App;
