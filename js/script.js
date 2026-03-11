// Budget page: calculate total cost
function calculateTotal() {
  const flight = Number(document.getElementById("flight").value || 0);
  const housing = Number(document.getElementById("housing").value || 0);
  const food = Number(document.getElementById("food").value || 0);
  const attractions = Number(document.getElementById("attractions").value || 0);
  const days = Number(document.getElementById("days").value || 0);
  const budgetMax = Number(document.getElementById("budgetMax").value || 100);

  const total = flight + (housing + food + attractions) * days;
  document.getElementById("total").textContent = total;

  // Update progress bar dynamically
  const progress = document.getElementById("budgetProgress");
  if (progress) {
    progress.value = total;
    progress.max = budgetMax; // dynamic max
  }
}



// Travel page: add city with image
let lastCity = null;
let totalTravelTime = 0;
const travelTimes = {
  "Tokyo-Kyoto": 2.5, "Tokyo-Osaka": 3, "Tokyo-Yokohama": 0.5,
  "Tokyo-Nagoya": 1.5, "Tokyo-Hakone": 1.0,
  "Kyoto-Osaka": 0.5, "Kyoto-Nagoya": 1.0, "Kyoto-Hakone": 2.0,
  "Osaka-Nagoya": 1.0, "Osaka-Hakone": 2.5,
  "Yokohama-Nagoya": 1.5, "Yokohama-Hakone": 1.0
};

function addCity() {
  const select = document.getElementById("city");
  if (!select) return;

  const city = select.value;
  const item = document.createElement("li");
  item.className = "city-item";

  // city name
  const name = document.createElement("h3");
  name.textContent = city;
  item.appendChild(name);

  // city image
  const img = document.createElement("img");
  img.src = "images/" + city.toLowerCase() + ".jpg";
  img.alt = city;
  img.className = "city-image";
  item.appendChild(img);

  const itinerary = document.getElementById("itinerary");
  if (itinerary) itinerary.appendChild(item);

  // total travel time
  if (lastCity) {
    const route = lastCity + "-" + city;
    const reverseRoute = city + "-" + lastCity;
    totalTravelTime += travelTimes[route] || travelTimes[reverseRoute] || 0;
    const travelEl = document.getElementById("travelTime");
    if (travelEl) travelEl.textContent = totalTravelTime;
  }

  lastCity = city;
}
