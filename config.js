// config.js - CÓDIGOS DE LA PERSEVERANCIA - FIX COBRO V2
const firebaseConfig = {
  apiKey: "AIzaSyAvrpQSDoq9S87j3J7V4-uhJnPFCylCU",
  authDomain: "parrilla-la-perseveranci-f3f54.firebaseapp.com",
  databaseURL: "https://parrilla-la-perseveranci-f3f54-default-rtdb.firebaseio.com",
  projectId: "parrilla-la-perseveranci-f3f54",
  storageBucket: "parrilla-la-perseveranci-f3f54.firebasestorage.app",
  messagingSenderId: "899082319184",
  appId: "1:899082319184:web:9876161963705785efe855"
};

// Inicializar Firebase (compat)
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// --- CÓDIGOS MAESTROS - SIN TILDES NI ESPACIOS ---
const MESAS = {
  "salon_mesa_1": "MESA 1",
  "salon_mesa_2": "MESA 2",
  "salon_mesa_3": "MESA 3",
  "salon_mesa_4": "MESA 4",
  "vereda_mesa_5": "MESA 5 VEREDA",
  "vereda_mesa_6": "MESA 6 VEREDA",
  "vereda_mesa_7": "MESA 7 VEREDA",
  "canal_mostrador": "MOSTRADOR",
  "canal_pickup": "PICKUP",
  "canal_delivery": "DELIVERY"
};

// Limpia cualquier nombre viejo con tilde/espacio
function normalizarKey(nombre) {
  return nombre.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // saca tildes
    .replace(/[^a-z0-9]+/g, "_") // espacios y simbolos -> _
    .replace(/^_|_$/g, "");
}

// Estados oficiales
const ESTADOS = {
  LIBRE: "libre",
  ACTIVA: "activa",
  MIXTA_LISTA: "mixta_lista", // AMARILLO PARPADEANTE
  COBRADA: "cobrada_para_liberar" // AMARILLO FIJO
};
