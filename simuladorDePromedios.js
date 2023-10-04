const listaDeAlumnos = []

function calcularPromedio(notas) {
    const totalNotas = notas.reduce((acc, nota) => acc + nota, 0)
    return totalNotas / notas.length
}

function mostrarTablaAlumnos() {
    const tabla = document.getElementById("tabla-alumnos")
    tabla.innerHTML = "<tr><th>Nombre</th><th>Apellido</th><th>Promedio</th></tr>"

    listaDeAlumnos.forEach((alumno) => {
        const fila = document.createElement("tr")
        fila.innerHTML = `<td>${alumno.nombre}</td><td>${alumno.apellido}</td><td>${alumno.promedio.toFixed(2)}</td>`
        tabla.appendChild(fila)
    })
}

const formulario = document.getElementById("formulario")
formulario.addEventListener("submit", (e) => {
    e.preventDefault()
    
    const nombre = document.getElementById("nombre").value
    const apellido = document.getElementById("apellido").value
    const nota1 = parseFloat(document.getElementById("nota1").value)
    const nota2 = parseFloat(document.getElementById("nota2").value)
    const nota3 = parseFloat(document.getElementById("nota3").value)
    
    const promedio = calcularPromedio([nota1, nota2, nota3])
    
    const alumno = {
        nombre,
        apellido,
        promedio
    }
    
    listaDeAlumnos.push(alumno)
    mostrarTablaAlumnos()
    
    formulario.reset()
})

const botonBorrar = document.getElementById("borrar")
botonBorrar.addEventListener("click", () => {
    listaDeAlumnos.length = 0
    mostrarTablaAlumnos()
})