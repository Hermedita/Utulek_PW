const PaymentStatus = { Processing: "Processing", Success: "Success", Failure: "Failure", Refunded: "Refunded" };
const RequestStatus = { Processing: "Processing", Accepted: "Accepted", Rejected: "Rejected", Cancelled: "Cancelled" };
const AnimalStatus = { Inactive: "Inactive", Active: "Active" };

const CURRENT_DB_VERSION = "13.6";
const savedVersion = localStorage.getItem("hervas_db_version");

let locationsData = JSON.parse(localStorage.getItem("hervas_locations")) || [
    "Dočasná péče HERVAS", "Azyl HERVAS", "Záchranný areál HERVAS", "Veterinární stanice"
];

let defaultAnimals = [
    { id: 1, name: "Mína", type: "Kočka", gender: "Samice", age: 7, status: AnimalStatus.Active, adoptable: true, image: "/img/Kocka/Mina001.png", intro: "Mína je klidná kočka, která potřebuje bezpečí a péči.", text: "Do péče HERVAS se dostala po náročné rekonvalescenci.", care: "Krmivo a léčba.", location: "Dočasná péče HERVAS" },
    { id: 2, name: "Max", type: "Pes", gender: "Samec", age: 9, status: AnimalStatus.Active, adoptable: true, image: "/img/Pes/Max001.png", intro: "Přátelský pes, který má rád lidi.", text: "Užívá si klidné stárnutí a procházky.", care: "Veterinární kontroly a léky.", location: "Dočasná péče HERVAS" },
    { id: 3, name: "Karim", type: "Jine", gender: "Samec", age: 12, status: AnimalStatus.Active, adoptable: false, image: "/img/Jine/Karim003.png", intro: "Klidný papoušek vyžadující speciální péči.", text: "Získal bezpečný domov v našem areálu.", care: "Krmení a údržba voliéry.", location: "Záchranný areál HERVAS" },
    { id: 4, name: "Jumbo", type: "Jine", gender: "Samec", age: 15, status: AnimalStatus.Active, adoptable: false, image: "/img/Jine/Jumbo004.png", intro: "Impozantní a moudrý slon africký.", text: "Naše největší svěřenec vyžadující speciální velkoobjemovou péči.", care: "Seno, zelenina a pastva.", location: "Záchranný areál HERVAS" },
    { id: 5, name: "Sahib", type: "Jine", gender: "Samec", age: 8, status: AnimalStatus.Active, adoptable: true, image: "/img/Jine/Sahib005.png", intro: "Klidný pouštní velbloud.", text: "Zvyklý na venkovní ustájení.", care: "Seno, jádro a pastva.", location: "Záchranný areál HERVAS" },
    { id: 6, name: "Líza", type: "Kočka", gender: "Samice", age: 1, status: AnimalStatus.Active, adoptable: true, image: "/img/Kocka/Liza001.png", intro: "Hravé kotě zachráněné z ulice.", text: "Velmi mazlivá a zvědavá kočička.", care: "Očkování a krmivo.", location: "Dočasná péče HERVAS" },
    { id: 7, name: "Oskar", type: "Pes", gender: "Samec", age: 11, status: AnimalStatus.Active, adoptable: true, image: "/img/Pes/Oskar001.png", intro: "Starší pes hledající klidné dožití.", text: "Oskar miluje spánek na sluníčku.", care: "Kloubní výživa.", location: "Azyl HERVAS" },
    { id: 8, name: "Kiki", type: "Jine", gender: "Samice", age: 3, status: AnimalStatus.Inactive, adoptable: false, image: "/img/Jine/Kiki001.png", intro: "Roztomilý králíček v léčení.", text: "Momentálně v karanténě.", care: "Speciální péče.", location: "Veterinární stanice" },
    { id: 9, name: "Bella", type: "Kočka", gender: "Samice", age: 5, status: AnimalStatus.Active, adoptable: true, image: "/img/Kocka/Bella001.png", intro: "Klidná kočka se zelenýma očima.", text: "Ráda odpočívá u okna.", care: "Krmivo a péče o srst.", location: "Azyl HERVAS" },
    { id: 10, name: "Bary", type: "Pes", gender: "Samec", age: 4, status: AnimalStatus.Active, adoptable: true, image: "/img/Pes/Bary001.png", intro: "Věrný hlídač a společník.", text: "Skvělý pes na zahradu i k rodině.", care: "Kvalitní granule.", location: "Azyl HERVAS" },
    { id: 11, name: "Mourka", type: "Kočka", gender: "Samice", age: 3, status: AnimalStatus.Active, adoptable: true, image: "/img/Kocka/Mourka001.png", intro: "Chytrá mourovatá kočka plná života.", text: "Zvyklá na pobyt v bytě.", care: "Základní péče.", location: "Dočasná péče HERVAS" },
    { id: 12, name: "Rex", type: "Pes", gender: "Samec", age: 8, status: AnimalStatus.Active, adoptable: true, image: "/img/Pes/Rex001.png", intro: "Aktivní pes vyžadující pohyb.", text: "Učenlivý a poslušný parťák.", care: "Aktivní trénink a krmivo.", location: "Azyl HERVAS" },
    { id: 13, name: "Sisi", type: "Jine", gender: "Samice", age: 2, status: AnimalStatus.Active, adoptable: true, image: "/img/Jine/Sisi001.png", intro: "Roztomilý zakrslý králíček.", text: "Zachráněna z nevhodných podmínek.", care: "Seno a specializované krmivo.", location: "Dočasná péče HERVAS" },
    { id: 14, name: "Felix", type: "Kočka", gender: "Samec", age: 6, status: AnimalStatus.Active, adoptable: true, image: "/img/Kocka/Felix001.png", intro: "Černobílý elegantní kocour.", text: "Rád se mazlí a vyhledává lidskou společnost.", care: "Krmivo a česání.", location: "Azyl HERVAS" },
    { id: 15, name: "Ben", type: "Pes", gender: "Samec", age: 1, status: AnimalStatus.Active, adoptable: true, image: "/img/Pes/Ben001.png", intro: "Mladý kříženec plný hravosti.", text: "Rychle se učí základním návykům.", care: "Krmivo pro mladé psy.", location: "Dočasná péče HERVAS" },
    { id: 16, name: "Rozárka", type: "Jine", gender: "Samice", age: 5, status: AnimalStatus.Active, adoptable: true, image: "/img/Jine/Rozarka001.png", intro: "Krasavec mezi papoušky.", text: "Péče v odborné stanici azylu.", care: "Ovoce a semena.", location: "Záchranný areál HERVAS" },
    { id: 17, name: "Charlie", type: "Pes", gender: "Samec", age: 5, status: AnimalStatus.Active, adoptable: true, image: "/img/Pes/Charlie001.png", intro: "Přátelský světlý pes.", text: "Miluje vodu, procházky a míčky.", care: "Krmivo.", location: "Azyl HERVAS" },
    { id: 18, name: "Micka", type: "Kočka", gender: "Samice", age: 8, status: AnimalStatus.Active, adoptable: true, image: "/img/Kocka/Micka001.png", intro: "Rozvážná stříbrná kočka.", text: "Hledá klidný domov bez hlučných zvířat.", care: "Veterinární péče.", location: "Dočasná péče HERVAS" },
    { id: 19, name: "Toby", type: "Pes", gender: "Samec", age: 3, status: AnimalStatus.Active, adoptable: true, image: "/img/Pes/Toby001.png", intro: "Malý terriér plný energie.", text: "Vhodný do bytu i k domku.", care: "Krmivo a pohyb.", location: "Azyl HERVAS" },
    { id: 20, name: "Sněhulka", type: "Kočka", gender: "Samice", age: 2, status: AnimalStatus.Active, adoptable: true, image: "/img/Kocka/Snehulka001.png", intro: "Čistě bílá kočka.", text: "Nalezenec, velmi přátelská.", care: "Krmivo a vyčesávání.", location: "Azyl HERVAS" },
    { id: 21, name: "Dasty", type: "Pes", gender: "Samec", age: 7, status: AnimalStatus.Active, adoptable: true, image: "/img/Pes/Dasty001.png", intro: "Klidný dlouhosrstý pes.", text: "Skvělý společník pro starší lidi.", care: "Péče o srst a procházky.", location: "Dočasná péče HERVAS" },
    { id: 22, name: "Blesk", type: "Jine", gender: "Samec", age: 4, status: AnimalStatus.Active, adoptable: true, image: "/img/Jine/Blesk001.png", intro: "Zachráněný kůň v azylu.", text: "Potřebuje virtuální adopci pro ustájení.", care: "Seno, jádro a pastva.", location: "Záchranný areál HERVAS" },
    { id: 23, name: "Astra", type: "Kočka", gender: "Samice", age: 4, status: AnimalStatus.Active, adoptable: true, image: "/img/Kocka/Astra001.png", intro: "Zvědavá barevná kočka.", text: "Ráda zkoumá nové prostory.", care: "Krmivo.", location: "Azyl HERVAS" },
    { id: 24, name: "César", type: "Pes", gender: "Samec", age: 10, status: AnimalStatus.Active, adoptable: true, image: "/img/Pes/Cesar001.png", intro: "Moudrý starý ovčák.", text: "Hledá někoho, kdo mu dopřeje dospání.", care: "Kloubní výživa.", location: "Azyl HERVAS" },
    { id: 25, name: "Lola", type: "Kočka", gender: "Samice", age: 1, status: AnimalStatus.Active, adoptable: true, image: "/img/Kocka/Lola001.png", intro: "Mladá zrzavá kočička.", text: "Hravá, očkovaná a odčervená.", care: "Krmivo.", location: "Dočasná péče HERVAS" },
    { id: 26, name: "Rambo", type: "Pes", gender: "Samec", age: 5, status: AnimalStatus.Active, adoptable: true, image: "/img/Pes/Rambo001.png", intro: "Silný a věrný pes.", text: "Potřebuje důsledného majitele.", care: "Trénink a kvalitní strava.", location: "Azyl HERVAS" },
    { id: 27, name: "Píšťalka", type: "Jine", gender: "Samice", age: 3, status: AnimalStatus.Active, adoptable: true, image: "/img/Jine/Pistalka001.png", intro: "Krásná korela.", text: "Veselý a zpěvavý ptáček z dočasné péče.", care: "Krmení a péče.", location: "Dočasná péče HERVAS" }
];

let animalsData;
if (savedVersion !== CURRENT_DB_VERSION) {
    animalsData = defaultAnimals;
    localStorage.setItem("hervas_animals", JSON.stringify(defaultAnimals));
    localStorage.setItem("hervas_db_version", CURRENT_DB_VERSION);
} else {
    animalsData = JSON.parse(localStorage.getItem("hervas_animals")) || defaultAnimals;
}

let usersDatabase = JSON.parse(localStorage.getItem("hervas_users_db")) || [
    { name: "Hlavní Admin", email: "admin@hervas.cz", role: "Admin" },
    { name: "Manažer Jan", email: "manager@hervas.cz", role: "Manager" },
    { name: "Jan Novák", email: "jan@example.com", role: "Uživatel" }
];

let currentUser = JSON.parse(localStorage.getItem("hervas_user")) || null;
let requestsData = JSON.parse(localStorage.getItem("hervas_requests")) || [];
let messagesData = JSON.parse(localStorage.getItem("hervas_messages")) || [];

let currentPage = 1;
const itemsPerPage = 9;
let filteredAnimals = [...animalsData];
let currentAnimalId = localStorage.getItem("hervas_current_animal") ? parseInt(localStorage.getItem("hervas_current_animal")) : null;

document.addEventListener("DOMContentLoaded", () => {
    saveAnimals();
    saveUsersDb();
    updateAuthUI();

    if (document.getElementById("animalGrid")) applyFilters();
    if (document.getElementById("detailName")) loadAnimalDetail();
    if (document.getElementById("userTransactionsList")) renderUserTransactions();
    if (document.getElementById("addLocationSelect")) renderLocationSelects();
    if (document.getElementById("heroSlideshow")) startHeroSlideshow();
});

function formatAge(age) {
    if (age === 1) return "1 rok";
    if (age >= 2 && age <= 4) return `${age} roky`;
    return `${age} let`;
}

function startHeroSlideshow() {
    const slide1 = document.getElementById("heroSlide1");
    const slide2 = document.getElementById("heroSlide2");
    const images = animalsData.map(a => a.image);
    if (images.length === 0 || !slide1 || !slide2) return;

    slide1.style.backgroundImage = `url('${images[0]}')`;
    slide1.classList.add("active");
    let idx = 0, currentSlide = 1;

    setInterval(() => {
        idx = (idx + 1) % images.length;
        const nextImg = images[idx];
        if (currentSlide === 1) {
            slide2.style.backgroundImage = `url('${nextImg}')`;
            slide2.classList.add("active");
            slide1.classList.remove("active");
            currentSlide = 2;
        } else {
            slide1.style.backgroundImage = `url('${nextImg}')`;
            slide1.classList.add("active");
            slide2.classList.remove("active");
            currentSlide = 1;
        }
    }, 4500);
}

function updateAuthUI() {
    const topLinks = document.getElementById("topAuthLinks");
    const navProfil = document.getElementById("navProfilLink");
    const navAuth = document.getElementById("navAuthLink");

    if (currentUser) {
        if (topLinks) {
            topLinks.innerHTML = `Přihlášen: <strong>${currentUser.name}</strong> (${currentUser.role}) | <a href="/Home/Index#kontakt">Kontakt</a> | <a href="/Profile/Index" style="color:#333; text-decoration:none; font-weight:600;">Profil</a> | <a href="#" onclick="handleLogout()" style="color:#b83232; text-decoration:none; font-weight:600;">Odhlásit</a>`;
        }
        if (navProfil) navProfil.classList.remove("hidden");
        if (navAuth) navAuth.classList.add("hidden");
    } else {
        if (topLinks) {
            topLinks.innerHTML = `<a href="/Home/Index#kontakt">Kontakt</a> | <a href="/Account/Login" style="color:#333; text-decoration:none; font-weight:600;">Přihlášení / Registrace</a>`;
        }
        if (navProfil) navProfil.classList.add("hidden");
        if (navAuth) navAuth.classList.remove("hidden");
    }
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const user = usersDatabase.find(u => u.email === email);

    if (!user) {
        alert("Tento účet neexistuje. Prosím, nejdříve se zaregistrujte.");
        return;
    }

    currentUser = user;
    localStorage.setItem("hervas_user", JSON.stringify(currentUser));
    location.href = "/Profile/Index";
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("regPasswordConfirm").value;

    if (password !== confirmPassword) { alert("Hesla se neshodují!"); return; }

    const existing = usersDatabase.find(u => u.email === email);
    if (existing) {
        alert("Uživatel s tímto e-mailem již existuje.");
        return;
    }

    const newUser = { name, email, role: "Uživatel" };
    usersDatabase.push(newUser);
    saveUsersDb();
    currentUser = newUser;
    localStorage.setItem("hervas_user", JSON.stringify(currentUser));
    location.href = "/Profile/Index";
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem("hervas_user");
    location.href = "/Home/Index";
}

function switchProfileTab(tabName) {
    const tabs = ["transactions", "settings", "manager", "messages", "adminRoles"];
    tabs.forEach(t => {
        const pane = document.getElementById(`tabContent${t.charAt(0).toUpperCase() + t.slice(1)}`);
        const btn = document.getElementById(`tabBtn${t.charAt(0).toUpperCase() + t.slice(1)}`);
        if (pane) pane.classList.add("hidden");
        if (btn) btn.classList.remove("active");
    });

    const activePane = document.getElementById(`tabContent${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`);
    const activeBtn = document.getElementById(`tabBtn${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`);
    if (activePane) activePane.classList.remove("hidden");
    if (activeBtn) activeBtn.classList.add("active");
}

function applyFilters() {
    const type = document.getElementById("filterType") ? document.getElementById("filterType").value : "all";
    const gender = document.getElementById("filterGender") ? document.getElementById("filterGender").value : "all";
    const isStaff = currentUser && (currentUser.role === "Admin" || currentUser.role === "Manager");

    filteredAnimals = animalsData.filter(animal => {
        if (!isStaff && animal.status === AnimalStatus.Inactive) return false;
        if (type !== "all" && animal.type !== type) return false;
        if (gender !== "all" && animal.gender !== gender) return false;
        return true;
    });

    currentPage = 1;
    renderAnimalGrid();
}

function resetFilters() {
    if (document.getElementById("filterType")) document.getElementById("filterType").value = "all";
    if (document.getElementById("filterGender")) document.getElementById("filterGender").value = "all";
    applyFilters();
}

function renderAnimalGrid() {
    const grid = document.getElementById("animalGrid");
    if (!grid) return;
    grid.innerHTML = "";

    const start = (currentPage - 1) * itemsPerPage;
    const pageItems = filteredAnimals.slice(start, start + itemsPerPage);

    if (pageItems.length === 0) {
        grid.innerHTML = `<p style="grid-column: span 3; text-align: center; color: #777; padding: 40px;">Žádné zvíře neodpovídá zadaným filtrům.</p>`;
        renderPagination(0);
        return;
    }

    const isStaff = currentUser && (currentUser.role === "Manager" || currentUser.role === "Admin");

    pageItems.forEach(animal => {
        const card = document.createElement("article");
        card.className = "animal-card";
        card.onclick = () => {
            localStorage.setItem("hervas_current_animal", animal.id);
            location.href = `/Animal/Details/${animal.id}`;
        };

        let badgeClass = animal.status === AnimalStatus.Active ? "badge-active" : "badge-deactivated";
        card.innerHTML = `
      <div class="animal-image" style="background-image: url('${animal.image}');"></div>
      <div class="card-body">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h2>${animal.name}</h2>
          <span class="badge ${badgeClass}">${animal.status}</span>
        </div>
        <p>${animal.type} · ${animal.gender} · ${formatAge(animal.age)}</p>
        <div class="card-actions-row">
          <span style="color:#555; font-size:12px; font-weight:bold;">DETAIL →</span>
          ${isStaff ? `
            <div style="display:flex; gap:4px;" onclick="event.stopPropagation();">
              <button onclick="openEditAnimalModal(${animal.id})" style="background:#2a7b4c; color:white; border:0; padding:4px 8px; font-size:11px; cursor:pointer;">✏️ UPRAVIT</button>
              <button onclick="toggleAnimalStatus(${animal.id})" style="background:#444; color:white; border:0; padding:4px 8px; font-size:11px; cursor:pointer;">${animal.status === AnimalStatus.Active ? 'DEAKTIVOVAT' : 'AKTIVOVAT'}</button>
              <button class="delete-animal-btn-card" onclick="deleteAnimalDirect(event, ${animal.id})">🗑️</button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
        grid.appendChild(card);
    });

    renderPagination(Math.ceil(filteredAnimals.length / itemsPerPage));
}

function renderPagination(totalPages) {
    const container = document.getElementById("paginationControls");
    if (!container) return;
    container.innerHTML = "";

    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = `Strana ${i}`;
        if (i === currentPage) btn.classList.add("active");
        btn.onclick = () => {
            currentPage = i;
            renderAnimalGrid();
            window.scrollTo({ top: 150, behavior: "smooth" });
        };
        container.appendChild(btn);
    }
}

function toggleAnimalStatus(id) {
    const animal = animalsData.find(a => a.id === id);
    if (animal) {
        animal.status = animal.status === AnimalStatus.Active ? AnimalStatus.Inactive : AnimalStatus.Active;
        saveAnimals();
        applyFilters();
    }
}

function deleteAnimalDirect(event, id) {
    event.stopPropagation();
    const animal = animalsData.find(a => a.id === id);
    if (confirm(`Opravdu chcete smazat zvíře "${animal ? animal.name : ''}"?`)) {
        animalsData = animalsData.filter(a => a.id !== id);
        saveAnimals();
        applyFilters();
    }
}

function loadAnimalDetail() {
    const animal = animalsData.find(a => a.id === currentAnimalId);
    if (!animal) return;

    document.getElementById("detailName").textContent = animal.name;
    document.getElementById("detailTypeGender").textContent = `${animal.type.toUpperCase()} · ${animal.gender.toUpperCase()} · ${formatAge(animal.age).toUpperCase()}`;
    document.getElementById("detailIntro").textContent = animal.intro;
    document.getElementById("detailText").textContent = animal.text;
    document.getElementById("detailCare").textContent = animal.care;
    document.getElementById("detailLocation").textContent = animal.location;
    document.getElementById("detailPhoto").style.backgroundImage = `url('${animal.image}')`;

    const badge = document.getElementById("detailStatusBadge");
    badge.textContent = animal.status;
    badge.className = `badge ${animal.status === AnimalStatus.Active ? 'badge-active' : 'badge-deactivated'}`;

    const btnReal = document.getElementById("btnRealAdoption");
    const btnVirtual = document.getElementById("btnVirtualAdoption");
    const btnsContainer = document.getElementById("adoptionButtonsContainer");
    const notice = document.getElementById("adoptionUnavailableNotice");

    if (animal.status === AnimalStatus.Active) {
        btnsContainer.classList.remove("hidden");
        notice.classList.add("hidden");
        if (!animal.adoptable) btnReal.classList.add("hidden");
        else btnReal.classList.remove("hidden");
    } else {
        btnsContainer.classList.add("hidden");
        notice.classList.remove("hidden");
    }

    const isStaff = currentUser && (currentUser.role === "Manager" || currentUser.role === "Admin");
    if (isStaff) {
        const staffActions = document.getElementById("detailStaffActions");
        if (staffActions) {
            staffActions.classList.remove("hidden");
            staffActions.innerHTML = `
        <button onclick="openEditAnimalModal(${animal.id})" style="border:0; background:#2a7b4c; color:white; padding:11px 16px; font:700 14px Oswald, sans-serif; cursor:pointer;">UPRAVIT</button>
        <button id="btnToggleStatusDetail" onclick="toggleAnimalStatusFromDetail()" style="border:0; background:#555; color:white; padding:11px 16px; font:700 14px Oswald, sans-serif; cursor:pointer;">${animal.status === AnimalStatus.Active ? 'DEAKTIVOVAT ZVÍŘE' : 'AKTIVOVAT ZVÍŘE'}</button>
        <button onclick="deleteAnimalFromDetail()" style="border:0; background:#b83232; color:white; padding:11px 16px; font:700 14px Oswald, sans-serif; cursor:pointer;">SMAZAT ZVÍŘE</button>
      `;
        }
    }
}

function toggleAnimalStatusFromDetail() {
    if (currentAnimalId) toggleAnimalStatus(currentAnimalId);
    loadAnimalDetail();
}

function deleteAnimalFromDetail() {
    if (!currentAnimalId) return;
    animalsData = animalsData.filter(a => a.id !== currentAnimalId);
    saveAnimals();
    location.href = "/Animal/Index";
}

function openEditAnimalModal(id) {
    const animal = animalsData.find(a => a.id === id);
    if (!animal) return;

    const existingModal = document.getElementById("editAnimalModal");
    if (existingModal) existingModal.remove();

    const optionsLocations = locationsData.map(l => `<option value="${l}" ${l === animal.location ? 'selected' : ''}>${l}</option>`).join('');

    const modalHtml = `
    <div class="modal show" id="editAnimalModal">
      <div class="modal-box" style="text-align:left; width:min(550px, 100%); max-height:90vh; overflow-y:auto;">
        <button class="close" onclick="document.getElementById('editAnimalModal').remove()">×</button>
        <h2>ÚPRAVA ZVÍŘETE: ${animal.name}</h2>
        <form onsubmit="handleSaveEditedAnimal(event, ${animal.id})" style="display:flex; flex-direction:column; gap:8px;">
          <label style="font-size:12px; font-weight:bold;">Jméno:</label>
          <input type="text" id="editName" value="${animal.name}" required style="padding:8px; border:1px solid #ccc;">
          
          <label style="font-size:12px; font-weight:bold;">Druh:</label>
          <select id="editType" style="padding:8px; border:1px solid #ccc;">
            <option value="Kočka" ${animal.type === 'Kočka' ? 'selected' : ''}>Kočka</option>
            <option value="Pes" ${animal.type === 'Pes' ? 'selected' : ''}>Pes</option>
            <option value="Jine" ${animal.type === 'Jine' ? 'selected' : ''}>Jiné</option>
          </select>

          <label style="font-size:12px; font-weight:bold;">Pohlaví:</label>
          <select id="editGender" style="padding:8px; border:1px solid #ccc;">
            <option value="Samec" ${animal.gender === 'Samec' ? 'selected' : ''}>Samec</option>
            <option value="Samice" ${animal.gender === 'Samice' ? 'selected' : ''}>Samice</option>
            <option value="Jiné" ${animal.gender === 'Jiné' ? 'selected' : ''}>Jiné</option>
          </select>

          <label style="font-size:12px; font-weight:bold;">Věk (roky):</label>
          <input type="number" id="editAge" value="${animal.age}" min="0" required style="padding:8px; border:1px solid #ccc;">

          <label style="font-size:12px; font-weight:bold;">Možnost reálné adopce:</label>
          <select id="editAdoptable" style="padding:8px; border:1px solid #ccc;">
            <option value="true" ${animal.adoptable ? 'selected' : ''}>Ano (Reálná i virtuální)</option>
            <option value="false" ${!animal.adoptable ? 'selected' : ''}>Ne (Pouze virtuální)</option>
          </select>

          <label style="font-size:12px; font-weight:bold;">Obrázek:</label>
          <input type="file" id="editImageFile" accept="image/*" onchange="previewFileImage(event, 'editImagePreview')" style="padding:4px;">
          <input type="hidden" id="editImagePath" value="${animal.image}">
          <div id="editImagePreview" style="font-size:11px; color:#555;">Aktuální obrázek je nastaven.</div>

          <label style="font-size:12px; font-weight:bold;">Krátký úvod:</label>
          <input type="text" id="editIntro" value="${animal.intro}" required style="padding:8px; border:1px solid #ccc;">

          <label style="font-size:12px; font-weight:bold;">Detailní příběh:</label>
          <textarea id="editText" required style="padding:8px; border:1px solid #ccc; height:60px;">${animal.text}</textarea>

          <label style="font-size:12px; font-weight:bold;">Péče / Potřeby:</label>
          <input type="text" id="editCare" value="${animal.care}" required style="padding:8px; border:1px solid #ccc;">

          <label style="font-size:12px; font-weight:bold;">Lokalita:</label>
          <select id="editLocation" style="padding:8px; border:1px solid #ccc;">${optionsLocations}</select>

          <button type="submit" style="background:#2a7b4c; color:white; border:0; padding:10px; font-weight:bold; margin-top:10px; cursor:pointer;">ULOŽIT ZMĚNY</button>
        </form>
      </div>
    </div>
  `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function previewFileImage(event, previewId) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("editImagePath").value = e.target.result;
            const previewEl = document.getElementById(previewId);
            if (previewEl) {
                previewEl.textContent = "Nový obrázek úspěšně připraven k uložení!";
                previewEl.style.color = "#2a7b4c";
                previewEl.style.fontWeight = "bold";
            }
        };
        reader.readAsDataURL(file);
    }
}

function handleSaveEditedAnimal(e, id) {
    e.preventDefault();
    const animal = animalsData.find(a => a.id === id);
    if (!animal) return;

    animal.name = document.getElementById("editName").value;
    animal.type = document.getElementById("editType").value;
    animal.gender = document.getElementById("editGender").value;
    animal.age = parseInt(document.getElementById("editAge").value);
    animal.adoptable = document.getElementById("editAdoptable").value === "true";
    animal.image = document.getElementById("editImagePath").value;
    animal.intro = document.getElementById("editIntro").value;
    animal.text = document.getElementById("editText").value;
    animal.care = document.getElementById("editCare").value;
    animal.location = document.getElementById("editLocation").value;

    saveAnimals();
    document.getElementById("editAnimalModal").remove();
    alert("Informace o zvířeti byly úspěšně aktualizovány.");

    if (document.getElementById("animalGrid")) applyFilters();
    if (document.getElementById("detailName")) loadAnimalDetail();
}

function openVirtualAdoptionModal() {
    if (!currentUser) {
        alert("Pro provedení příspěvku nebo adopce musíte být přihlášeni!");
        location.href = "/Account/Login";
        return;
    }
    const animal = animalsData.find(a => a.id === currentAnimalId);
    document.getElementById("adoptText").textContent = `Chcete podpořit zvíře ${animal ? animal.name : 'HERVAS'}? Zvolte částku:`;
    document.getElementById("adoptionModal").classList.add("show");
}

function closeAdoptionModal() { document.getElementById("adoptionModal").classList.remove("show"); }
function chooseAmount(amount) { closeAdoptionModal(); openPaymentModal(amount); }

function generalAdoption(amount = null) {
    if (!currentUser) {
        alert("Pro odeslání platby nebo příspěvku se musíte nejdříve přihlásit.");
        location.href = "/Account/Login";
        return;
    }
    currentAnimalId = null;
    openPaymentModal(amount);
}

function submitCustomGeneralAdoption() {
    if (!currentUser) {
        alert("Pro odeslání platby nebo příspěvku se musíte nejdříve přihlásit.");
        location.href = "/Account/Login";
        return;
    }
    const input = document.getElementById("customGeneralAmountInput");
    if (!input) return;
    const val = parseInt(input.value);
    if (val && val > 0) {
        generalAdoption(val);
    } else {
        alert("Zadejte platnou částku v Kč.");
    }
}

function openPaymentModal(presetAmount = null) {
    if (!currentUser) {
        alert("Pro odeslání platby se musíte nejdříve přihlásit.");
        location.href = "/Account/Login";
        return;
    }

    const animal = animalsData.find(a => a.id === currentAnimalId);
    const purpose = animal ? `Virtuální adopce: ${animal.name}` : `Obecný příspěvek azylu HERVAS`;
    const existingModal = document.getElementById("dynamicPayModal");
    if (existingModal) existingModal.remove();

    const modalHtml = `
    <div class="modal show" id="dynamicPayModal">
      <div class="modal-box" style="text-align:left; width:min(500px, 100%);">
        <button class="close" onclick="document.getElementById('dynamicPayModal').remove()">×</button>
        <h2>PLATBA PŘÍSPĚVKU / DARU</h2>
        <p style="font-size:13px; color:#666; margin-bottom:12px;">Účel: <strong>${purpose}</strong></p>
        <p style="font-size:13px; background:#eee; padding:8px;">Přihlášen jako: <strong>${currentUser.name}</strong> (${currentUser.email})</p>
        <form onsubmit="handlePaymentSubmit(event, '${purpose}')" style="display:flex; flex-direction:column; gap:10px;">
          <label style="font-size:12px; font-weight:bold;">Částka v Kč:</label>
          <input type="number" id="payCustomAmount" value="${presetAmount || 200}" min="1" required style="padding:10px; border:1px solid #ccc; font-size:16px; font-weight:bold;">
          <label style="font-size:12px; font-weight:bold;">Typ příspěvku:</label>
          <select id="payType" style="padding:9px; border:1px solid #ccc;"><option value="Jednorázový příspěvek">Jednorázový</option><option value="Měsíční příspěvek">Měsíční</option></select>
          <label style="font-size:12px; font-weight:bold;">Platební metoda:</label>
          <select id="payMethod" style="padding:9px; border:1px solid #ccc;"><option value="Platební kartou">Kartou online</option><option value="Osobně na pobočce">Osobně na pobočce</option></select>
          <textarea id="payMessage" placeholder="Vzkaz pro azyl..." style="padding:10px; border:1px solid #ccc; height:60px;"></textarea>
          <button type="submit" style="background:#2a7b4c; color:white; border:0; padding:12px; font-weight:bold; cursor:pointer;">POTVRDIT A ZAPLATIT</button>
        </form>
      </div>
    </div>
  `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function handlePaymentSubmit(e, purpose) {
    e.preventDefault();
    const amount = parseInt(document.getElementById("payCustomAmount").value);
    let initialStatus = amount >= 10000 ? RequestStatus.Processing : PaymentStatus.Success;

    requestsData.push({
        id: Date.now(), userEmail: currentUser.email, userName: currentUser.name, animalName: purpose,
        type: document.getElementById("payType").value,
        motivation: `Částka: ${amount} Kč | Metoda: ${document.getElementById("payMethod").value} | Zpráva: "${document.getElementById("payMessage").value}"`,
        status: initialStatus, date: new Date().toISOString().split('T')[0]
    });
    saveRequests();
    document.getElementById("dynamicPayModal").remove();
    alert("Platba byla úspěšně zaznamenána. Děkujeme!");
}

function openRealAdoptionModal() {
    if (!currentUser) { alert("Pro podání žádosti se přihlaste."); location.href = "/Account/Login"; return; }
    const animal = animalsData.find(a => a.id === currentAnimalId);
    document.getElementById("realAdoptText").textContent = `Podáváte žádost o reálnou adopci zvířete ${animal.name}.`;
    document.getElementById("realAdoptionModal").classList.add("show");
}
function closeRealAdoptionModal() { document.getElementById("realAdoptionModal").classList.remove("show"); }

function submitRealAdoption(e) {
    e.preventDefault();
    if (!currentUser) return;
    const animal = animalsData.find(a => a.id === currentAnimalId);
    if (!animal) return;

    const existingRequest = requestsData.find(r =>
        r.userEmail === currentUser.email &&
        r.animalName === animal.name &&
        r.type === "Reálná adopce" &&
        (r.status === RequestStatus.Processing || r.status === RequestStatus.Accepted)
    );

    if (existingRequest) {
        alert(`Na zvíře ${animal.name} již máš aktivní nebo schválenou žádost o reálnou adopci!`);
        closeRealAdoptionModal();
        return;
    }

    requestsData.push({
        id: Date.now(), userEmail: currentUser.email, userName: currentUser.name, animalName: animal.name,
        type: "Reálná adopce", motivation: document.getElementById("realAdoptMotivation").value,
        status: RequestStatus.Processing, date: new Date().toISOString().split('T')[0]
    });
    saveRequests();
    closeRealAdoptionModal();
    document.getElementById("realAdoptMotivation").value = "";
    alert("Žádost o reálnou adopci byla úspěšně odeslána ke schválení.");
}

function renderUserTransactions() {
    if (!currentUser) return;
    document.getElementById("profileName").textContent = currentUser.name;
    document.getElementById("profileEmail").textContent = currentUser.email;
    document.getElementById("profileRoleBadge").textContent = `ROLE: ${currentUser.role.toUpperCase()}`;

    const container = document.getElementById("userTransactionsList");
    let myRequests = requestsData.filter(r => r.userEmail === currentUser.email);
    const typeFilter = document.getElementById("filterTxType") ? document.getElementById("filterTxType").value : "all";
    const sortFilter = document.getElementById("filterTxSort") ? document.getElementById("filterTxSort").value : "oldest";

    if (typeFilter === "payment") myRequests = myRequests.filter(r => r.type.includes("příspěvek"));
    else if (typeFilter === "adoption") myRequests = myRequests.filter(r => r.type.includes("adopce"));

    myRequests.sort((a, b) => sortFilter === "newest" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date));

    if (container) {
        container.innerHTML = myRequests.length === 0 ? "<p style='color:#777; background:#fff; padding:20px;'>Žádné záznamy.</p>" :
            myRequests.map(r => {
                const canRefund = r.status === PaymentStatus.Success;
                const isRefundRequested = r.status === "RefundRequested";

                return `
          <div class="tx-card">
            <div>
              <strong>${r.animalName}</strong> (${r.type})<br>
              <small>${r.date} | ${r.motivation}</small><br>
              <small>Stav: <strong>${r.status}</strong></small>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="badge ${r.status === PaymentStatus.Success || r.status === RequestStatus.Accepted ? 'badge-active' : 'badge-deactivated'}">${r.status}</span>
              ${canRefund ? `<button onclick="requestRefund(${r.id})" style="background:#b83232; color:white; border:0; padding:6px 10px; font-size:12px; cursor:pointer;">ŽÁDOST O REFUNDACI</button>` : ''}
              ${isRefundRequested ? `<span style="font-size:12px; color:#b83232; font-weight:bold;">Čeká na refundaci</span>` : ''}
            </div>
          </div>
        `;
            }).join('');
    }

    if (currentUser.role === "Manager" || currentUser.role === "Admin") {
        document.getElementById("tabBtnManager").classList.remove("hidden");
        document.getElementById("tabBtnMessages").classList.remove("hidden");
        renderManagerRequests();
        renderContactMessages();
    }
    if (currentUser.role === "Admin") {
        document.getElementById("tabBtnAdminRoles").classList.remove("hidden");
        document.getElementById("adminLocationSection").classList.remove("hidden");
        renderAdminUsersList();
        renderAdminLocations();
    }
}

function requestRefund(id) {
    const req = requestsData.find(r => r.id === id);
    if (req && confirm("Opravdu chcete požádat o vrácení peněz (refundaci)?")) {
        req.status = "RefundRequested";
        saveRequests();
        renderUserTransactions();
        alert("Žádost o refundaci byla odeslána manažerovi.");
    }
}

function renderManagerRequests() {
    const container = document.getElementById("managerRequestsList");
    if (!container) return;

    const typeFilter = document.getElementById("filterManagerType") ? document.getElementById("filterManagerType").value : "all";
    const statusFilter = document.getElementById("filterManagerStatus") ? document.getElementById("filterManagerStatus").value : "all";

    let list = [...requestsData];

    if (typeFilter === "adoption") list = list.filter(r => r.type.includes("adopce"));
    if (typeFilter === "payment") list = list.filter(r => r.type.includes("příspěvek"));

    if (statusFilter === "Processing") list = list.filter(r => r.status === RequestStatus.Processing || r.status === "RefundRequested");
    if (statusFilter === "Accepted") list = list.filter(r => r.status === RequestStatus.Accepted || r.status === PaymentStatus.Success);
    if (statusFilter === "Rejected") list = list.filter(r => r.status === RequestStatus.Rejected || r.status === PaymentStatus.Refunded);

    if (list.length === 0) {
        container.innerHTML = `<p style="color:#777; background:#fff; padding:15px;">Žádné položky neodpovídají zvolenému filtru.</p>`;
        return;
    }

    container.innerHTML = list.map(r => {
        const isRefundReq = r.status === "RefundRequested";
        const isLocked = r.status !== RequestStatus.Processing && !isRefundReq;

        return `
      <div class="request-card" style="${isLocked ? 'background:#f2f2f2; opacity:0.85;' : ''}">
        <div>
          <strong>${r.userName}</strong> (${r.userEmail}) → <strong>${r.animalName}</strong><br>
          <small>Typ: ${r.type} | ${r.motivation}</small><br>
          <small>Stav: <strong>${r.status}</strong></small>
        </div>
        <div style="display:flex; gap:6px;">
          ${isRefundReq ? `
            <button onclick="changeRequestStatus(${r.id}, '${PaymentStatus.Refunded}')" style="background:#b83232; color:white; border:0; padding:6px 10px; cursor:pointer;">PROVÉST REFUNDACI</button>
            <button onclick="changeRequestStatus(${r.id}, '${PaymentStatus.Success}')" style="background:#555; color:white; border:0; padding:6px 10px; cursor:pointer;">ZAMÍTNOUT REFUNDACI</button>
          ` : (!isLocked ? `
            <button onclick="changeRequestStatus(${r.id}, '${RequestStatus.Accepted}')" style="background:#2a7b4c; color:white; border:0; padding:6px 10px; cursor:pointer;">SCHVÁLIT</button>
            <button onclick="changeRequestStatus(${r.id}, '${RequestStatus.Rejected}')" style="background:#b83232; color:white; border:0; padding:6px 10px; cursor:pointer;">ZAMÍTNOUT</button>
          ` : '<span style="color:#666; font-size:12px; font-weight:bold; padding:6px;">🔒 VYŘÍZENO</span>')}
        </div>
      </div>
    `;
    }).join('');
}

function changeRequestStatus(id, newStatus) {
    const req = requestsData.find(r => r.id === id);
    if (!req) return;
    req.status = newStatus;
    if (req.type === "Reálná adopce" && newStatus === RequestStatus.Accepted) {
        const animal = animalsData.find(a => a.name === req.animalName);
        if (animal) { animal.status = AnimalStatus.Inactive; saveAnimals(); }
    }
    saveRequests();
    renderManagerRequests();
}

function handleContactMessageSubmit(e) {
    e.preventDefault();
    const name = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    const text = document.getElementById("contactText").value;

    messagesData.push({
        id: Date.now(),
        name: name,
        email: email,
        text: text,
        date: new Date().toISOString().split('T')[0]
    });

    localStorage.setItem("hervas_messages", JSON.stringify(messagesData));
    alert("Zpráva byla úspěšně odeslána a uložena do systému pro správce!");
    e.target.reset();
}

function renderContactMessages() {
    const container = document.getElementById("adminMessagesList");
    if (!container) return;

    messagesData = JSON.parse(localStorage.getItem("hervas_messages")) || [];

    if (messagesData.length === 0) {
        container.innerHTML = `<p style="color:#777; background:#fff; padding:15px;">Zatím nejsou uloženy žádné zprávy z formuláře.</p>`;
        return;
    }

    container.innerHTML = messagesData.map(m => `
    <div class="request-card">
      <div>
        <strong>${m.name}</strong> (${m.email})<br>
        <small>Datum: ${m.date}</small>
        <p style="margin: 8px 0 0 0; color: #333;">${m.text}</p>
      </div>
      <div>
        <button onclick="deleteContactMessage(${m.id})" style="background:#b83232; color:white; border:0; padding:6px 10px; cursor:pointer; font-size:12px;">SMAZAT</button>
      </div>
    </div>
  `).join('');
}

function deleteContactMessage(id) {
    messagesData = messagesData.filter(m => m.id !== id);
    localStorage.setItem("hervas_messages", JSON.stringify(messagesData));
    renderContactMessages();
}

function renderAdminUsersList() {
    const container = document.getElementById("adminUsersList");
    if (!container) return;
    container.innerHTML = usersDatabase.map(u => {
        const isSelf = currentUser && currentUser.email === u.email;
        return `
      <div class="user-role-card">
        <div><strong>${u.name}</strong> (${u.email})<br><small>Role: <strong>${u.role}</strong></small></div>
        <div>${isSelf ? '<small>Nelze změnit vlastní roli</small>' : `
          <button onclick="changeUserRole('${u.email}', 'Uživatel')" style="background:#777; color:white; border:0; padding:6px;">Uživatel</button>
          <button onclick="changeUserRole('${u.email}', 'Manager')" style="background:#2a7b4c; color:white; border:0; padding:6px;">Manažer</button>
          <button onclick="changeUserRole('${u.email}', 'Admin')" style="background:#111; color:white; border:0; padding:6px;">Admin</button>
        `}</div>
      </div>
    `;
    }).join('');
}

function changeUserRole(email, newRole) {
    if (currentUser && currentUser.email === email) { alert("Nemůžeš si odebrat roli admina."); return; }
    const u = usersDatabase.find(x => x.email === email);
    if (u) { u.role = newRole; saveUsersDb(); renderAdminUsersList(); }
}

function renderLocationSelects() {
    const sel = document.getElementById("addLocationSelect");
    if (sel) sel.innerHTML = locationsData.map(l => `<option value="${l}">${l}</option>`).join('');
}

function renderAdminLocations() {
    const container = document.getElementById("adminLocationsList");
    if (container) {
        container.innerHTML = locationsData.map((l, index) => `
      <span style="background:#e0e0e0; padding:6px 12px; border-radius:4px; font-size:13px; font-weight:bold; display:inline-flex; align-items:center; gap:8px;">
        📍 ${l} 
        <button onclick="deleteLocation(${index})" style="background:#b83232; color:white; border:0; border-radius:50%; width:18px; height:18px; font-size:11px; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; padding:0;" title="Smazat lokalitu">×</button>
      </span>
    `).join('');
    }
}

function deleteLocation(index) {
    const locName = locationsData[index];
    if (confirm(`Opravdu chcete smazat lokalitu "${locName}"?`)) {
        locationsData.splice(index, 1);
        localStorage.setItem("hervas_locations", JSON.stringify(locationsData));
        renderLocationSelects();
        renderAdminLocations();
    }
}

function handleAddLocation(e) {
    e.preventDefault();
    const val = document.getElementById("newLocationInput").value.trim();
    if (val && !locationsData.includes(val)) {
        locationsData.push(val);
        localStorage.setItem("hervas_locations", JSON.stringify(locationsData));
        document.getElementById("newLocationInput").value = "";
        renderLocationSelects(); renderAdminLocations();
        alert("Lokalita přidána.");
    }
}

function handleAddAnimal(e) {
    e.preventDefault();
    const fileInput = document.getElementById("addImgFile");
    const animalName = document.getElementById("addName").value.trim();
    const animalType = document.getElementById("addType").value;
    const folderName = animalType === "Kočka" ? "Kocka" : (animalType === "Pes" ? "Pes" : "Jine");

    let defaultImagePath = `/img/${folderName}/${animalName}001.png`;

    if (fileInput && fileInput.files[0]) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (uploadEvent) {
            const base64Image = uploadEvent.target.result;
            saveNewAnimalRecord(animalName, animalType, base64Image, e.target);
        };
        reader.readAsDataURL(file);
    } else {
        saveNewAnimalRecord(animalName, animalType, defaultImagePath, e.target);
    }
}

function saveNewAnimalRecord(animalName, animalType, imagePath, formElement) {
    animalsData.push({
        id: Date.now(),
        name: animalName,
        type: animalType,
        gender: document.getElementById("addGender").value,
        age: parseInt(document.getElementById("addAge").value),
        status: document.getElementById("addStatus").value,
        adoptable: document.getElementById("addAdoptable").value === "true",
        image: imagePath,
        intro: document.getElementById("addIntro").value,
        text: document.getElementById("addText").value,
        care: document.getElementById("addCare").value,
        location: document.getElementById("addLocationSelect").value
    });

    saveAnimals();
    alert("Zvíře bylo úspěšně přidáno do databáze i s obrázkem!");
    formElement.reset();
    if (document.getElementById("animalGrid")) applyFilters();
}

function handleUpdateProfile(e) {
    e.preventDefault();
    const newName = document.getElementById("editUserName").value.trim();
    if (newName && currentUser) {
        currentUser.name = newName;
        const dbUser = usersDatabase.find(u => u.email === currentUser.email);
        if (dbUser) dbUser.name = newName;
        saveUsersDb();
        localStorage.setItem("hervas_user", JSON.stringify(currentUser));
        renderUserTransactions();
        alert("Jméno aktualizováno.");
    }
}

function deleteUserAccount() {
    if (confirm("Opravdu chcete smazat účet?")) {
        usersDatabase = usersDatabase.filter(u => u.email !== currentUser.email);
        saveUsersDb();
        handleLogout();
    }
}

function saveAnimals() { localStorage.setItem("hervas_animals", JSON.stringify(animalsData)); }
function saveUsersDb() { localStorage.setItem("hervas_users_db", JSON.stringify(usersDatabase)); }
function saveRequests() { localStorage.setItem("hervas_requests", JSON.stringify(requestsData)); }