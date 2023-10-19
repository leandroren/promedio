const listaDeAlumnos = JSON.parse(localStorage.getItem('alumnos')) || [];

function calcularPromedio(notas) {
    const totalNotas = notas.reduce((acc, nota) => acc + nota, 0);
    return totalNotas / notas.length;
}
function mostrarTablaAlumnos() {
    const tabla = document.getElementById("tabla-alumnos");
    tabla.innerHTML = 
    `<tr>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Promedio</th>
    </tr>`;
    listaDeAlumnos.forEach(alumno => {
        const row = tabla.insertRow(-1);
        row.insertCell(0).textContent = alumno.nombre;
        row.insertCell(1).textContent = alumno.apellido;
        row.insertCell(2).textContent = alumno.promedio.toFixed(2);
    });
}

function cargarDatosExternos() {
    fetch('alumnos.json') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los datos.');
            }
            return response.json();
        })
        .then(data => {
            data.forEach(alumno => {
                const promedio = calcularPromedio([alumno.nota1, alumno.nota2, alumno.nota3]);
                const alumnoNuevo = {
                    nombre: alumno.nombre,
                    apellido: alumno.apellido,
                    promedio: promedio
                };
                listaDeAlumnos.push(alumnoNuevo);
            });

            mostrarTablaAlumnos();

            Swal.fire('Datos cargados', 'Los datos se han cargado y los promedios se han calculado.', 'success');
        })
        .catch(error => {
            console.error('Hubo un error al cargar los datos:', error);
            Swal.fire('Error', 'Hubo un error al cargar los datos.');
        });
}

const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const nota1 = parseFloat(document.getElementById("nota1").value);
    const nota2 = parseFloat(document.getElementById("nota2").value);
    const nota3 = parseFloat(document.getElementById("nota3").value);

    if (!nombre || !apellido || isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
        Swal.fire('Error', 'Por favor, complete todos los campos.');
        return;
    }

    if (nota1 < 1 || nota1 > 10 || nota2 < 1 || nota2 > 10 || nota3 < 1 || nota3 > 10) {
        Swal.fire('Error', 'Las notas deben estar en el rango de 1 a 10');
        return;
    }

    const promedio = calcularPromedio([nota1, nota2, nota3]);

    const alumno = {
        nombre,
        apellido,
        promedio
    };

    listaDeAlumnos.push(alumno);

    localStorage.setItem('alumnos', JSON.stringify(listaDeAlumnos));

    mostrarTablaAlumnos();

    formulario.reset();
});

const botonBorrar = document.getElementById("borrar");
botonBorrar.addEventListener("click", () => {
    listaDeAlumnos.length = 0;
    localStorage.removeItem('alumnos');
    mostrarTablaAlumnos();
});

cargarDatosExternos();
