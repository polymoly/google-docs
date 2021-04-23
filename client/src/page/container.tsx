import { useCallback, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { io } from "socket.io-client";
import Quill from "quill";

import { DataContext } from "../utils/context";
import TextEditor from "../components/editor/textEditor";
import Home from "../components/home/home";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

function Container() {
  const { dispatch } = useContext(DataContext);

  useEffect(() => {
    const socket = io("http://localhost:3001");
    dispatch?.({
      type: "INIT_SOCKET",
      payload: socket,
    });
    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  const wrapperRef = useCallback(
    (wrapper: HTMLDivElement) => {
      if (!wrapper) return;
      wrapper.innerHTML = "";
      const editor = document.createElement("div");
      wrapper.append(editor);
      const quill = new Quill(editor, {
        theme: "snow",
        modules: { toolbar: TOOLBAR_OPTIONS },
      });
      dispatch?.({
        type: "INIT_QUILL",
        payload: { quill: quill, loading: true },
      });
      quill.disable();
    },
    [dispatch]
  );

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/documents">
          <Redirect to="/" />
        </Route>
        <Route path="/documents/:id">
          <TextEditor wrapperRef={wrapperRef} />
        </Route>
      </Switch>
    </Router>
  );
}

export default Container;
