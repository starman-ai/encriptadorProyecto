// Función para validar el texto (solo minúsculas y sin caracteres especiales)
function validarTexto(texto) {
    const regex = /^[a-z\s]+$/;  // Solo letras minúsculas y espacios
    return regex.test(texto);
}

// Función para mostrar/ocultar la advertencia y habilitar/deshabilitar botones
function mostrarAdvertencia(mostrar) {
    const warningText = document.getElementById("warning-text");
    const btnEncrypt = document.querySelector(".btn-encrypt");
    const btnDecrypt = document.querySelector(".btn-decrypt");

    if (mostrar) {
        warningText.style.display = "block";  // Muestra la advertencia
        btnEncrypt.disabled = true;           // Deshabilita botón de encriptar
        btnDecrypt.disabled = true;           // Deshabilita botón de desencriptar
        btnEncrypt.style.cursor = "not-allowed"; // Cambia el cursor para indicar deshabilitado
        btnDecrypt.style.cursor = "not-allowed"; // Cambia el cursor para indicar deshabilitado
    } else {
        warningText.style.display = "none";   // Oculta la advertencia
        btnEncrypt.disabled = false;          // Habilita botón de encriptar
        btnDecrypt.disabled = false;          // Habilita botón de desencriptar
        btnEncrypt.style.cursor = "pointer";  // Restablece el cursor a normal
        btnDecrypt.style.cursor = "pointer";  // Restablece el cursor a normal
    }
}

// Función para encriptar el texto
function encriptarTexto(texto) {
    let textoEncriptado = texto.replace(/e/g, "enter")
                               .replace(/i/g, "imes")
                               .replace(/a/g, "ai")
                               .replace(/o/g, "ober")
                               .replace(/u/g, "ufat");
    return textoEncriptado;
}

// Función para desencriptar el texto
function desencriptarTexto(textoEncriptado) {
    let textoOriginal = textoEncriptado.replace(/enter/g, "e")
                                       .replace(/imes/g, "i")
                                       .replace(/ai/g, "a")
                                       .replace(/ober/g, "o")
                                       .replace(/ufat/g, "u");
    return textoOriginal;
}

// Función para copiar el texto al portapapeles
function copiarAlPortapapeles(texto) {
    navigator.clipboard.writeText(texto)
        .then(() => {
            alert("Texto copiado al portapapeles.");
        })
        .catch(err => {
            console.error("Error al copiar el texto: ", err);
        });
}

// Función para actualizar el estado del H2 y el botón de copiar
function actualizarEstadoSalida(texto) {
    const outputHeader = document.getElementById("output-header");
    const btnCopy = document.querySelector(".btn-copy");
    
    if (texto) {
        outputHeader.style.display = "none"; // Oculta el H2
        btnCopy.disabled = false;            // Habilita el botón de copiar
        btnCopy.style.cursor = "pointer";    // Restablece el cursor a normal
    } else {
        outputHeader.style.display = "block"; // Muestra el H2
        btnCopy.disabled = true;              // Deshabilita el botón de copiar
        btnCopy.style.cursor = "not-allowed"; // Cambia el cursor para indicar deshabilitado
    }
}

// Lógica para manejar los eventos del DOM
document.addEventListener("DOMContentLoaded", function () {
    const textInput = document.getElementById("text-input");
    const outputText = document.getElementById("output-text");
    const btnEncrypt = document.querySelector(".btn-encrypt");
    const btnDecrypt = document.querySelector(".btn-decrypt");
    const btnCopy = document.querySelector(".btn-copy");
    const btnClear = document.querySelector(".btn-clear");

    // Evento para validar en tiempo real
    textInput.addEventListener("input", function () {
        const texto = textInput.value.trim();
        mostrarAdvertencia(!validarTexto(texto));  // Muestra u oculta la advertencia según la validez del texto
    });

    // Evento para encriptar el texto
    btnEncrypt.addEventListener("click", function () {
        const texto = textInput.value.trim();
        if (validarTexto(texto)) {
            const textoEncriptado = encriptarTexto(texto);
            outputText.textContent = textoEncriptado;
            actualizarEstadoSalida(textoEncriptado); // Actualiza el estado de la salida
        } else {
            alert("⚠️ Solo letras minúsculas, sin acentos y sin caracteres especiales (incluida la ñ) ⚠️");
        }
    });

    // Evento para desencriptar el texto
    btnDecrypt.addEventListener("click", function () {
        const texto = textInput.value.trim();
        if (validarTexto(texto)) {
            const textoDesencriptado = desencriptarTexto(texto);
            outputText.textContent = textoDesencriptado;
            actualizarEstadoSalida(textoDesencriptado); // Actualiza el estado de la salida
        } else {
            alert("⚠️ Solo letras minúsculas, sin acentos y sin caracteres especiales (incluida la ñ) ⚠️");
        }
    });

    // Evento para copiar el texto al portapapeles
    btnCopy.addEventListener("click", function () {
        const textoParaCopiar = outputText.textContent;
        copiarAlPortapapeles(textoParaCopiar);
    });

    // Evento para limpiar el texto y restablecer el estado inicial
    btnClear.addEventListener("click", function () {
        textInput.value = "";
        outputText.textContent = "Ingresa el texto que desees encriptar o desencriptar.";
        actualizarEstadoSalida(""); // Restablece el estado de la salida
        mostrarAdvertencia(false);   // Oculta la advertencia
    });
});