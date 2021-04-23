import { useContext, useEffect } from "react";
import { TextChangeHandler } from "quill";
import { useParams } from "react-router-dom";
import { DataContext } from "../../utils/context";
import { LoadingOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import useStyles from "./style";
import "quill/dist/quill.snow.css";

interface TextEditorProps {
  wrapperRef: (wrapper: HTMLDivElement) => void;
}

const TextEditor = ({ wrapperRef }: TextEditorProps) => {
  const history = useHistory();
  const { state, dispatch } = useContext(DataContext);
  const classes = useStyles();
  const { id: documentId } = useParams<{ id: string }>();

  const { socket, quill, loading } = state;

  useEffect(() => {
    if (!socket || !quill) return;

    const handler: TextChangeHandler = (delta, _, source) => {
      if (source !== "user") return;
      socket?.emit("send-changes", delta);
    };

    quill?.on("text-change", handler);

    return () => {
      quill?.off("text-change", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (!socket || !quill) return;

    const handler: TextChangeHandler = (delta) => {
      quill.updateContents(delta);
    };

    socket?.on("receive-changes", handler);

    return () => {
      socket?.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (!socket || !quill) return;

    const timer = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (!socket || !quill) return;

    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
      dispatch({
        type: "LOADING",
        payload: false,
      });
    });

    socket.emit("get-document", documentId);
  }, [socket, quill, documentId, dispatch]);

  useEffect(() => {
    if (!socket) return;

    const errorHandler = (message: string) => {
      history.replace("/");
      dispatch({
        type: "ERROR",
        payload: message,
      });
    };

    socket.once("initial-error", errorHandler);

    return () => {
      socket.off("initial-error", errorHandler);
    };
  }, [socket, dispatch]);

  return (
    <>
      {loading && (
        <div className={classes.loading}>
          <LoadingOutlined className={classes.spinner} />
        </div>
      )}
      <div className={classes.container} ref={wrapperRef}></div>
    </>
  );
};

export default TextEditor;
