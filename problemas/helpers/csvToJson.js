/* esta funcion se encarga de separar las lineas del docuemnto cvs
 por comas y saltos de linea y les da el formato de objs JSON, 
 
 */

module.exports = (csv) => {
	var lines = csv.split("\n");

	var result = [];

	var headers = lines[0].split(",");

	for (var i = 1; i < lines.length; i++) {
		var obj = {};
		var currentline = lines[i].split(",");

		for (var j = 0; j < headers.length; j++) {
			obj[headers[j]] = currentline[j];
		} //aqui construye el objeto de acuerdo a las cabeceras existentes en el documento cvs;

		result.push(obj);
	}

	return result;
};
