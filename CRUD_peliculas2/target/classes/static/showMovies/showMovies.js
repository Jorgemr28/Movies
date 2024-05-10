let allMovies = [];
let updateButton = document.getElementById("updateButton");
updateButton.addEventListener("click", event =>{
    updateMovie(idMovieEdit)
    let form = document.getElementById("updateForm").style.visibility="hidden";
});
window.onload = function() {
    showMovies();
}
function showOnlyOneMovie(){
    let name = document.getElementById("movieName").value;
    let found = false; // Bandera para indicar si se encontró la película

    for (let movie of allMovies) {
        if (name.toLowerCase() === movie.name.toLowerCase()) { // Comparación sin importar mayúsculas o minúsculas
            findMovie(movie.id);
            found = true;
            break;
        }
    }

    if (!found) {
        alert("El nombre ingresado no existe o es incorrecto. Verifíquelo e inténtelo de nuevo.");
    }
}
async function findMovie(id) {
    try {
        const response = await fetch("http://LocalHost:8080/movies/Get/"+id, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            const errorData = await response.json();  // Extrae el cuerpo de la respuesta como JSON
            console.log(`HTTP error! status: ${response.status}`);
            // Muestra el mensaje de error específico proveniente del backend, o un mensaje genérico si no está disponible
            alert(`Error: ${errorData.message || "Algo ha salido mal con la busqueda. Verifica los datos y vuelve a intentarlo."}`);
        }
        const movie = await response.json();
        let contentTable = "";


        let contentRow = `
                <tr>
                    <td>${movie.id}</td>
                    <td>${movie.name}</td>
                    <td>${movie.author}</td>
                    <td>${movie.gender}</td>
                    <td>${movie.amount}</td>
                    <td><i onclick="autoCompleteForm(${movie.id})" class="material-icons button edit">edit</i>
                    <i onclick="deleteMovieButton(${movie.id})" class="material-icons button delete">delete</i></td>
                </tr>`;
        contentTable += contentRow;
        document.querySelector("#dataTable tbody").innerHTML = contentTable;
    } catch (error) {
        console.error('Error fetching movies:', error);
        alert("algo ha salido mal con la busqueda verifique los datos y vuelva a intentarlo 2")
    }
}
async function showMovies() {
    try {
        const response = await fetch("http://LocalHost:8080/movies/GetAllMovies", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            const errorData = await response.json();  // Extrae el cuerpo de la respuesta como JSON
            console.log(`HTTP error! status: ${response.status}`);
            // Muestra el mensaje de error específico proveniente del backend, o un mensaje genérico si no está disponible
            alert(`Error: ${errorData.message || "tenemos problemas para mostrar a los estudiantes"}`);
        }

        allMovies = await response.json();
        let contentTable = "";

        for (let movie of allMovies) {
            let contentRow = `
                <tr>
                    <td>${movie.id}</td>
                    <td>${movie.name}</td>
                    <td>${movie.author}</td>
                    <td>${movie.gender}</td>
                    <td>${movie.amount}</td>
                    <td><i onclick="autoCompleteForm(${movie.id})" class="material-icons button edit">edit</i>
                    <i onclick="deleteMovieButton(${movie.id})" class="material-icons button delete">delete</i></td>
                </tr>`;
            contentTable += contentRow;
        }
        document.querySelector("#dataTable tbody").innerHTML = contentTable;
    } catch (error) {
        console.error('Error fetching students:', error);
    }
}
function deleteMovieButton(id) {

    if(confirm("Estas seguro de eliminar al estudiante con el id="+id)){
        deleteMovie(id);
    }else{
        console.log("No se hicieron cambios en el estudiante")
    }
}
async function deleteMovie(id) {
    try {
        const response = await fetch("http://LocalHost:8080/movies/delete/"+id, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
        showMovies();
    }catch (error) {
        console.error('Error fetching students:', error);
    }

}
let idMovieEdit;
async function autoCompleteForm(id){
    idMovieEdit = id;
    showForm();
    let response = await fetch("http://LocalHost:8080/movies/Get/"+id,{
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
    let movie = await response.json();

    document.getElementById("nameMovie").value=movie.name;
    document.getElementById("Author").value=movie.author;
    document.getElementById("gender").value=movie.gender;
    document.getElementById("amount").value=movie.amount;

}

async function updateMovie(id){

    let movie = {
        name: document.getElementById("nameMovie").value,
        author: document.getElementById("Author").value,
        gender: document.getElementById("gender").value,
        amount: document.getElementById("amount").value,
    };

    try {
        const response = await fetch("http://localhost:8080/movies/Update/" + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie),
        });


        if (!response.ok) {
            const errorData = await response.json();  // Extrae el cuerpo de la respuesta como JSON
            console.log(`HTTP error! status: ${response.status}`);
            // Muestra el mensaje de error específico proveniente del backend, o un mensaje genérico si no está disponible
            alert(`Error: ${errorData.message || "Algo ha salido mal con el registro. Verifica los datos y vuelve a intentarlo."}`);
        } else {
            showMovies()
        }
    }catch (error) {
        console.error('Error during the fetch operation:', error.message);
        alert("algo ha salido mal con el registro \nverifica los datos y vuelve a intentarlo")
    }

}

function showForm(){
    let form = document.getElementById("updateForm").style.visibility="visible";
}