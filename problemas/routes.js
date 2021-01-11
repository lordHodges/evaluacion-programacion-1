module.exports = (app) => {
	const p1 = require("./p1");
	const p2 = require("./p2");

	var router = require("express").Router();

	router.get("/obtenerNodosSinHijos", p1.obtener_nodos_sin_hijos);
	router.get("/obtenerNodosByParam/:cantidad", p1.obtenerNodosByParam);
	router.get("/obtenerSolicitud", p1.obtenerSolicitud);
	router.get("/obtenerTotalNodos", p1.obtenerTotalNodos);
	router.get("/csvToJson", p2.csvToJson);
	app.use("/api", router);
};
