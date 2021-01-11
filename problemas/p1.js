/**
 * Problema número 1.
 *
 * Necesitamos que obtengas los datos de ./src/input-p1.json y generes funciones que permitan:
 *
 * 1. Retornar todos los nodos que no tienen hijos.
 * 2. Retornar todos los nodos que contienen una cantidad X (parametrizable) de hijos
 * 3. Contabilizar la cantidad de nodos totales
 * 4. Retornar todas las Sedes con 4° Medio que *SI* poseen la *Oferta Tecnología* en sus *Secciones A*
 */

const data = require("./src/input-p1.json");

//tome la decicion de abstraer de este documento, pues distrae de la verdadeara tarea de resolver los filtros requeridos
// extrae de forma recursiva todos los nodos del documento JSON.
const _obtenerNodos = require("../problemas/helpers/obtenerNodos"); //
const _obtenerSolicitud = require("../problemas/helpers/obtenerSolicitud");
const _data = data;

// 1. Retornar todos los nodos que no tienen hijos.

exports.obtener_nodos_sin_hijos = async (req, res) => {
	const nodosSinhijos = [];
	const nodos = await _obtenerNodos(_data);

	nodos.forEach((nodo) => {
		if (!nodo.hijos.length > 0) {
			nodosSinhijos.push(nodo);
		}
	}); // tambien se podria haber resuelto con .filter
	return res
		.status(200)
		.send({ total_items: nodosSinhijos.length, nodosSinhijos });
};

// 2. Retornar todos los nodos que contienen una cantidad X (parametrizable) de hijos
//  recibe un valor de entrada y devuelve los nodos con la cantidad de hijos al valor señalado;

exports.obtenerNodosByParam = async (req, res) => {
	const { cantidad } = req.params;
	const nodos = await _obtenerNodos(_data);
	const nodosByparams = [];

	nodos.forEach((nodo) => {
		if (nodo.hijos.length == cantidad) {
			nodosByparams.push(nodo);
		}
	});
	return res
		.status(200)
		.send({ total_catched: nodosByparams.length, nodosByparams });
};

// 3. Contabilizar la cantidad de nodos totales
// la funcion _obtenerNodos() facilita las cosas
// consideré que la raiz del arbol deberia considerarce como nodo;
exports.obtenerTotalNodos = async (req, res) => {
	const nodos = await _obtenerNodos(_data);

	return res.status(200).send({ total_items: nodos.length });
};

// 4. Retornar todas las Sedes con 4° Medio que *SI* poseen la *Oferta Tecnología* en sus *Secciones A*
exports.obtenerSolicitud = (req, res) => {
	const _data = data;
	const respuesta = _obtenerSolicitud(_data);

	return res.status(200).send({
		sedes_encontradas: respuesta,
	});
};

/* obtenerSolicitud(); */
