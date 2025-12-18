// ========================================
// VIS-NETWORK - CONFIGURACIÓN SIN FÍSICA
// ========================================

// 1. CREAR LOS NODOS
var nodes = new vis.DataSet([
    {id: 1, label: 'Nodo 1', x: 0, y: 0, color: '#FF6B6B'},
    {id: 2, label: 'Nodo 2', x: 150, y: 0, color: '#4ECDC4'},
    {id: 3, label: 'Nodo 3', x: 300, y: 0, color: '#45B7D1'}
]);

// 2. CREAR LAS CONEXIONES (EDGES)
var edges = new vis.DataSet([
    {from: 1, to: 2, arrows: 'to'},
    {from: 2, to: 3, arrows: 'to'}
]);

// 3. OBTENER EL CONTENEDOR HTML
var container = document.getElementById('mynetwork');

// 4. PREPARAR LOS DATOS
var data = {
    nodes: nodes,
    edges: edges
};

// 5. OPCIONES DE CONFIGURACIÓN (SIN FÍSICA)
var options = {
    nodes: {
        shape: 'box',              // Forma: 'box', 'circle', 'ellipse', 'database', 'diamond', 'dot', 'star', 'triangle'
        size: 25,
        font: {
            size: 14,
            color: '#ffffff'
        },
        borderWidth: 2,
        shadow: true,
        fixed: false,              // false = se pueden arrastrar
        physics: false             // Desactivar física en nodos
    },
    edges: {
        width: 2,
        color: {
            color: '#848484',
            highlight: '#667eea',
            hover: '#667eea'
        },
        smooth: false,             // false = líneas rectas, true = líneas curvas
        arrows: {
            to: {
                enabled: true,
                scaleFactor: 1
            }
        },
        shadow: true
    },
    physics: {
        enabled: false             // CRÍTICO: Desactivar física completamente
    },
    interaction: {
        dragNodes: true,           // Permitir arrastrar nodos
        dragView: true,            // Permitir arrastrar el canvas
        zoomView: true,            // Permitir zoom
        hover: true,               // Activar efectos hover
        navigationButtons: true,   // Mostrar botones de navegación
        keyboard: true             // Permitir navegación con teclado
    }
};

// 6. INICIALIZAR LA RED
var network = new vis.Network(container, data, options);

// ========================================
// FUNCIONES ÚTILES
// ========================================

// Agregar un nodo
function agregarNodo(id, label, x, y, color) {
    nodes.add({
        id: id,
        label: label,
        x: x,
        y: y,
        color: color || '#4ECDC4'
    });
}

// Agregar una conexión
function agregarConexion(desde, hacia) {
    edges.add({
        from: desde,
        to: hacia,
        arrows: 'to'
    });
}

// Eliminar un nodo
function eliminarNodo(id) {
    nodes.remove(id);
}

// Eliminar una conexión
function eliminarConexion(desde, hacia) {
    var edgeId = edges.get({
        filter: function(item) {
            return item.from === desde && item.to === hacia;
        }
    })[0];
    if (edgeId) {
        edges.remove(edgeId.id);
    }
}

// Actualizar un nodo
function actualizarNodo(id, nuevosDatos) {
    nodes.update({
        id: id,
        ...nuevosDatos
    });
}

// Obtener información de un nodo
function obtenerNodo(id) {
    return nodes.get(id);
}

// Obtener todos los nodos
function obtenerTodosNodos() {
    return nodes.get();
}

// Ajustar la vista para ver toda la red
function ajustarVista() {
    network.fit({
        animation: {
            duration: 1000,
            easingFunction: 'easeInOutQuad'
        }
    });
}

// ========================================
// EVENTOS
// ========================================

// Evento: Click en un nodo
network.on("click", function(params) {
    if (params.nodes.length > 0) {
        var nodeId = params.nodes[0];
        var node = nodes.get(nodeId);
        console.log('Nodo clickeado:', node);
    }
});

// Evento: Doble click en un nodo
network.on("doubleClick", function(params) {
    if (params.nodes.length > 0) {
        var nodeId = params.nodes[0];
        console.log('Doble click en nodo:', nodeId);
    }
});

// Evento: Click derecho en un nodo
network.on("oncontext", function(params) {
    params.event.preventDefault();
    if (params.nodes.length > 0) {
        var nodeId = params.nodes[0];
        console.log('Click derecho en nodo:', nodeId);
    }
});

// Evento: Cuando se arrastra un nodo
network.on("dragging", function(params) {
    if (params.nodes.length > 0) {
        var nodeId = params.nodes[0];
        var positions = network.getPositions([nodeId]);
        console.log('Arrastrando nodo:', nodeId, 'a posición:', positions[nodeId]);
    }
});

// Evento: Cuando termina de arrastrar un nodo
network.on("dragEnd", function(params) {
    if (params.nodes.length > 0) {
        var nodeId = params.nodes[0];
        console.log('Terminó de arrastrar nodo:', nodeId);
    }
});

// ========================================
// EJEMPLO DE USO
// ========================================

// Agregar un nuevo nodo después de 2 segundos
// setTimeout(() => {
//     agregarNodo(4, 'Nodo 4', 450, 0, '#FFA07A');
//     agregarConexion(3, 4);
// }, 2000);

// Ajustar vista después de 3 segundos
// setTimeout(() => {
//     ajustarVista();
// }, 3000);