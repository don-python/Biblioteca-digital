// ========================================
// VALIDACIONES DE REGISTRO
// Biblioteca Digital INACAP
// ========================================

// Validar nombre y apellido
export function validarNombre(nombre) {
    if (typeof nombre !== "string") return false;

    const valor = nombre.trim();

    return valor.length >= 3 &&
        /^[\p{L}\s'-]+$/u.test(valor);
}

// Limpiar RUT: elimina puntos, guiones y espacios
export function limpiarRut(rut) {
    if (typeof rut !== "string") return "";

    return rut
        .replace(/\./g, "")
        .replace(/-/g, "")
        .replace(/\s/g, "")
        .toUpperCase();
}

// Validar RUT chileno y dígito verificador
export function validarRut(rut) {
    const rutLimpio = limpiarRut(rut);

    if (!/^\d{7,8}[0-9K]$/.test(rutLimpio)) {
        return false;
    }

    const cuerpo = rutLimpio.slice(0, -1);
    const digitoIngresado = rutLimpio.slice(-1);

    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += Number(cuerpo[i]) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const resultado = 11 - (suma % 11);

    let digitoCalculado;

    if (resultado === 11) {
        digitoCalculado = "0";
    } else if (resultado === 10) {
        digitoCalculado = "K";
    } else {
        digitoCalculado = String(resultado);
    }

    return digitoCalculado === digitoIngresado;
}

// Validar correo institucional INACAP
export function validarCorreoInstitucional(email) {
    if (typeof email !== "string") return false;

    const correo = email.trim().toLowerCase();

    const formatoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

    if (!formatoValido) return false;

    const dominio = correo.split("@")[1];

    return dominio === "inacap.cl";
}

// Validar contraseña segura
export function validarPassword(password) {
    if (typeof password !== "string") return false;

    const tieneLongitud = password.length >= 8;
    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneMinuscula = /[a-z]/.test(password);
    const tieneNumero = /[0-9]/.test(password);
    const tieneEspecial = /[^A-Za-z0-9]/.test(password);

    return (
        tieneLongitud &&
        tieneMayuscula &&
        tieneMinuscula &&
        tieneNumero &&
        tieneEspecial
    );
}

// Comprobar que ambas contraseñas coincidan
export function coincidenPasswords(password, confirmacion) {
    return typeof password === "string" &&
        typeof confirmacion === "string" &&
        password === confirmacion;
}
