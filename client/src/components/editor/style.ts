import { createUseStyles } from "react-jss";

export default createUseStyles({
  container: {
    "& .ql-editor": {
      width: "8.5in",
      minHeight: "11in",
      padding: "1in",
      margin: "1rem",
      boxShadow: "0 0 10px 0 rgba(0,0,0,.16)",
      borderRadius: 8,
      backgroundColor: "#fff",
    },
    "& .ql-container.ql-snow": {
      border: "none",
      display: "flex",
      justifyContent: "center",
    },

    "& .ql-toolbar.ql-snow": {
      display: "flex",
      justifyContent: "center",
      position: "sticky",
      top: 0,
      zIndex: 1,
      backgroundColor: "#f3f3f3",
      border: "none",
      boxShadow: "0 0 5px 0 rgba(0,0,0,.2)",
    },
  },
  "@media print": {
    body: {
      background: "none",
    },
    container: {
      "& .ql-editor": {
        width: "8.5in",
        minHeight: "9in",
        padding: "2rem",
        margin: 0,
        boxShadow: "none",
        alignSelf: "flex-start",
      },
      "& .ql-toolbar.ql-snow": {
        display: "none",
      },
    },
  },
  loading: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    zIndex: 99,
  },
  spinner: {
    fontSize: 50,
    color: "#222",
  },
});
