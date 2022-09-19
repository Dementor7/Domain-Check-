const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const port = 3000;
const route = require("./Router/Route");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", route);


app.listen(port, () => {
  console.log(`server start at port ${port}`);
});
