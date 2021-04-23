import { jss } from "react-jss";

export default jss
  .createStyleSheet({
    "@global": {
      [`* , *::before, *::after`]: {
        boxSizing: "border-box",
      },
      body: {
        margin: 0,
        padding: 0,
        backgroundColor: "#f3f3f3",
      },
    },
  })
  .attach();
