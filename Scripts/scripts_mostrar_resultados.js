import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyBYflm70mFVdioZqKdiWe1m92XCTy44Z_c",
    authDomain: "votaciones-2024-f1e0c.firebaseapp.com",
    databaseURL: "https://votaciones-2024-f1e0c-default-rtdb.firebaseio.com/",
    projectId: "votaciones-2024-f1e0c",
    storageBucket: "votaciones-2024-f1e0c.appspot.com",
    messagingSenderId: "293361877394",
    appId: "1:293361877394:web:22f329fdcfceac4d5ac14b",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

async function obtenerResultados() {
    try {
        const votosRef = ref(database, 'votos');
        const snapshot = await get(votosRef);
        const votos = snapshot.val();

        if (votos) {
            mostrarResultados(votos);
        } else {
            alert('No se encontraron resultados.');
        }
    } catch (error) {
        console.error('Error al obtener los resultados:', error);
        alert('Hubo un error al cargar los resultados.');
    }
}

function mostrarResultados(resultados) {
    const resultadosDiv = document.getElementById('resultados');
    let html = `<h2>Resultados de la Votación</h2>
        <table id="tabla-resultados">
            <thead>
                <tr>
                    <th>Grupo</th>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Votos</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (const grupo in resultados) {
        const grupoData = getGrupoData(grupo);
        html += `
            <tr>
                <td>${grupo}</td>
                <td><img src="${grupoData.imagen}" alt="Grupo ${grupo}" width="50"></td>
                <td>${grupoData.nombre}</td>
                <td>${Number(resultados[grupo]) || 0}</td>
            </tr>
        `;
    }

    html += `</tbody></table>`;
    resultadosDiv.innerHTML = html;
}

function getGrupoData(grupo) {
    const grupos = {
        'Grupo 1': { nombre: "Grupo A", imagen: "Recursos/img/Logo de grupos/ejemplo.png" },
        'Grupo 2': { nombre: "Grupo B", imagen: "Recursos/img/Logo de grupos/ejemplo.png" },
        'Grupo 3': { nombre: "Grupo C", imagen: "Recursos/img/Logo de grupos/ejemplo.png" },
        'Grupo 4': { nombre: "Grupo D", imagen: "Recursos/img/Logo de grupos/ejemplo.png" },
    };
    return grupos[grupo] || { nombre: `Grupo ${grupo}`, imagen: "Recursos/img/Logo de grupos/ejemplo.png" };
}

document.addEventListener('DOMContentLoaded', () => {
    obtenerResultados();
});