const app = require("./app");
const port = process.env.PORT || 8000;

const db = require("./db/db");

app.get("/", (req, res) => {
  res.send("Welcome to the backend of the FitSync app");
});

app.get("/about", (req, res) => {
  res.send("This is the backend of the FitSync app");
});

app.listen(port, () => {
  console.log(`Server is running`);
});
