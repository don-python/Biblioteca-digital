import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    sendPasswordResetEmail,
    onAuthStateChanged,
    updateProfile,
    deleteUser
} from "firebase/auth";

import {
    doc,
    setDoc,
    serverTimestamp
} from "firebase/firestore";

import { auth, db } from "./firebase-config.js";

import {
    validarNombre,
    validarRut,
    validarCorreoInstitucional,
    validarPassword,
    coincidenPasswords,
    limpiarRut
} from "./validaciones.js";

// ========================================
// REGISTRO DE ESTUDIANTES
// ========================================

export async function registrarUsuario({
    nombre,
    apellido,
    rut,
    email,
    password,
    confirmarPassword
}) {
    // Normalizar datos
    const nombreLimpio = nombre?.trim();
    const apellidoLimpio = apellido?.trim();
    const correoLimpio = email?.trim().toLowerCase();
    const rutLimpio = limpiarRut(rut);

    // Validar nombre y apellido
    if (!validarNombre(nombreLimpio) || !validarNombre(apellidoLimpio)) {
        throw new Error("Ingresa un nombre y apellido válidos.");
    }

    // Validar RUT
    if (!validarRut(rutLimpio)) {
        throw new Error("El RUT ingresado no es válido.");
    }

    // Validar correo institucional
    if (!validarCorreoInstitucional(correoLimpio)) {
        throw new Error("Debes utilizar un correo @inacap.cl.");
    }

    // Validar contraseña
    if (!validarPassword(password)) {
        throw new Error(
            "La contraseña debe tener al menos 8 caracteres, mayúscula, minúscula, número y símbolo."
        );
    }

    // Confirmar contraseña
    if (!coincidenPasswords(password, confirmarPassword)) {
        throw new Error("Las contraseñas no coinciden.");
    }

    // Crear cuenta en Firebase Authentication
    const credencial = await createUserWithEmailAndPassword(
        auth,
        correoLimpio,
        password
    );

    const usuario = credencial.user;

    try {
        // Actualizar nombre visible
        await updateProfile(usuario, {
            displayName: `${nombreLimpio} ${apellidoLimpio}`
        });

        // Crear perfil en Firestore
        await setDoc(doc(db, "usuarios", usuario.uid), {
            nombre: nombreLimpio,
            apellido: apellidoLimpio,
            rut: rutLimpio,
            correo: usuario.email,
            rol: "estudiante",
            fechaRegistro: serverTimestamp(),
            correoVerificado: false,
            estado: "activo"
        });

        // Enviar correo de verificación
        await sendEmailVerification(usuario);

        return usuario;

    } catch (error) {
        console.error("Error al completar el registro:", error);

        // Intentar eliminar la cuenta incompleta
        try {
            await deleteUser(usuario);
        } catch (errorEliminacion) {
            console.error(
                "No se pudo eliminar la cuenta incompleta:",
                errorEliminacion
            );
        }

        throw new Error(
            "No se pudo completar el registro. Inténtalo nuevamente o contacta al administrador."
        );
    }
}

// ========================================
// INICIAR SESIÓN
// ========================================

export async function iniciarSesion(email, password) {
    if (!validarCorreoInstitucional(email)) {
        throw new Error("Debes utilizar un correo @inacap.cl.");
    }

    const credencial = await signInWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password
    );

    if (!credencial.user.emailVerified) {
        await signOut(auth);

        throw new Error(
            "Debes verificar tu correo electrónico antes de ingresar."
        );
    }

    return credencial.user;
}

// ========================================
// CERRAR SESIÓN
// ========================================

export async function cerrarSesion() {
    return await signOut(auth);
}

// ========================================
// RECUPERAR CONTRASEÑA
// ========================================

export async function recuperarPassword(email) {
    if (!validarCorreoInstitucional(email)) {
        throw new Error("Ingresa un correo institucional válido.");
    }

    return await sendPasswordResetEmail(
        auth,
        email.trim().toLowerCase()
    );
}

// ========================================
// OBSERVAR ESTADO DE SESIÓN
// ========================================

export function observarSesion(callback) {
    return onAuthStateChanged(auth, callback);
}
