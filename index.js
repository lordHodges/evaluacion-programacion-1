const express = require("express");
const morgan = require("morgan");
//const cors = require("cors");
const bodyParser = require("body-parser");

//init
const app = express();

//set
app.set("port", process.envPORT || 3030);
/* var corsConfig = { origin: "*" }; */

//uses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
//app.use(cors(corsConfig));

//middlewares

//rutas
require("./problemas/routes")(app);

//start aplication
app.listen(app.get("port"), () => {
	console.log("Server is on port", app.get("port"));
});
