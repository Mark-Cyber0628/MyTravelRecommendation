// Kulcsszó-csoportok
const keywords = {
  beaches: ["strand", "strandok"],
  temples: ["templom", "templomok"],
  countries: ["ország", "országok"]
};

// Eredménymegjelenítő div létrehozása, ha még nem lenne
let resultsContainer = document.getElementById('results');
// Keresés funkció hívása gombra
function search() {
  const input = document.getElementById("searchInput").value.trim().toLowerCase();

  fetch("travel_recommendation.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Hiba a JSON betöltésekor");
      }
      return response.json();
    })
    .then(data => {
      console.log("Lekért adatok:", data);

      resultsContainer.innerHTML = ""; // előző találatok törlése

      let found = false;

      // Strand keresés
      if (keywords.beaches.includes(input)) {
  found = true;
  resultsContainer.innerHTML += "<h2>Strandok</h2>";
  data.beaches.forEach(place => renderPlace(place));
}

if (keywords.temples.includes(input)) {
  found = true;
  resultsContainer.innerHTML += "<h2>Templomok</h2>";
  data.temples.forEach(place => renderPlace(place));
}

if (keywords.countries.includes(input)) {
  found = true;
  resultsContainer.innerHTML += "<h2>Országok</h2>";
  data.countries.forEach(country => {
    country.cities.forEach(city => renderPlace(city));
  });
}

if (!found) {
  resultsContainer.innerHTML = `<p>Nincs találat a "${input}" kulcsszóra.</p>`;
}

    })
    .catch(error => {
      console.error("Hiba a lekérés során:", error);
    });
}

// Megjelenít egy elemet (helyet vagy várost)
function renderPlace(place) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h3>${place.name}</h3>
    <img src="${place.imageUrl}" alt="${place.name}" style="max-width: 300px;">
    <p>${place.description}</p>
  `;
  resultsContainer.appendChild(card);
}

document.getElementById("searchButton").addEventListener("click", search);