// Generate 100 mock properties for demo
const areas = ["East London","Canary Wharf","Shoreditch","Hackney","Westminster","Camden","Chelsea","Greenwich"];
const properties = [];
for(let i=1;i<=100;i++){
  properties.push({
    id:i,
    title:`Property ${i} in ${areas[i%areas.length]}`,
    beds: Math.floor(Math.random()*5)+1,
    price: Math.floor(Math.random()*1500000)+250000,
    area: areas[i%areas.length],
    img:`https://picsum.photos/300/200?random=${i}`
  });
});

const container = document.getElementById("property-cards");

// Render property cards
function renderProperties(list){
  container.innerHTML = "";
  list.forEach(p=>{
    const card = document.createElement("div");
    card.className="card";
    card.innerHTML=`
      <img src="${p.img}" alt="Property">
      <div class="favorite" data-id="${p.id}">❤️</div>
      <h3>${p.title}</h3>
      <p>${p.beds} Bed • £${p.price.toLocaleString()}</p>
      <p>Area: ${p.area}</p>
      <button class="book-btn" data-id="${p.id}">Book Viewing</button>
    `;
    container.appendChild(card);
  });
}

// Initial render
renderProperties(properties);

// Favorites & Booking
document.addEventListener("click", e=>{
  if(e.target.classList.contains("favorite")){
    e.target.textContent = e.target.textContent==="❤️" ? "💖" : "❤️";
  }
  if(e.target.classList.contains("book-btn")){
    const id = e.target.dataset.id;
    alert("Booking request sent for property ID: "+id);
  }
});

// Filters
function applyFilters(){
  const keyword = document.getElementById("search-input").value.toLowerCase();
  const beds = parseInt(document.getElementById("filter-beds").value) || 0;
  const maxPrice = parseInt(document.getElementById("filter-price").value) || Infinity;
  const filtered = properties.filter(p=>{
    return p.title.toLowerCase().includes(keyword) &&
           p.beds >= beds &&
           p.price <= maxPrice;
  });
  renderProperties(filtered);
}

// AI Chatbox
const input = document.getElementById("chat-input");
const messages = document.getElementById("chat-messages");

input.addEventListener("keypress", function(e){
  if(e.key === "Enter"){
    const userMsg = input.value;
    messages.innerHTML += "<div><b>You:</b> "+userMsg+"</div>";

    // Simulated AI responses
    let response;
    if(userMsg.toLowerCase().includes("price")) response="Most properties range from £250,000 to £1,750,000.";
    else if(userMsg.toLowerCase().includes("beds")) response="We have 1-5 bed properties available.";
    else if(userMsg.toLowerCase().includes("view")) response="You can click 'Book Viewing' on any property to schedule a visit.";
    else response="Thank you! Our team will contact you shortly.";

    messages.innerHTML += "<div><b>AI:</b> "+response+"</div>";
    input.value = "";
    messages.scrollTop = messages.scrollHeight;
  }
});