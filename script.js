const API = "http://localhost:8080";

let currentUser = null;
let selectedFood = null;

/* =========================
   LOGIN
========================= */
async function login() {

    const email = document.getElementById("login-email").value.trim();
    const pass = document.getElementById("login-pass").value.trim();

    try {

        const res = await fetch(
            `${API}/user/login?emailid=${encodeURIComponent(email)}&password=${encodeURIComponent(pass)}`,
            { method: "POST" }
        );

        const data = await res.text();

        if (!res.ok) {
            alert(data);
            return;
        }

        const parts = data.split(":");

        currentUser = {
            role: parts[1],
            id: Number(parts[2]),
            email: email
        };

        initUI();

    } catch (e) {
        alert("Cannot connect to server");
    }
}

/* =========================
   REGISTER
========================= */
async function register() {

    const name = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const pass = document.getElementById("reg-pass").value.trim();
    const role = document.getElementById("reg-role").value;

    try {

        const res = await fetch(
            `${API}/user/register?name=${encodeURIComponent(name)}&emailid=${encodeURIComponent(email)}&password=${encodeURIComponent(pass)}&role=${role}`,
            { method: "POST" }
        );

        const msg = await res.text();
        alert(msg);

    } catch (e) {
        alert("Server Error");
    }
}

/* =========================
   INIT UI
========================= */
function initUI() {

    document.getElementById("auth-section").style.display = "none";
    document.getElementById("dashboard").style.display = "block";

    document.getElementById("nav-user").innerHTML = `
        ${currentUser.email} (${currentUser.role})
        <button onclick="logout()">Logout</button>
    `;

    if (currentUser.role === "USER") {

        document.getElementById("user-section").style.display = "block";
        document.getElementById("provider-section").style.display = "none";

        loadFood();
        loadUserOrders();

    } else {

        document.getElementById("provider-section").style.display = "block";
        document.getElementById("user-section").style.display = "none";

        loadProviderOrders();
    }
}

/* =========================
   FOOD IMAGE SYSTEM (UPGRADED)
========================= */
const foodImageMap = {
    biriyani: [
        "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg",
        "https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg"
    ],
    pizza: [
        "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg",
        "https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg"
    ],
    burger: [
        "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg",
        "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg"
    ],
    friedrice: [
        "https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg",
        "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg"
    ],
    idli: [
        "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg",
        "https://images.pexels.com/photos/4331489/pexels-photo-4331489.jpeg"
    ]
};

const defaultImages = [
    "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg",
    "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg"
];

function getFoodImage(name) {

    const key = name.toLowerCase().replace(/\s/g, "");

    if (foodImageMap[key]) {
        const list = foodImageMap[key];
        return list[Math.floor(Math.random() * list.length)];
    }

    return defaultImages[Math.floor(Math.random() * defaultImages.length)];
}

/* =========================
   LOAD FOOD (USER)
========================= */
async function loadFood() {

    try {

        const res = await fetch(`${API}/food/available?userId=${currentUser.id}`);
        const foods = await res.json();

        const container = document.getElementById("food-list");
        container.innerHTML = "";

        foods.forEach(f => {

            container.innerHTML += `
            <div class="food-card">

                <div class="food-img">
                    <img src="${getFoodImage(f.foodname)}" alt="${f.foodname}">
                </div>

                <div class="food-info">

                    <h3>${f.foodname}</h3>

                    <p class="price">₹${f.price}</p>

                    <p class="qty">Qty: ${f.quantity}</p>

                    <button onclick="openModal(${f.foodid})">
                        Order
                    </button>

                </div>

            </div>
            `;
        });

    } catch (e) {
        alert("Unable to load foods");
    }
}

/* =========================
   USER ORDERS
========================= */
async function loadUserOrders() {

    try {

        const res = await fetch(`${API}/order/user?userId=${currentUser.id}`);
        const orders = await res.json();

        const container = document.getElementById("user-orders");
        container.innerHTML = "";

        orders.forEach(o => {

            container.innerHTML += `
            <div class="card">

                <h4>${o.foodName}</h4>
                <p>Quantity: ${o.quantity}</p>

                <p>User ID: ${o.userId}</p>
                <p>Name: ${o.userName}</p>
                <p>Email: ${o.emailid}</p>
                <p>Role: ${o.role}</p>

            </div>
            `;
        });

    } catch {
        alert("Unable to load orders");
    }
}

/* =========================
   PROVIDER ORDERS (stub safe)
========================= */
async function loadProviderOrders() {

    try {

        const res = await fetch(`${API}/order/provider?providerId=${currentUser.id}`);
        const orders = await res.json();

        const container = document.getElementById("provider-orders");
        container.innerHTML = "";

        orders.forEach(o => {

            container.innerHTML += `
            <div class="card">
                <h4>${o.foodName}</h4>
                <p>Qty: ${o.quantity}</p>
                <p>User: ${o.userName}</p>
            </div>
            `;
        });

    } catch {
        console.log("Provider orders not loaded");
    }
}

/* =========================
   ADD FOOD
========================= */
async function addFood() {

    const foodname = document.getElementById("food-name").value.trim();
    const quantity = document.getElementById("food-qty").value;
    const price = document.getElementById("food-price").value;
    const location = document.getElementById("food-loc").value.trim();

    if (!foodname || !quantity || !price || !location) {
        alert("Please fill all fields");
        return;
    }

    const expireTime = Math.floor(Date.now() / 1000) + 86400;

    try {

        const res = await fetch(
            `${API}/food/add?foodname=${encodeURIComponent(foodname)}&quantity=${quantity}&price=${price}&expireTime=${expireTime}&location=${encodeURIComponent(location)}&providerId=${currentUser.id}`,
            { method: "POST" }
        );

        const msg = await res.text();

        if (!res.ok) {
            alert(msg);
            return;
        }

        alert("Food Added Successfully");

        document.getElementById("food-name").value = "";
        document.getElementById("food-qty").value = "";
        document.getElementById("food-price").value = "";
        document.getElementById("food-loc").value = "";

        loadProviderOrders();

    } catch (e) {
        alert("Unable to connect to server");
    }
}

/* =========================
   MODAL
========================= */
function openModal(id) {
    selectedFood = id;
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

/* =========================
   PLACE ORDER
========================= */
async function placeOrder() {

    const qty = document.getElementById("qty").value;

    try {

        const res = await fetch(
            `${API}/order/place?userId=${currentUser.id}&foodId=${selectedFood}&quantity=${qty}`,
            { method: "POST" }
        );

        const msg = await res.text();
        alert(msg);

        if (res.ok) {
            closeModal();
            loadFood();
            loadUserOrders();
        }

    } catch {
        alert("Server Error");
    }
}

/* =========================
   LOGOUT
========================= */
function logout() {
    location.reload();
}