module.exports = (nodo) => {
	const _data = nodo;
	const nodos = [];
	nodos.push(_data);
	var explorar = (_data) => {
		if (_data.hijos.length > 0) {
			_data.hijos.forEach((hijo) => {
				nodos.push(hijo);
				explorar(hijo);
			});
		}
	};
	explorar(_data);

	return nodos;
};
