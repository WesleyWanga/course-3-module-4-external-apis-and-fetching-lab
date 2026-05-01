// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("state-input");
  const button = document.getElementById("fetch-alerts");
  const displayDiv = document.getElementById("alerts-display");
  const errorDiv = document.getElementById("error-message");

  button.addEventListener("click", () => {
    const state = input.value;

    fetch(`${weatherApi}${state}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch weather alerts");
        }
        return response.json();
      })
      .then(data => {
        // Clear previous content
        displayDiv.innerHTML = "";

        // Clear error
        errorDiv.textContent = "";
        errorDiv.classList.add("hidden");

        // Show title + count
        const count = data.features.length;
        displayDiv.textContent = `${data.title}: ${count}`;

        // Add headlines
        data.features.forEach(alert => {
          const p = document.createElement("p");
          p.textContent = alert.properties.headline;
          displayDiv.appendChild(p);
        });

        // Clear input
        input.value = "";
      })
      .catch(error => {
        errorDiv.textContent = error.message;
        errorDiv.classList.remove("hidden");

        // Clear input even on error
        input.value = "";
      });
  });
});
// Your code here!
