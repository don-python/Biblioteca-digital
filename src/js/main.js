import { app, auth, db } from "./firebase-config.js";

console.log("Biblioteca Digital INACAP");
console.log("Firebase inicializado:", !!app);
console.log("Authentication disponible:", !!auth);
console.log("Firestore disponible:", !!db);
