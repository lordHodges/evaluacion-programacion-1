module.exports = (_data) => {
	const respuesta = [];
	const sedes = _data.hijos.filter((nodo) => {
		return nodo.tipo === "Sede";
	});

	sedes.forEach((sede) => {
		// mientras se recorren las sedes
		// se injectan en un array los 4 medios cons sus hijos
		const cursos = sede.hijos.filter((curso) => {
			return curso.nombre === "4 Medio";
		});

		cursos.forEach((curso) => {
			// mientras se recorren los cursos(4 Medios)
			// se filtran las secciones requeridas(A)
			const secciones = curso.hijos.filter((seccion) => {
				return seccion.nombre === "A";
			});
			secciones.forEach((seccion) => {
				// mientras se recorren las secciones(4 Medios)
				// se filtran las ofertas requeridas
				//( Tecnología  <=  tenia tilde :/ )
				seccion.hijos.forEach((oferta) => {
					if (oferta.nombre == "Tecnología") {
						console.log("pasa");
						respuesta.push({
							sede: sede.nombre,
							curso: curso.nombre,
							seccion: seccion.nombre,
							oferta: oferta.nombre,
						}); // la estructura de la funcion tiene la finalidad de mantener
						//la traza del nodo que buscamos y asi devolver mayor informacion
						// delo contrario habria simplificado mas la operacion;
					}
				});
			});
		});
	});
	return respuesta;
};
