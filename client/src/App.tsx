import "antd/dist/antd.css";
import "./global/style";
import { SocketProvider } from "./utils/context";
import Container from "./page/container";

function App() {
  return (
    <SocketProvider>
      <Container />
    </SocketProvider>
  );
}

export default App;
