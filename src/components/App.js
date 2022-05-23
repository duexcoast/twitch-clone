import React from "react";
import {
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import StreamList from "./streams/StreamList";
import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamShow from "./streams/StreamShow";
import StreamDelete from "./streams/StreamDelete";
import Header from "./Header";
import { history } from "../history";

const App = () => {
  return (
    <div className="ui container">
      <HistoryRouter history={history}>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<StreamList />} />
            <Route path="streams">
              <Route path="new" element={<StreamCreate />} />
              <Route path="edit" element={<StreamEdit />} />
              <Route path="delete" element={<StreamDelete />} />
              <Route path="show" element={<StreamShow />} />
            </Route>
          </Routes>
        </div>
      </HistoryRouter>
    </div>
  );
};

export default App;
