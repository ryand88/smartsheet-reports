const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const auth = require("./api/auth");
const user = require("./api/user");
const sheets = require("./api/sheets");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/sheets", sheets);

// Set static folder
// app.use(express.static("client/build"));

// app.get("/*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
