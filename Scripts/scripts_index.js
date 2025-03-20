import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getDatabase, ref, get, update } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyBYflm70mFVdioZqKdiWe1m92XCTy44Z_c",
    authDomain: "votaciones-2024-f1e0c.firebaseapp.com",
    databaseURL: "https://votaciones-2024-f1e0c-default-rtdb.firebaseio.com/",
    projectId: "votaciones-2024-f1e0c",
    storageBucket: "votaciones-2024-f1e0c.firebasestorage.app",
    messagingSenderId: "293361877394",
    appId: "1:293361877394:web:22f329fdcfceac4d5ac14b",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const submitBtn = document.getElementById('submitBtn');
const dniField = document.getElementById('dni');
const loginForm = document.getElementById('loginForm');

dniField.addEventListener('input', () => {
    submitBtn.disabled = dniField.value.trim() === '';
});

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const dniValue = dniField.value.trim();

    if (dniValue === '') {
        mostrarError('Por favor, ingresa tu DNI.');
        return;
    }

    submitBtn.disabled = true;

    try {
        const dniRef = ref(database, 'votantes/' + dniValue);
        const snapshot = await get(dniRef);

        if (snapshot.exists()) {
            const votante = snapshot.val();

            if (votante.voto === 'si') {
                mostrarError('Este DNI ya fue usado para votar. No puede volver a ingresar.');
            } else {
                localStorage.setItem('dni', dniValue);
                window.location.href = 'votacion.html';
            }
        } else {
            mostrarError('El DNI ingresado no está registrado para votar.');
        }
    } catch (error) {
        console.error('Error al verificar el DNI:', error);
        mostrarError('Ocurrió un error al validar tu DNI. Intenta de nuevo más tarde.');
    } finally {
        submitBtn.disabled = false;
    }
});

function mostrarLoginPopup() {
    document.getElementById("loginPopup").style.display = "flex";
}

function cerrarLoginPopup() {
    document.getElementById("loginPopup").style.display = "none";
}

function verificarLogin(event) {
    event.preventDefault();
    const usuario = document.getElementById("username").value;
    const contrasena = document.getElementById("password").value;

    if (usuario === "admin" && contrasena === "1234") {
        window.location.href = "resultados.html";
    } else {
        mostrarError("Usuario o contraseña incorrectos.");
    }
}

function mostrarError(mensaje) {
    const errorCard = document.getElementById("errorCard");
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = mensaje;
    errorCard.style.display = "flex";
}

function cerrarErrorCard() {
    const errorCard = document.getElementById("errorCard");
    errorCard.style.display = "none";
}

window.mostrarLoginPopup = mostrarLoginPopup;
window.cerrarLoginPopup = cerrarLoginPopup;
window.verificarLogin = verificarLogin;
window.cerrarErrorCard = cerrarErrorCard;

document.querySelectorAll('[onclick="cerrarLoginPopup()"]').forEach(element => {
    element.addEventListener('click', cerrarLoginPopup);
});
document.querySelectorAll('[onclick="mostrarLoginPopup()"]').forEach(element => {
    element.addEventListener('click', mostrarLoginPopup);
});

window.addEventListener('click', function(event) {
    const loginPopup = document.getElementById("loginPopup");
    if (event.target === loginPopup) {
        cerrarLoginPopup();
    }
});

document.querySelectorAll('[onclick="cerrarErrorCard()"]').forEach(element => {
    element.addEventListener('click', cerrarErrorCard);
});
