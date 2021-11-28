const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "..", "dist")));

app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

// var corsOptions = {
// 	origin: "https://ya-praktikum.tech",
// 	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// app.get(
// 	"https://ya-praktikum.tech",
// 	cors(corsOptions),
// 	function (req, res, next) {
// 		res.json({ msg: "This is CORS-enabled for only example.com." });
// 	}
// );

app.listen(PORT);
