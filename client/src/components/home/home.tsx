import useStyles from "./style";
import { Button, Input, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { TextChangeHandler } from "quill";
import { useHistory } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { DataContext } from "../../utils/context";

const { Text } = Typography;

const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const { state, dispatch } = useContext(DataContext);
  const [roomId, setRoomId] = useState<string>("");
  const [joinLoading, setJoinLoading] = useState<boolean>(false);

  const { socket, quill, error } = state;

  const join = () => {
    socket?.emit("joining-room", roomId);
    setJoinLoading(true);
  };

  const create = () => {
    socket?.emit("creating-room", uuidV4());
  };

  useEffect(() => {
    if (!socket) return;

    const handler: TextChangeHandler = (document) => {
      quill?.setContents(document);
      quill?.enable();
      setJoinLoading(false);
      history.push(`/documents/${roomId}`);
    };

    socket.once("join-document", handler);

    return () => {
      socket.off("join-document", handler);
    };
  }, [socket, quill, roomId]);

  useEffect(() => {
    if (!socket) return;

    socket.once("create-document", ({ data, _id }) => {
      quill?.setContents(data);
      quill?.enable();
      history.push(`/documents/${_id}`);
    });
  }, [socket, quill, roomId]);

  useEffect(() => {
    if (!socket) return;

    const errorHandler = (message: string) => {
      setJoinLoading(false);
      dispatch({
        type: "ERROR",
        payload: message,
      });
    };

    socket.once("error", errorHandler);

    return () => {
      socket.off("error", errorHandler);
    };
  }, [socket, dispatch]);

  return (
    <div className={classes.container}>
      <Input
        type="text"
        placeholder="Enter Document ID"
        className={classes.input}
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <Button
        type="primary"
        className={classes.join}
        onClick={join}
        loading={joinLoading}
      >
        Join
      </Button>
      {error.length > 0 && (
        <Text type="danger" className={classes.error}>
          {error}
        </Text>
      )}
      <Button type="link" className={classes.create} onClick={create}>
        Create Room
      </Button>
    </div>
  );
};

export default Home;
