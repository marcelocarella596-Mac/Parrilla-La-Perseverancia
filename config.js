<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>La Perseverancia - Carta</title>
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-database-compat.js"></script>
</head>
<body class="bg-gray-100">
<header class="bg-red-800 text-white p-3 sticky top-0 z-10">
  <h1 class="font-bold">PARRILLA LA PERSEVERANCIA</h1>
  <p id="mesa-label" class="text-xs"></p>
</header>
<div id="menu" class="p-4 pb-32">Cargando carta...</div>
<div class="fixed bottom-0 left-0 right-0 bg-white p-4 border-t shadow-xl flex justify-between items-center">
  <div><b id="total">$0</b> - <span id="count">0</span> prod</div>
  <button onclick="pedir()" class="bg-green-600 text-white px-6 py-3 rounded-full font-bold">Pedir por WhatsApp</button>
</div>
<script>
const firebaseConfig = {
  apiKey: "AIzaSyAvrpQSDoq9S87j3J7V4-uhJnPFCylCU",
  authDomain: "parrilla-la-perseveranci-f3f54.firebaseapp.com",
  databaseURL: "https://parrilla-la-perseveranci-f3f54-default-rtdb.firebaseio.com",
  projectId: "parrilla-la-perseveranci-f3f54",
  storageBucket: "parrilla-la-perseveranci-f3f54.firebasestorage.app",
  messagingSenderId: "899082319184",
  appId: "1:899082319184:web:9876161963705785efe855"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const params = new URLSearchParams(location.search);
const mesaKey = params.get('mesa') || 'salon_mesa_1';
document.getElementById('mesa-label').textContent = mesaKey.replaceAll('_',' ').toUpperCase();

let productos = [];
let carrito = [];

function cargar(){
  // Probamos 2 lugares donde podrian estar los productos
  db.ref('productos').once('value').then(snap=>{
    if(snap.exists()){
      const data = snap.val();
      productos = Object.keys(data).map(k=>({id:k, ...data[k]}));
      render();
    } else {
      return db.ref('menu').once('value');
    }
  }).then(snap=>{
    if(snap && snap.exists() && productos.length==0){
      const data = snap.val();
      productos = Object.keys(data).map(k=>({id:k, ...data[k]}));
      render();
    }
    if(productos.length==0){
      document.getElementById('menu').innerHTML = '<p class="text-center p-10">No hay productos en la base Realtime Database.<br>Fijate en Firebase que esten en /productos</p>';
    }
  });
}

function render(){
  let html='';
  const cats = [...new Set(productos.map(p=>p.categoria||'General'))];
  cats.forEach(cat=>{
    html+=`<h2 class="font-bold mt-6 mb-2 text-red-800">${cat.toUpperCase()}</h2>`;
    productos.filter(p=>(p.categoria||'General')==cat).forEach(p=>{
      html+=`<div class="bg-white rounded-xl p-3 mb-3 flex justify-between items-center shadow">
        <div><b>${p.nombre}</b><br><small class="text-gray-500">${p.descripcion||''}</small><br><b class="text-red-700">$${p.precio}</b></div>
        <button onclick="add('${p.id}')" class="bg-red-700 text-white w-10 h-10 rounded-full">+</button>
      </div>`;
    });
  });
  document.getElementById('menu').innerHTML=html;
}

window.add=(id)=>{
  const p=productos.find(x=>x.id==id);
  carrito.push(p);
  document.getElementById('count').textContent=carrito.length;
  const t=carrito.reduce((s,x)=>s+Number(x.precio),0);
  document.getElementById('total').textContent='$'+t;
}
window.pedir=()=>{
  if(carrito.length==0) return alert('Carrito vacio');
  let txt=`*PEDIDO ${mesaKey.toUpperCase()}*%0A`;
  carrito.forEach(p=>txt+=`- ${p.nombre} $${p.precio}%0A`);
  const t=carrito.reduce((s,x)=>s+Number(x.precio),0);
  txt+=`%0ATotal: $${t}`;
  window.open('https://wa.me/5491100000000?text='+txt,'_blank');
}
cargar();
</script>
</body>
</html>
