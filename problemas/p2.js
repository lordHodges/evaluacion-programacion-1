/**
 * Problema número 2.
 *
 * Genera un script/algoritmo/función que sea capaz de transformar los datos de input-p2.csv
 * en un arból de estructura similar al problema de p1 utilizando la estructura de Nodo.js
 */
//Agregar a raiz toda la estructura solicitada.
//...
const Nodo = require("./src/Nodo");
const raiz = new Nodo("root", "Raíz");

//
const file = "./problemas/src/input-p2.csv";
const fs = require("fs"); // utilizo esta libreria de nodejs para leer el archivo;
const csv = fs.readFileSync(file, "utf8", (error, datos) => {
	if (error) throw error;
	return datos;
}); //requiero el archivo retornando su contenido a la constante cvs;

const csvToJson = require("../problemas/helpers/csvToJson");
/**
 * extraje esta funcion pues es altamente reutilizable,
 *  ademas distrae de la tarea primordial que es construir el objeto
 *  con la estructura definida
 *
 * **/

exports.csvToJson = (req, res) => {
	const file = csvToJson(csv);
	// requiro el documento ya convertido con la funcion csvToJson;

	const nodos = file.filter((line) => {
		return line.Sede != "";
	});

	// agregando 1era capa "SEDES"
	nodos.forEach((obj) => {
		//construyendo el nodo con los atributos buscados;
		const nodo = new Nodo();
		nodo.nombre = obj.Sede;
		nodo.tipo = "Sede";

		let count = 0;
		raiz.hijos.forEach((sede) => {
			if (sede.nombre == nodo.nombre) {
				count++;
			}
		});
		if (count == 0) {
			raiz.hijos.push(nodo);
		} //verifico que no se repitan los nodos
	});

	// agregando segunda capa "Cursos"
	// basicamente es igual a la funcion anterior
	// añade una capa de anidamiento
	nodos.forEach((obj) => {
		const nodo = new Nodo();
		nodo.nombre = obj.Curso;
		nodo.tipo = "Curso";
		raiz.hijos.forEach((sede) => {
			let count = 0;
			sede.hijos.forEach((curso) => {
				if (curso.nombre == nodo.nombre) {
					count++;
				}
			});
			if (
				count == 0 &&
				nodo.nombre != "undefined" &&
				obj.Sede === sede.nombre
				//añade verificaciones para dirigir los push con los padres correspondientes
			) {
				sede.hijos.push(nodo);
			}
		});
	});
	// agregando tercera capa "secciones"
	// creo que con un poco mas de trabajo se podria refactorizar un poco esta operacion;

	nodos.forEach((obj) => {
		const nodo = new Nodo();
		nodo.nombre = obj.Seccion;
		nodo.tipo = "Seccion";

		raiz.hijos.forEach((sede) => {
			sede.hijos.forEach((curso) => {
				let count = 0;
				curso.hijos.forEach((seccion) => {
					if (seccion.nombre == nodo.nombre) {
						count++;
					}
				});
				if (
					count == 0 &&
					obj.Sede === sede.nombre &&
					obj.Curso === curso.nombre
				) {
					curso.hijos.push(nodo);
				}
			});
		});
	});

	// agregando cuarta capa "ofertas"

	nodos.forEach((obj) => {
		const nodo = new Nodo();
		nodo.nombre = obj.Oferta;
		nodo.tipo = "Oferta";
		raiz.hijos.forEach((sede) => {
			sede.hijos.forEach((curso) => {
				let count = 0;
				curso.hijos.forEach((seccion) => {
					seccion.hijos.forEach((oferta) => {
						if (oferta.nombre == nodo.nombre) {
							count++;
						}
					});
					if (
						count == 0 &&
						obj.Sede === sede.nombre &&
						obj.Curso === curso.nombre &&
						obj.Seccion === seccion.nombre
					) {
						seccion.hijos.push(nodo);
					}
				});
			});
		});
	});
	return res.status(200).send(raiz);
};
