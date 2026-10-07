// VERZOVÁNÍ DATABÁZE 
const CURRENT_DB_VERSION = "3.2";
const savedVersion = localStorage.getItem("hervas_db_version");

// DATABÁZE ZVÍŘAT (27 zvířat se správnými druhy, popisy i fotkami)
let defaultAnimals = [
  // 1. STRANA
  { id: 1, name: "Mína", type: "Kočka", gender: "Samice", age: 7, status: "Active", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80", intro: "Mína je klidná kočka, která potřebuje bezpečí a péči.", text: "Do péče HERVAS se dostala po náročné rekonvalescenci.", care: "Krmivo a léčba.", location: "Dočasná péče HERVAS" },
  { id: 2, name: "Max", type: "Pes", gender: "Samec", age: 9, status: "Active", image: "https://cdn.pixabay.com/photo/2022/04/04/19/29/dog-7112233_1280.jpg", intro: "Přátelský pes, který má rád lidi.", text: "Užívá si klidné stárnutí a procházky.", care: "Veterinární kontroly a léky.", location: "Dočasná péče HERVAS" },
  { id: 3, name: "Karim", type: "Ostatní", gender: "Samec", age: 12, status: "Active", image: "https://cdn.pixabay.com/photo/2024/11/03/09/29/bird-9170927_1280.jpg", intro: "Klidný papoušek vyžadující speciální péči.", text: "Získal bezpečný domov v našem areálu.", care: "Krmení a údržba voliéry.", location: "Záchranný areál HERVAS" },
  { id: 4, name: "Jumbo", type: "Ostatní", gender: "Samec", age: 15, status: "Active", image: "https://cdn.pixabay.com/photo/2013/05/29/22/25/elephant-114543_1280.jpg", intro: "Impozantní a moudrý slon africký.", text: "Naše největší svěřenec vyžadující speciální velkoobjemovou péči a výběh.", care: "Seno, zelenina, jádro a pastva.", location: "Záchranný areál HERVAS" },
  { id: 5, name: "Sahib", type: "Ostatní", gender: "Samec", age: 8, status: "Active", image: "https://cdn.pixabay.com/photo/2016/08/23/20/16/camel-1615446_1280.jpg", intro: "Klidný pouštní velbloud.", text: "Zvyklý na venkovní ustájení a pravidelné procházky.", care: "Seno, jádro a pastva.", location: "Záchranný areál HERVAS" },{ id: 6, name: "Líza", type: "Kočka", gender: "Samice", age: 1, status: "Active", image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=600&q=80", intro: "Hravé kotě zachráněné z ulice.", text: "Velmi mazlivá a zvědavá kočička.", care: "Očkování a krmivo.", location: "Dočasná péče HERVAS" },
  { id: 7, name: "Oskar", type: "Pes", gender: "Samec", age: 11, status: "Active", image: "https://cdn.pixabay.com/photo/2019/04/13/18/05/dog-wash-4125187_1280.jpg", intro: "Starší pes hledající klidné dožití.", text: "Oskar miluje spánek na sluníčku.", care: "Kloubní výživa.", location: "Azyl HERVAS" },
  { id: 8, name: "Kiki", type: "Ostatní", gender: "Samice", age: 3, status: "Deactivated", image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=600&q=80", intro: "Roztomilý králíček v léčení.", text: "Momentálně v karanténě.", care: "Speciální péče.", location: "Veterinární stanice" },
  { id: 9, name: "Bella", type: "Kočka", gender: "Samice", age: 5, status: "Active", image: "https://cdn.pixabay.com/photo/2020/03/23/08/45/cat-4959941_1280.jpg", intro: "Klidná kočka se zelenýma očima.", text: "Ráda odpočívá u okna.", care: "Krmivo a péče o srst.", location: "Azyl HERVAS" },

  // 2. STRANA
  { id: 10, name: "Bary", type: "Pes", gender: "Samec", age: 4, status: "Active", image: "https://cdn.pixabay.com/photo/2017/09/07/23/08/animal-2727056_1280.jpg", intro: "Věrný hlídač a společník.", text: "Skvělý pes na zahradu i k rodině.", care: "Kvalitní granule.", location: "Azyl HERVAS" },
  { id: 11, name: "Mourka", type: "Kočka", gender: "Samice", age: 3, status: "Active", image: "https://cdn.pixabay.com/photo/2018/05/13/21/42/cat-3398081_1280.jpg", intro: "Chytrá mourovatá kočka plná života.", text: "Zvyklá na pobyt v bytě.", care: "Základní péče.", location: "Dočasná péče" },
  { id: 12, name: "Rex", type: "Pes", gender: "Samec", age: 8, status: "Active", image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80", intro: "Aktivní pes vyžadující pohyb.", text: "Učenlivý a poslušný parťák.", care: "Aktivní trénink a krmivo.", location: "Azyl HERVAS" },
  { id: 13, name: "Sisi", type: "Ostatní", gender: "Samice", age: 2, status: "Active", image: "https://cdn.pixabay.com/photo/2020/02/29/18/59/rabbit-4890861_1280.jpg", intro: "Roztomilý zakrslý králíček.", text: "Zachráněna z nevhodných podmínek.", care: "Seno a specializované krmivo.", location: "Dočasná péče" },
  { id: 14, name: "Felix", type: "Kočka", gender: "Samec", age: 6, status: "Active", image: "https://cdn.pixabay.com/photo/2019/06/08/17/02/cat-4260536_1280.jpg", intro: "Černobílý elegantní kocour.", text: "Rád se mazlí a vyhledává lidskou společnost.", care: "Krmivo a česání.", location: "Azyl HERVAS" },
  { id: 15, name: "Ben", type: "Pes", gender: "Samec", age: 1, status: "Active", image: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=600&q=80", intro: "Mladý kříženec plný hravosti.", text: "Rychle se učí základním návykům.", care: "Krmivo pro mladé psy.", location: "Dočasná péče" },
  { id: 16, name: "Rozárka", type: "Ostatní", gender: "Samice", age: 5, status: "Active", image: "https://cdn.pixabay.com/photo/2021/05/08/17/05/parrot-6238905_1280.jpg", intro: "Krasavec mezi papoušky.", text: "Péče v odborné stanici azylu.", care: "Ovoce a semena.", location: "Záchranný areál HERVAS" },
  { id: 17, name: "Charlie", type: "Pes", gender: "Samec", age: 5, status: "Active", image: "https://cdn.pixabay.com/photo/2017/07/11/14/10/happy-dog-2493688_1280.jpg", intro: "Přátelský světlý pes.", text: "Miluje vodu, procházky a míčky.", care: "Krmivo.", location: "Azyl HERVAS" },
  { id: 18, name: "Micka", type: "Kočka", gender: "Samice", age: 8, status: "Active", image: "https://cdn.pixabay.com/photo/2017/07/21/07/13/cat-2524884_1280.jpg", intro: "Rozvážná stříbrná kočka.", text: "Hledá klidný domov bez hlučných zvířat.", care: "Veterinární péče.", location: "Dočasná péče" },

  // 3. STRANA
  { id: 19, name: "Toby", type: "Pes", gender: "Samec", age: 3, status: "Active", image: "https://cdn.pixabay.com/photo/2017/11/28/14/00/staffordshire-bull-terrier-2983742_1280.jpg", intro: "Malý terriér plný energie.", text: "Vhodný do bytu i k domku.", care: "Krmivo a pohyb.", location: "Azyl HERVAS" },
  { id: 20, name: "Sněhulka", type: "Kočka", gender: "Samice", age: 2, status: "Active", image: "https://cdn.pixabay.com/photo/2020/03/06/10/55/cat-4906764_1280.jpg", intro: "Čistě bílá kočka.", text: "Nalezenec, velmi přátelská.", care: "Krmivo a vyčesávání.", location: "Azyl HERVAS" },
  { id: 21, name: "Dasty", type: "Pes", gender: "Samec", age: 7, status: "Active", image: "https://cdn.pixabay.com/photo/2024/02/26/19/57/dog-8598827_1280.jpg", intro: "Klidný dlouhosrstý pes.", text: "Skvělý společník pro starší lidi.", care: "Péče o srst a procházky.", location: "Dočasná péče" },
  { id: 22, name: "Blesk", type: "Ostatní", gender: "Samec", age: 4, status: "Active", image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=600&q=80", intro: "Zachráněný kůň v azylu.", text: "Potřebuje virtuální adopci pro ustájení.", care: "Seno, jádro a pastva.", location: "Záchranný areál HERVAS" },
  { id: 23, name: "Astra", type: "Kočka", gender: "Samice", age: 4, status: "Active", image: "https://cdn.pixabay.com/photo/2020/04/27/09/21/cat-5098930_1280.jpg", intro: "Zvědavá barevná kočka.", text: "Ráda zkoumá nové prostory.", care: "Krmivo.", location: "Azyl HERVAS" },
  { id: 24, name: "César", type: "Pes", gender: "Samec", age: 10, status: "Active", image: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=600&q=80", intro: "Moudrý starý ovčák.", text: "Hledá někoho, kdo mu dopřeje dospání.", care: "Kloubní výživa.", location: "Azyl HERVAS" },
  { id: 25, name: "Lola", type: "Kočka", gender: "Samice", age: 1, status: "Active", image: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=600&q=80", intro: "Mladá zrzavá kočička.", text: "Hravá, očkovaná a odčervená.", care: "Krmivo.", location: "Dočasná péče" },
  { id: 26, name: "Rambo", type: "Pes", gender: "Samec", age: 5, status: "Active", image: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&w=600&q=80", intro: "Silný a věrný pes.", text: "Potřebuje důsledného majitele.", care: "Trénink a kvalitní strava.", location: "Azyl HERVAS" },
  { id: 27, name: "Píšťalka", type: "Ostatní", gender: "Samice", age: 3, status: "Active", image: "https://cdn.pixabay.com/photo/2017/03/06/23/48/cockatiel-2122876_1280.jpg", intro: "Krásná korela.", text: "Veselý a zpěvavý ptáček z dočasné péče.", care: "Krmení a péče.", location: "Dočasná péče" }
];

let animalsData;
if (savedVersion !== CURRENT_DB_VERSION) {
  animalsData = defaultAnimals;
  localStorage.setItem("hervas_animals", JSON.stringify(defaultAnimals));
  localStorage.setItem("hervas_db_version", CURRENT_DB_VERSION);
} else {
  animalsData = JSON.parse(localStorage.getItem("hervas_animals")) || defaultAnimals;
}

// DATABÁZE UŽIVATELŮ
let usersDatabase = JSON.parse(localStorage.getItem("hervas_users_db")) || [
  { name: "Hlavní Admin", email: "admin@hervas.cz", role: "Admin" },
  { name: "Manažer Jan", email: "manager@hervas.cz", role: "Manager" },
  { name: "Jan Novák", email: "jan@example.com", role: "Uživatel" }
];

// STAV APLIKACE
let currentPage = 1;
const itemsPerPage = 9;
let filteredAnimals = [...animalsData];
let currentAnimalId = null;

// AUTENTIKACE A DATA ŽÁDOSTÍ
let currentUser = JSON.parse(localStorage.getItem("hervas_user")) || null;
let requestsData = JSON.parse(localStorage.getItem("hervas_requests")) || [
  { id: 101, userEmail: "jan@example.com", userName: "Jan Novák", animalName: "Mína", type: "Reálná adopce", motivation: "Mám velký dům se zahradou a zkušenosti s kočkami.", status: "Čeká na schválení", date: "2026-10-01" }
];

// SLIDESHOW
let slideshowIndex = 0;
let currentSlideNumber = 1;

document.addEventListener("DOMContentLoaded", () => {
  saveAnimals();
  saveUsersDb();
  updateAuthUI();
  applyFilters();
  startHeroSlideshow();
});

// SKLOŇOVÁNÍ VĚKU (1 rok / 2-4 roky / 5+ let)
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

  setInterval(() => {
    slideshowIndex = (slideshowIndex + 1) % images.length;
    const nextImg = images[slideshowIndex];

    if (currentSlideNumber === 1) {
      slide2.style.backgroundImage = `url('${nextImg}')`;
      slide2.classList.add("active");
      slide1.classList.remove("active");
      currentSlideNumber = 2;
    } else {
      slide1.style.backgroundImage = `url('${nextImg}')`;
      slide1.classList.add("active");
      slide2.classList.remove("active");
      currentSlideNumber = 1;
    }
  }, 4500);
}

function scrollToContact() {
  showSection('uvod');
  const contactEl = document.getElementById('kontakt');
  if (contactEl) {
    contactEl.scrollIntoView({ behavior: 'smooth' });
  }
}

function showSection(sectionId) {
  document.querySelectorAll(".page-section").forEach(sec => sec.classList.add("hidden"));
  const target = document.getElementById(sectionId);
  if (target) target.classList.remove("hidden");

  document.querySelectorAll(".nav a").forEach(link => link.classList.remove("selected"));
  const activeLink = document.querySelector(`.nav a[href="#${sectionId}"]`);
  if (activeLink) activeLink.classList.add("selected");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function switchProfileTab(tabName) {
  document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.add("hidden"));
  document.querySelectorAll(".profile-menu-item").forEach(btn => btn.classList.remove("active"));

  if (tabName === 'transactions') {
    document.getElementById("tabContentTransactions").classList.remove("hidden");
    document.getElementById("tabBtnTransactions").classList.add("active");
  } else if (tabName === 'settings') {
    document.getElementById("tabContentSettings").classList.remove("hidden");
    document.getElementById("tabBtnSettings").classList.add("active");
  } else if (tabName === 'manager') {
    document.getElementById("tabContentManager").classList.remove("hidden");
    document.getElementById("tabBtnManager").classList.add("active");
  } else if (tabName === 'adminRoles') {
    document.getElementById("tabContentAdminRoles").classList.remove("hidden");
    document.getElementById("tabBtnAdminRoles").classList.add("active");
    renderAdminUsersList();
  }
}

// FILTRACE A STRÁNKOVÁNÍ
function applyFilters() {
  const typeSelect = document.getElementById("filterType");
  const genderSelect = document.getElementById("filterGender");
  const ageSelect = document.getElementById("filterAge");

  const type = typeSelect ? typeSelect.value : "all";
  const gender = genderSelect ? genderSelect.value : "all";
  const ageGroup = ageSelect ? ageSelect.value : "all";

  filteredAnimals = animalsData.filter(animal => {
    if (type !== "all" && animal.type !== type) return false;
    if (gender !== "all" && animal.gender !== gender) return false;
    if (ageGroup === "young" && animal.age > 3) return false;
    if (ageGroup === "adult" && (animal.age <= 3 || animal.age > 8)) return false;
    if (ageGroup === "senior" && animal.age <= 8) return false;
    return true;
  });

  currentPage = 1;
  renderAnimalGrid();
}

function resetFilters() {
  if (document.getElementById("filterType")) document.getElementById("filterType").value = "all";
  if (document.getElementById("filterGender")) document.getElementById("filterGender").value = "all";
  if (document.getElementById("filterAge")) document.getElementById("filterAge").value = "all";
  applyFilters();
}

function renderAnimalGrid() {
  const grid = document.getElementById("animalGrid");
  if (!grid) return;
  
  grid.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = filteredAnimals.slice(start, end);

  if (pageItems.length === 0) {
    grid.innerHTML = `<p style="grid-column: span 3; text-align: center; color: #777; padding: 40px;">Žádné zvíře neodpovídá zadaným filtrům.</p>`;
    renderPagination(0);
    return;
  }

  const isStaff = currentUser && (currentUser.role === "Manager" || currentUser.role === "Admin" || currentUser.role === "Uživatel");

  pageItems.forEach(animal => {
    const card = document.createElement("article");
    card.className = "animal-card";
    card.onclick = () => showAnimalDetail(animal.id);

    let badgeClass = "badge-active";
    if (animal.status === "Adopted") badgeClass = "badge-adopted";
    if (animal.status === "Deactivated") badgeClass = "badge-deactivated";

    card.innerHTML = `
      <div class="animal-image" style="background-image: url('${animal.image}');"></div>
      <div class="card-body">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h2>${animal.name}</h2>
          <span class="badge ${badgeClass}">${animal.status}</span>
        </div>
        <p>${animal.type} · ${animal.gender} · ${formatAge(animal.age)}</p>
        
        <div class="card-actions-row">
          <span style="color:#555; font-size:12px; font-weight:bold;">ZOBRAZIT DETAIL →</span>
          ${isStaff ? `<button class="delete-animal-btn-card" onclick="deleteAnimalDirect(event, ${animal.id})">🗑️ SMAZAT</button>` : ''}
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  renderPagination(Math.ceil(filteredAnimals.length / itemsPerPage));
}

// VYKRESLENÍ TLAČÍTEK STRÁNKOVÁNÍ
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
      window.scrollTo({ top: 200, behavior: "smooth" });
    };
    container.appendChild(btn);
  }
}

// MAZÁNÍ ZVÍŘAT
function deleteAnimalDirect(event, id) {
  event.stopPropagation();
  const animal = animalsData.find(a => a.id === id);
  if (confirm(`Opravdu chcete trvale smazat zvíře "${animal ? animal.name : ''}" z katalogu?`)) {
    animalsData = animalsData.filter(a => a.id !== id);
    saveAnimals();
    applyFilters();
    alert("Zvíře bylo úspěšně smazáno.");
  }
}

function deleteAnimalFromDetail() {
  if (!currentAnimalId) return;
  const animal = animalsData.find(a => a.id === currentAnimalId);
  if (confirm(`Opravdu chcete trvale smazat zvíře "${animal ? animal.name : ''}" z nabídky?`)) {
    animalsData = animalsData.filter(a => a.id !== currentAnimalId);
    saveAnimals();
    applyFilters();
    alert("Zvíře bylo smazáno.");
    showSection("zvirata");
  }
}

// DETAIL ZVÍŘETE
function showAnimalDetail(id) {
  const animal = animalsData.find(a => a.id === id);
  if (!animal) return;

  currentAnimalId = animal.id;
  document.getElementById("detailName").textContent = animal.name;
  document.getElementById("detailTypeGender").textContent = `${animal.type.toUpperCase()} · ${animal.gender.toUpperCase()} · ${formatAge(animal.age).toUpperCase()}`;
  document.getElementById("detailIntro").textContent = animal.intro;
  document.getElementById("detailText").textContent = animal.text;
  document.getElementById("detailCare").textContent = animal.care;
  document.getElementById("detailLocation").textContent = animal.location;

  const photo = document.getElementById("detailPhoto");
  photo.style.backgroundImage = `url('${animal.image}')`;

  const badge = document.getElementById("detailStatusBadge");
  badge.textContent = animal.status;
  badge.className = `badge ${animal.status === 'Active' ? 'badge-active' : animal.status === 'Adopted' ? 'badge-adopted' : 'badge-deactivated'}`;

  const btnsContainer = document.getElementById("adoptionButtonsContainer");
  const notice = document.getElementById("adoptionUnavailableNotice");

  if (animal.status === "Active") {
    btnsContainer.classList.remove("hidden");
    notice.classList.add("hidden");
  } else {
    btnsContainer.classList.add("hidden");
    notice.classList.remove("hidden");
  }

  const btnDelete = document.getElementById("btnDeleteAnimalDetail");
  if (currentUser) {
    btnDelete.classList.remove("hidden");
  } else {
    btnDelete.classList.add("hidden");
  }

  showSection("detail");
}

// ADOPČNÍ OKNA
function openVirtualAdoptionModal() {
  const animal = animalsData.find(a => a.id === currentAnimalId);
  document.getElementById("adoptText").textContent = `Chcete virtuálně adoptovat zvíře ${animal ? animal.name : 'HERVAS'}? Vyberte měsíční příspěvek.`;
  document.getElementById("adoptionModal").classList.add("show");
}

function closeAdoptionModal() {
  document.getElementById("adoptionModal").classList.remove("show");
}

function chooseAmount(amount) {
  if (!currentUser) {
    alert("Pro odeslání příspěvku/adopce se prosím nejprve přihlaste.");
    closeAdoptionModal();
    showSection("auth");
    return;
  }

  const animal = animalsData.find(a => a.id === currentAnimalId);
  const newReq = {
    id: Date.now(),
    userEmail: currentUser.email,
    userName: currentUser.name,
    animalName: animal ? animal.name : "Všeobecný dar HERVAS",
    type: "Virtuální adopce",
    motivation: `Měsíční příspěvek: ${amount} Kč`,
    status: "Schváleno (Aktivní)",
    date: new Date().toISOString().split('T')[0]
  };

  requestsData.push(newReq);
  saveRequests();
  alert(`Děkujeme! Zvolili jste virtuální adopci za ${amount} Kč měsíčně. Záznam byl přidán do vašeho profilu.`);
  closeAdoptionModal();
  updateProfileUI();
}

function generalAdoption(amount) {
  currentAnimalId = null;
  openVirtualAdoptionModal();
}

function openRealAdoptionModal() {
  if (!currentUser) {
    alert("Pro podání žádosti o reálnou adopci musíte být přihlášeni.");
    showSection("auth");
    return;
  }
  const animal = animalsData.find(a => a.id === currentAnimalId);
  document.getElementById("realAdoptText").textContent = `Podáváte žádost o reálnou adopci zvířete ${animal.name}.`;
  document.getElementById("realAdoptionModal").classList.add("show");
}

function closeRealAdoptionModal() {
  document.getElementById("realAdoptionModal").classList.remove("show");
}

function submitRealAdoption(e) {
  e.preventDefault();
  const motivation = document.getElementById("realAdoptMotivation").value;
  const animal = animalsData.find(a => a.id === currentAnimalId);

  const newReq = {
    id: Date.now(),
    userEmail: currentUser.email,
    userName: currentUser.name,
    animalName: animal.name,
    type: "Reálná adopce",
    motivation: motivation,
    status: "Čeká na schválení",
    date: new Date().toISOString().split('T')[0]
  };

  requestsData.push(newReq);
  saveRequests();
  alert("Vaše žádost o reálnou adopci byla úspěšně odeslána k posouzení manažerovi azylu.");
  closeRealAdoptionModal();
  document.getElementById("realAdoptMotivation").value = "";
  showSection("profil");
  updateProfileUI();
}

function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("contactName").value;
  alert(`Děkujeme, ${name}. Vaše zpráva byla úspěšně odeslána. Budeme vás kontaktovat co nejdříve.`);
  e.target.reset();
}

// AUTHENTIKACE
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;

  let existingUser = usersDatabase.find(u => u.email === email);

  if (!existingUser) {
    let role = "Uživatel";
    let name = email.split('@')[0];

    if (email === "admin@hervas.cz") role = "Admin";
    else if (email === "manager@hervas.cz") role = "Manager";

    existingUser = { name, email, role };
    usersDatabase.push(existingUser);
    saveUsersDb();
  }

  currentUser = existingUser;
  localStorage.setItem("hervas_user", JSON.stringify(currentUser));

  updateAuthUI();
  showSection("profil");
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const confirmPassword = document.getElementById("regPasswordConfirm").value;

  if (password !== confirmPassword) {
    alert("Chyba: Zadaná hesla se neshodují. Zadejte prosím heslo do obou polí stejně.");
    return;
  }

  const existingUser = usersDatabase.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    alert("Chyba: Uživatel s touto e-mailovou adresou již existuje. Přihlaste se.");
    return;
  }

  const newUser = { name, email, role: "Uživatel" };
  usersDatabase.push(newUser);
  saveUsersDb();

  currentUser = newUser;
  localStorage.setItem("hervas_user", JSON.stringify(currentUser));

  alert("Registrace proběhla úspěšně! Byli jste automaticky přihlášeni.");
  e.target.reset();
  updateAuthUI();
  showSection("profil");
}

function handleLogout() {
  currentUser = null;
  localStorage.removeItem("hervas_user");
  updateAuthUI();
  showSection("uvod");
}

function deleteUserAccount() {
  if (confirm("Opravdu chcete trvale smazat svůj účet a veškerá data?")) {
    requestsData = requestsData.filter(r => r.userEmail !== currentUser.email);
    usersDatabase = usersDatabase.filter(u => u.email !== currentUser.email);
    saveRequests();
    saveUsersDb();
    handleLogout();
  }
}

function handleUpdateProfile(e) {
  e.preventDefault();
  const newName = document.getElementById("editUserName").value;
  if (newName && currentUser) {
    currentUser.name = newName;
    const uDb = usersDatabase.find(u => u.email === currentUser.email);
    if (uDb) uDb.name = newName;

    saveUsersDb();
    localStorage.setItem("hervas_user", JSON.stringify(currentUser));
    updateAuthUI();
    alert("Profil byl úspěšně aktualizován.");
  }
}

// SPRÁVA ROLÍ
function renderAdminUsersList() {
  const container = document.getElementById("adminUsersList");
  if (!container) return;
  container.innerHTML = usersDatabase.map(u => `
    <div class="user-role-card">
      <div>
        <strong style="font-size:16px;">${u.name}</strong> (${u.email})<br>
        <small style="color:#666;">Aktuální role: <strong>${u.role}</strong></small>
      </div>
      <div style="display:flex; gap:6px;">
        <button onclick="changeUserRole('${u.email}', 'Uživatel')" style="background:#777; color:white; border:0; padding:6px 10px; cursor:pointer; font-size:12px;">UŽIVATEL</button>
        <button onclick="changeUserRole('${u.email}', 'Manager')" style="background:#2a7b4c; color:white; border:0; padding:6px 10px; cursor:pointer; font-size:12px;">MANAŽER</button>
        <button onclick="changeUserRole('${u.email}', 'Admin')" style="background:#111; color:white; border:0; padding:6px 10px; cursor:pointer; font-size:12px;">ADMIN</button>
      </div>
    </div>
  `).join('');
}

function changeUserRole(email, newRole) {
  const user = usersDatabase.find(u => u.email === email);
  if (user) {
    user.role = newRole;
    saveUsersDb();

    if (currentUser && currentUser.email === email) {
      currentUser.role = newRole;
      localStorage.setItem("hervas_user", JSON.stringify(currentUser));
      updateAuthUI();
    }

    renderAdminUsersList();
    alert(`Role uživatele ${user.name} byla změněna na: ${newRole}`);
  }
}

function updateAuthUI() {
  const topLinks = document.getElementById("authTopLinks");
  const navProfil = document.getElementById("navProfilLink");
  const navAuth = document.getElementById("navAuthLink");

  if (currentUser) {
    if (topLinks) topLinks.innerHTML = `Přihlášen: <strong>${currentUser.name}</strong> (${currentUser.role}) | <a href="#profil" onclick="showSection('profil')">Profil</a> | <a href="#" onclick="handleLogout()">Odhlásit</a>`;
    if (navProfil) navProfil.classList.remove("hidden");
    if (navAuth) navAuth.classList.add("hidden");
    updateProfileUI();
  } else {
    if (topLinks) topLinks.innerHTML = `<a href="#auth" onclick="showSection('auth')">Přihlášení / Registrace</a>`;
    if (navProfil) navProfil.classList.add("hidden");
    if (navAuth) navAuth.classList.remove("hidden");
  }

  renderAnimalGrid();
}

function updateProfileUI() {
  if (!currentUser) return;

  if (document.getElementById("profileName")) document.getElementById("profileName").textContent = currentUser.name;
  if (document.getElementById("profileEmail")) document.getElementById("profileEmail").textContent = currentUser.email;
  if (document.getElementById("profileRoleBadge")) document.getElementById("profileRoleBadge").textContent = `ROLE: ${currentUser.role.toUpperCase()}`;
  if (document.getElementById("editUserName")) document.getElementById("editUserName").value = currentUser.name;

  const userTxContainer = document.getElementById("userTransactionsList");
  const myRequests = requestsData.filter(r => r.userEmail === currentUser.email);

  if (userTxContainer) {
    if (myRequests.length === 0) {
      userTxContainer.innerHTML = "<p style='color:#777; background:#fff; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.08);'>Zatím nemáte žádné aktivní žádosti ani transakce.</p>";
    } else {
      userTxContainer.innerHTML = myRequests.map(r => `
        <div class="tx-card">
          <div>
            <strong style="font-size:17px;">${r.animalName}</strong> (${r.type})<br>
            <small style="color:#666;">Datum: ${r.date} | ${r.motivation}</small>
          </div>
          <div>
            <span class="badge ${r.status.includes('Schváleno') ? 'badge-active' : 'badge-deactivated'}">${r.status}</span>
          </div>
        </div>
      `).join('');
    }
  }

  const tabBtnManager = document.getElementById("tabBtnManager");
  const tabBtnAdminRoles = document.getElementById("tabBtnAdminRoles");

  if (currentUser.role === "Manager" || currentUser.role === "Admin" || currentUser.role === "Uživatel") {
    if (tabBtnManager) tabBtnManager.classList.remove("hidden");
    renderManagerRequests();
  } else {
    if (tabBtnManager) tabBtnManager.classList.add("hidden");
  }

  if (currentUser.role === "Admin") {
    if (tabBtnAdminRoles) tabBtnAdminRoles.classList.remove("hidden");
  } else {
    if (tabBtnAdminRoles) tabBtnAdminRoles.classList.add("hidden");
  }
}

// MANAŽERSKÝ PANEL
function renderManagerRequests() {
  const container = document.getElementById("managerRequestsList");
  if (!container) return;
  container.innerHTML = requestsData.map(r => `
    <div class="request-card">
      <div>
        <strong>${r.userName}</strong> (${r.userEmail}) → <strong>${r.animalName}</strong><br>
        <small>Typ: ${r.type} | Dopis: "${r.motivation}"</small><br>
        <small>Stav: <strong>${r.status}</strong></small>
      </div>
      <div style="display:flex; gap:6px;">
        <button onclick="changeRequestStatus(${r.id}, 'Schváleno (Aktivní)')" style="background:#2a7b4c; color:white; border:0; padding:6px 10px; cursor:pointer; font-size:13px;">SCHVÁLIT</button>
        <button onclick="changeRequestStatus(${r.id}, 'Zamítnuto')" style="background:#b83232; color:white; border:0; padding:6px 10px; cursor:pointer; font-size:13px;">ZAMÍTNOUT</button>
      </div>
    </div>
  `).join('');
}

function changeRequestStatus(id, newStatus) {
  const req = requestsData.find(r => r.id === id);
  if (req) {
    req.status = newStatus;
    saveRequests();
    renderManagerRequests();
    updateProfileUI();
  }
}

function handleAddAnimal(e) {
  e.preventDefault();
  const newAnimal = {
    id: Date.now(),
    name: document.getElementById("addName").value,
    type: document.getElementById("addType").value,
    gender: document.getElementById("addGender").value,
    age: parseInt(document.getElementById("addAge").value),
    status: document.getElementById("addStatus").value,
    image: document.getElementById("addImage").value || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80",
    intro: document.getElementById("addIntro").value,
    text: document.getElementById("addText").value,
    care: document.getElementById("addCare").value,
    location: document.getElementById("addLocation").value
  };

  animalsData.unshift(newAnimal);
  saveAnimals();
  applyFilters();
  alert(`Zvíře ${newAnimal.name} bylo úspěšně přidáno do nabídky katalogu.`);
  e.target.reset();
}

function saveRequests() {
  localStorage.setItem("hervas_requests", JSON.stringify(requestsData));
}

function saveAnimals() {
  localStorage.setItem("hervas_animals", JSON.stringify(animalsData));
}

function saveUsersDb() {
  localStorage.setItem("hervas_users_db", JSON.stringify(usersDatabase));
}