// 0. Build the url for the request
const garage = "repairshop";
const url = `https://wagon-garage-api.herokuapp.com/${garage}/cars`;
const carsList = document.querySelector(".cars-list");

// 1. Do HTTP request to get list of all cars
const refreshCars = () => {
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      carsList.innerHTML = "";
      // 2. Iterate over the car objects
      data.forEach((car) => {
        // 3. Create an HTML card for each car
        const carCard = `<div class="car">
          <div class="car-image">
            <img src="https://hips.hearstapps.com/hmg-prod/images/2024-lamborghini-revuelto-127-641a1d518802b.jpg?crop=0.813xw:0.721xh;0.0994xw,0.128xh&resize=1200:*" />
          </div>
          <div class="car-info">
            <h4>${car.brand} ${car.model}</h4>
            <p><strong>Owner:</strong> ${car.owner}</p>
            <p><strong>Plate:</strong> ${car.plate}</p>
          </div>
        </div>`
        
        // 4. Insert CarCard in the DOM
        carsList.insertAdjacentHTML("beforeend", carCard)
      });
    });
}

refreshCars();


// 1. Select the form
const form = document.querySelector(".car-form");

// 2. Event listener for the form (submit event)
form.addEventListener("submit", (event) => {
  // 3. Prevent the default behaviour of refreshing the page
  event.preventDefault();
  // 4. Do the Post Request with the information from the form
  const formData = new FormData(form)
  const body = Object.fromEntries(formData)

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
    .then(() => {
      // 5. Refresh list of cars
      refreshCars();
    })
})