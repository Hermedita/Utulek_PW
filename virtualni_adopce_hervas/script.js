const PaymentStatus = { Processing: "Processing", Success: "Success", Failure: "Failure", Refunded: "Refunded" };
const RequestStatus = { Processing: "Processing", Accepted: "Accepted", Rejected: "Rejected", Cancelled: "Cancelled" };
const AnimalStatus = { Inactive: "Inactive", Active: "Active" };

const CURRENT_DB_VERSION = "6.1";
const savedVersion = localStorage.getItem("hervas_db_version");

let locationsData = JSON.parse(localStorage.getItem("hervas_locations")) || [
  "Dočasná péče HERVAS", "Azyl HERVAS", "Záchranný areál HERVAS", "Veterinární stanice"
];

let defaultAnimals = [
  { id: 1, name: "Mína", type: "Kočka", gender: "Samice", age: 7, status: AnimalStatus.Active, adoptable: true, image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80", intro: "Mína je klidná kočka, která potřebuje bezpečí a péči.", text: "Do péče HERVAS se dostala po náročné rekonvalescenci.", care: "Krmivo a léčba.", location: "Dočasná péče HERVAS" },
  { id: 2, name: "Max", type: "Pes", gender: "Samec", age: 9, status: AnimalStatus.Active, adoptable: true, image: "https://cdn.pixabay.com/photo/2022/04/04/19/29/dog-7112233_1280.jpg", intro: "Přátelský pes, který má rád lidi.", text: "Užívá si klidné stárnutí a procházky.", care: "Veterinární kontroly a léky.", location: "Dočasná péče HERVAS" },
  { id: 3, name: "Karim", type: "Ostatní", gender: "Samec", age: 12, status: AnimalStatus.Active, adoptable: false, image: "https://cdn.pixabay.com/photo/2024/11/03/09/29/bird-9170927_1280.jpg", intro: "Klidný papoušek vyžadující speciální péči.", text: "Získal bezpečný domov v našem areálu.", care: "Krmení a údržba voliéry.", location: "Záchranný areál HERVAS" },
  { id: 4, name: "Jumbo", type: "Ostatní", gender: "Samec", age: 15, status: AnimalStatus.Active, adoptable: false, image: "https://cdn.pixabay.com/photo/2013/05/29/22/25/elephant-114543_1280.jpg", intro: "Impozantní a moudrý slon africký.", text: "Naše největší svěřenec vyžadující speciální velkoobjemovou péči a výběh.", care: "Seno, zelenina, jádro a pastva.", location: "Záchranný areál HERVAS" },
  { id: 5, name: "Sahib", type: "Ostatní", gender: "Samec", age: 8, status: AnimalStatus.Active, adoptable: true, image: "https://cdn.pixabay.com/photo/2016/08/23/20/16/camel-1615446_1280.jpg", intro: "Klidný pouštní velbloud.", text: "Zvyklý na venkovní ustájení a pravidelné procházky.", care: "Seno, jádro a pastva.", location: "Záchranný areál HERVAS" },
  { id: 6, name: "Líza", type: "Kočka", gender: "Samice", age: 1, status: AnimalStatus.Active, adoptable: true, image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=600&q=80", intro: "Hravé kotě zachráněné z ulice.", text: "Velmi mazlivá a zvědavá kočička.", care: "Očkování a krmivo.", location: "Dočasná péče HERVAS" },
  { id: 7, name: "Oskar", type: "Pes", gender: "Samec", age: 11, status: AnimalStatus.Active, adoptable: true, image: "https://cdn.pixabay.com/photo/2019/04/13/18/05/dog-wash-4125187_1280.jpg", intro: "Starší pes hledající klidné dožití.", text: "Oskar miluje spánek na sluníčku.", care: "Kloubní výživa.", location: "Azyl HERVAS" },
  { id: 8, name: "Kiki", type: "Ostatní", gender: "Samice", age: 3, status: AnimalStatus.Inactive, adoptable: false, image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=600&q=80", intro: "Roztomilý králíček v léčení.", text: "Momentálně v karanténě.", care: "Speciální péče.", location: "Veterinární stanice" },
  { id: 9, name: "Bella", type: "Kočka", gender: "Samice", age: 5, status: AnimalStatus.Active, adoptable: true, image: "https://cdn.pixabay.com/photo/2020/03/23/08/45/cat-4959941_1280.jpg", intro: "Klidná kočka se zelenýma očima.", text: "Ráda odpočívá u okna.", care: "Krmivo a péče o srst.", location: "Azyl HERVAS" },
  { id: 10, name: "Bary", type: "Pes", gender: "Samec", age: 4, status: AnimalStatus.Active, adoptable: true, image: "https://cdn.pixabay.com/photo/2017/09/07/23/08/animal-2727056_1280.jpg", intro: "Věrný hlídač a společník.", text: "Skvělý pes na zahradu i k rodině.", care: "Kvalitní granule.", location: "Azyl HERVAS" },
  { id: 11, name: "Mourka", type: "Kočka", gender: "Samice", age: 3, status: AnimalStatus.Active, adoptable: true, image: "https://cdn.pixabay.com/photo/2018/05/13/21/42/cat-3398081_1280.jpg", intro: "Chytrá mourovatá kočka plná života.", text: "Zvyklá na pobyt v bytě.", care: "Základní péče.", location: "Dočasná péče HERVAS" },
  { id: 12, name: "Rex", type: "Pes", gender: "Samec", age: 8, status: AnimalStatus.Active, adoptable: true, image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80", intro: "Aktivní pes vyžadující pohyb.", text: "Učenlivý a poslušný parťák.", care: "Aktivní trénink a krmivo.", location: "Azyl HERVAS" },
  { id: 13, name: "Sisi", type: "Ostatní", gender: "Samice", age: 2, status: AnimalStatus.Active, adoptable: true, image: "https://cdn.pixabay.com/photo/2020/02/29/18/59/rabbit-4890861_1280.jpg", intro: "Roztomilý zakrslý králíček.", text: "Zachráněna z nevhodných podmínek.", care: "Seno a specializované krmivo.", location: "Dočasná péče HERVAS" },
  { id: 14, name: "Felix", type: "Kočka", gender: "Samec", age: 6, status: AnimalStatus.Active, adoptable: true, image: "https://cdn.pixabay.com/photo/2019/06/08/17/02/cat-4260536_1280.jpg", intro: "Černobílý elegantní kocour.", text: "Rád se mazlí a vyhledává lidskou společnost.", care: "Krmivo a česání.", location: "Azyl HERVAS" },
  { id: 15, name: "Ben", type: "Pes", gender: "Samec", age: 1, status: AnimalStatus.Active, adoptable: true, image: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=600&q=80", intro: "Mladý kříženec plný hravosti.", text: "Rychle se učí základním návykům.", care: "Krmivo pro mladé psy.", location: "Dočasná péče HERVAS" },
  { id: 16, name: "Rozárka", type: "Ostatní", gender: "Samice", age: 5, status: AnimalStatus.Active, adoptable: true, image: "https://cdn.pixabay.com/photo/2021/05/08/17/05/parrot-6238905_1280.jpg", intro: "Krasavec mezi papoušky.", text: "Péče v odborné stanici azylu.", care: "Ovoce a semena.", location: "Záchranný areál HERVAS" },
  { id: 17, name: "Charlie", type: "Pes", gender: "Samec", age: 5, status: AnimalStatus.Active, adoptable: true, image: "https://cdn.pixabay.com/photo/2017/07/11/14/10/happy-dog-2493688_1280.jpg", intro: "Přátelský světlý pes.", text: "Miluje vodu, procházky a míčky.", care: "Krmivo.", location: "Azyl HERVAS" },
  { id: 18, name: "Micka", type: "Kočka", gender: "Samice", age: 8, status: AnimalStatus.Active, adoptable: true, image: "https://cdn.pixabay.com/photo/2017/07/21/07/13/cat-2524884_1280.jpg", intro: "Rozvážná stříbrná kočka.", text: "Hledá klidný domov bez hlučných zvířat.", care: "Veterinární péče.", location: "Dočasná péče HERVAS" },
  { id: 19, name: "Toby", type: "Pes", gender: "Samec", age: 3, status: AnimalStatus.Active, adoptable: true, image: "https://cdn.pixabay.com/photo/2017/11/28/14/00/staffordshire-bull-terrier-2983742_1280.jpg", intro: "Malý terriér plný energie.", text: "Vhodný do bytu i k domku.", care: "Krmivo a pohyb.", location: "Azyl HERVAS" },
  { id: 20, name: "Sněhulka", type: "Kočka", gender: "Samice", age: 2, status: AnimalStatus.Active, adoptable: true, image: "https://cdn.pixabay.com/photo/2020/03/06/10/55/cat-4906764_1280.jpg", intro: "Čistě bílá kočka.", text: "Nalezenec, velmi přátelská.", care: "Krmivo a vyčesávání.", location: "Azyl HERVAS" },
  { id: 21, name: "Dasty", type: "Pes", gender: "Samec", age: 7, status: AnimalStatus.Active, adoptable: true, image: "https://cdn.pixabay.com/photo/2024/02/26/19/57/dog-8598827_1280.jpg", intro: "Klidný dlouhosrstý pes.", text: "Skvělý společník pro starší lidi.", care: "Péče o srst a procházky.", location: "Dočasná péče HERVAS" },
  { id: 22, name: "Blesk", type: "Ostatní", gender: "Samec", age: 4, status: AnimalStatus.Active, adoptable: true, image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=600&q=80", intro: "Zachráněný kůň v azylu.", text: "Potřebuje virtuální adopci pro ustájení.", care: "Seno, jádro a pastva.", location: "Záchranný areál HERVAS" },
  { id: 23, name: "Astra", type: "Kočka", gender: "Samice", age: 4, status: AnimalStatus.Active, adoptable: true, image: "https://cdn.pixabay.com/photo/2020/04/27/09/21/cat-5098930_1280.jpg", intro: "Zvědavá barevná kočka.", text: "Ráda zkoumá nové prostory.", care: "Krmivo.", location: "Azyl HERVAS" },
  { id: 24, name: "César", type: "Pes", gender: "Samec", age: 10, status: AnimalStatus.Active, adoptable: true, image: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=600&q=80", intro: "Moudrý starý ovčák.", text: "Hledá někoho, kdo mu dopřeje dospání.", care: "Kloubní výživa.", location: "Azyl HERVAS" },
  { id: 25, name: "Lola", type: "Kočka", gender: "Samice", age: 1, status: AnimalStatus.Active, adoptable: true, image: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=600&q=80", intro: "Mladá zrzavá kočička.", text: "Hravá, očkovaná a odčervená.", care: "Krmivo.", location: "Dočasná péče HERVAS" },
  { id: 26, name: "Rambo", type: "Pes", gender: "Samec", age: 5, status: AnimalStatus.Active, adoptable: true, image: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&w=600&q=80", intro: "Silný a věrný pes.", text: "Potřebuje důsledného majitele.", care: "Trénink a kvalitní strava.", location: "Azyl HERVAS" },
  { id: 27, name: "Píšťalka", type: "Ostatní", gender: "Samice", age: 3, status: AnimalStatus.Active, adoptable: true, image: "https://cdn.pixabay.com/photo/2017/03/06/23/48/cockatiel-2122876_1280.jpg", intro: "Krásná korela.", text: "Veselý a zpěvavý ptáček z dočasné péče.", care: "Krmení a péče.", location: "Dočasná péče HERVAS" }
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
let requestsData = JSON.parse(localStorage.getItem("hervas_requests")) || [
  { id: 101, userEmail: "jan@example.com", userName: "Jan Novák", animalName: "Mína", type: "Reálná adopce", motivation: "Mám velký dům se zahradou.", status: RequestStatus.Processing, date: "2026-10-01" }
];

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
    if (topLinks) topLinks.innerHTML = `Přihlášen: <strong>${currentUser.name}</strong> (${currentUser.role}) | <a href="profil.html">Profil</a> | <a href="#" onclick="handleLogout()">Odhlásit</a>`;
    if (navProfil) navProfil.classList.remove("hidden");
    if (navAuth) navAuth.classList.add("hidden");
  } else {
    if (topLinks) topLinks.innerHTML = `<a href="auth.html">Přihlášení / Registrace</a>`;
    if (navProfil) navProfil.classList.add("hidden");
    if (navAuth) navAuth.classList.remove("hidden");
  }
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  let user = usersDatabase.find(u => u.email === email);
  if (!user) {
    let role = "Uživatel";
    if (email === "admin@hervas.cz") role = "Admin";
    else if (email === "manager@hervas.cz") role = "Manager";
    user = { name: email.split('@')[0], email, role };
    usersDatabase.push(user);
    saveUsersDb();
  }
  currentUser = user;
  localStorage.setItem("hervas_user", JSON.stringify(currentUser));
  location.href = "profil.html";
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const confirmPassword = document.getElementById("regPasswordConfirm").value;

  if (password !== confirmPassword) { alert("Hesla se neshodují!"); return; }
  const newUser = { name, email, role: "Uživatel" };
  usersDatabase.push(newUser);
  saveUsersDb();
  currentUser = newUser;
  localStorage.setItem("hervas_user", JSON.stringify(currentUser));
  location.href = "profil.html";
}

function handleLogout() {
  currentUser = null;
  localStorage.removeItem("hervas_user");
  location.href = "index.html";
}

function switchProfileTab(tabName) {
  const tabs = ["transactions", "settings", "manager", "adminRoles"];
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
      location.href = "detail.html";
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
    document.getElementById("detailStaffActions").classList.remove("hidden");
    document.getElementById("btnToggleStatusDetail").textContent = animal.status === AnimalStatus.Active ? "DEAKTIVOVAT ZVÍŘE" : "AKTIVOVAT ZVÍŘE";
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
  location.href = "katalog.html";
}

function openVirtualAdoptionModal() {
  const animal = animalsData.find(a => a.id === currentAnimalId);
  document.getElementById("adoptText").textContent = `Chcete podpořit zvíře ${animal ? animal.name : 'HERVAS'}? Zvolte částku:`;
  document.getElementById("adoptionModal").classList.add("show");
}
function closeAdoptionModal() { document.getElementById("adoptionModal").classList.remove("show"); }
function chooseAmount(amount) { closeAdoptionModal(); openPaymentModal(amount); }
function generalAdoption(amount = null) { currentAnimalId = null; openPaymentModal(amount); }
function submitCustomGeneralAdoption() {
  const val = parseInt(document.getElementById("customGeneralAmountInput").value);
  if (val && val > 0) generalAdoption(val);
  else alert("Zadejte platnou částku v Kč.");
}

function openPaymentModal(presetAmount = null) {
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
        <form onsubmit="handlePaymentSubmit(event, '${purpose}')" style="display:flex; flex-direction:column; gap:10px;">
          <label style="font-size:12px; font-weight:bold;">Částka v Kč:</label>
          <input type="number" id="payCustomAmount" value="${presetAmount || 200}" min="1" required style="padding:10px; border:1px solid #ccc; font-size:16px; font-weight:bold;">
          ${!currentUser ? `
            <input type="text" id="payUserName" placeholder="Vaše jméno a příjmení" required style="padding:10px; border:1px solid #ccc;">
            <input type="email" id="payUserEmail" placeholder="Váš e-mail" required style="padding:10px; border:1px solid #ccc;">
          ` : `<p style="font-size:13px; background:#eee; padding:8px;">Přihlášen jako: <strong>${currentUser.name}</strong></p>`}
          <label style="font-size:12px; font-weight:bold;">Typ příspěvku:</label>
          <select id="payType" style="padding:9px; border:1px solid #ccc;"><option value="Jednorázový příspěvek">Jednorázový</option><option value="Měsíční příspěvek">Měsíční</option></select>
          <label style="font-size:12px; font-weight:bold;">Platební metoda:</label>
          <select id="payMethod" style="padding:9px; border:1px solid #ccc;"><option value="Platební kartou">Kartou online</option><option value="Osobně na pobočce">Osobně na pobočce</option></select>
          <textarea id="payMessage" placeholder="Vzkaz..." style="padding:10px; border:1px solid #ccc; height:60px;"></textarea>
          <button type="submit" style="background:#2a7b4c; color:white; border:0; padding:12px; font-weight:bold; cursor:pointer;">POTVRDIT A ZAPLATIT</button>
        </form>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// PO PLATBĚ UŽIVATELE NEHÁŽEME NA PROFIL – POUZE ZAVŘEME OKNO A UPOZORNÍME
function handlePaymentSubmit(e, purpose) {
  e.preventDefault();
  const amount = parseInt(document.getElementById("payCustomAmount").value);
  const email = currentUser ? currentUser.email : document.getElementById("payUserEmail").value;
  const name = currentUser ? currentUser.name : document.getElementById("payUserName").value;
  let initialStatus = amount >= 10000 ? RequestStatus.Processing : PaymentStatus.Success;

  requestsData.push({
    id: Date.now(), userEmail: email, userName: name, animalName: purpose,
    type: document.getElementById("payType").value,
    motivation: `Částka: ${amount} Kč | Metoda: ${document.getElementById("payMethod").value} | Zpráva: "${document.getElementById("payMessage").value}"`,
    status: initialStatus, date: new Date().toISOString().split('T')[0]
  });
  saveRequests();
  document.getElementById("dynamicPayModal").remove();
  alert("Platba byla úspěšně zaznamenána. Děkujeme!");
}

function openRealAdoptionModal() {
  if (!currentUser) { alert("Pro podání žádosti se přihlaste."); location.href = "auth.html"; return; }
  const animal = animalsData.find(a => a.id === currentAnimalId);
  document.getElementById("realAdoptText").textContent = `Podáváte žádost o reálnou adopci zvířete ${animal.name}.`;
  document.getElementById("realAdoptionModal").classList.add("show");
}
function closeRealAdoptionModal() { document.getElementById("realAdoptionModal").classList.remove("show"); }

// PO ADOPCI UŽIVATELE NEHÁŽEME NA PROFIL – POUZE ZAVŘEME MODÁL A ZOBRAZÍME HLÁŠKU
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
  document.getElementById("realAdoptMotivation").value = ""; // Vyčištění formuláře
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
    renderManagerRequests();
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
  if (container) container.innerHTML = locationsData.map(l => `<span style="background:#e0e0e0; padding:6px 12px; border-radius:4px; font-size:13px; font-weight:bold;">📍 ${l}</span>`).join('');
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
  animalsData.push({
    id: Date.now(), name: document.getElementById("addName").value, type: document.getElementById("addType").value,
    gender: document.getElementById("addGender").value, age: parseInt(document.getElementById("addAge").value),
    status: document.getElementById("addStatus").value, adoptable: document.getElementById("addAdoptable").value === "true",
    image: document.getElementById("addImage").value, intro: document.getElementById("addIntro").value,
    text: document.getElementById("addText").value, care: document.getElementById("addCare").value,
    location: document.getElementById("addLocationSelect").value
  });
  saveAnimals(); alert("Zvíře přidáno."); e.target.reset();
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