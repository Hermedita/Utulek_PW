const animals = {
  Mína: {
    type: "Kočka",
    age: "7 let",
    image: "cat",
    intro: "Mína je klidná kočka, která si prošla náročným obdobím a nyní potřebuje hlavně bezpečí a pravidelnou péči.",
    text: "Do péče HERVAS se dostala ve chvíli, kdy potřebovala pomoc s léčbou a následnou rekonvalescencí. Je mazlivá, zvědavá a nejraději tráví čas v klidném prostředí.",
    care: "Vaše podpora pomáhá s krmivem, veterinární péčí a vším, co potřebuje pro spokojený život.",
    location: "Mína se nachází v dočasné péči HERVAS."
  },

  Max: {
    type: "Pes",
    age: "9 let",
    image: "dog",
    intro: "Max je přátelský pes, který má rád lidi a zaslouží si klidné stáří.",
    text: "Po příchodu do péče potřeboval především veterinární kontrolu a pravidelnou léčbu. Dnes si užívá procházky a společnost lidí.",
    care: "Virtuální adopce pomáhá hradit jeho krmivo, léky, kontroly a další každodenní výdaje.",
    location: "Max se nachází v dočasné péči HERVAS."
  },

  Karim: {
    type: "Velbloud",
    age: "12 let",
    image: "camel",
    intro: "Karim je klidný velbloud, který potřebuje pravidelnou péči a vhodné podmínky.",
    text: "Do péče se dostal po změně podmínek, ve kterých žil. Nyní má bezpečné zázemí a dostatek prostoru.",
    care: "Příspěvky pomáhají s krmením, ošetřením a zajištěním jeho zázemí.",
    location: "Karim se nachází v záchranném areálu HERVAS."
  },

  Argo: {
    type: "Vlk",
    age: "6 let",
    image: "wolf",
    intro: "Argo je mladý vlk, který potřebuje hlavně klid, prostor a odbornou péči.",
    text: "Jeho život vyžaduje speciální podmínky, které mu HERVAS zajišťuje. Díky tomu může žít v bezpečném prostředí odpovídajícím jeho potřebám.",
    care: "Vaše pomoc přispívá na krmivo, péči o výběh a veterinární kontroly.",
    location: "Argo se nachází v záchranném areálu HERVAS."
  }
};


let currentAnimal = "Mína";


function showSection(sectionId) {

  const sections = document.querySelectorAll(".page-section");

  sections.forEach(section => {
    section.classList.add("hidden");
  });

  const section = document.getElementById(sectionId);

  if (section) {
    section.classList.remove("hidden");
  }

  document.querySelectorAll(".nav a").forEach(link => {
    link.classList.remove("selected");
  });

  const activeLink = document.querySelector(
    `.nav a[href="#${sectionId}"]`
  );

  if (activeLink) {
    activeLink.classList.add("selected");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


function showAnimal(name) {

  const animal = animals[name];

  if (!animal) return;

  currentAnimal = name;

  document.getElementById("detailName").textContent =
    name;

  document.getElementById("detailIntro").textContent =
    animal.intro;

  document.getElementById("detailText").textContent =
    animal.text;

  document.getElementById("detailCare").textContent =
    animal.care;

  document.getElementById("detailLocation").textContent =
    animal.location;

  const photo = document.getElementById("detailPhoto");

  photo.className = "detail-photo " + animal.image;

  showSection("detail");
}


function openAdoption() {

  document.getElementById("adoptText").textContent =
    `Chcete virtuálně adoptovat zvíře ${currentAnimal}? Vyberte měsíční příspěvek.`;

  document
    .getElementById("adoptionModal")
    .classList.add("show");
}


function generalAdoption(amount) {

  currentAnimal = "HERVAS";

  document.getElementById("adoptText").textContent =
    `Děkujeme za váš zájem pomoci HERVAS. Zvolený příspěvek je ${amount} Kč měsíčně.`;

  document
    .getElementById("adoptionModal")
    .classList.add("show");
}


function closeAdoption() {

  document
    .getElementById("adoptionModal")
    .classList.remove("show");
}


function chooseAmount(amount) {

  if (currentAnimal === "HERVAS") {

    alert(
      `Děkujeme! Zvolili jste příspěvek ${amount} Kč měsíčně pro HERVAS.`
    );

  } else {

    alert(
      `Děkujeme! Zvolili jste virtuální adopci ${currentAnimal} za ${amount} Kč měsíčně.`
    );

  }

  closeAdoption();
}


document
  .getElementById("adoptionModal")
  .addEventListener("click", function(e) {

    if (e.target === this) {
      closeAdoption();
    }

  });


document.addEventListener("keydown", function(e) {

  if (e.key === "Escape") {
    closeAdoption();
  }

});