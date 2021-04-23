import { createUseStyles } from "react-jss";

export default createUseStyles({
  container: {
    width: "100%",
    height: "100vh",
    background: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  input: {
    width: 500,
    maxWidth: "90%",
    height: 40,
    outline: "none",
  },
  join: {
    width: 500,
    maxWidth: "90%",
    height: 40,
    outline: "none",
    border: "none",
    margin: [30, 0, 10],
    fontSize: 18,
  },
  create: {
    textTransform: "capitalize",
  },
  error: {
    height: 40,
    fontSize: 14,
  },
});
