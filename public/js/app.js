document.getElementById("bmiForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);

  if (isNaN(weight) || isNaN(height)) {
    alert("Please enter valid values for weight and height.");
    return;
  }

  fetch("/bmicalculator", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ weight, height }),
  })
    .then((response) => response.text())
    .then((result) => {
      document.getElementById(
        "result"
      ).innerHTML = `<div class="alert alert-primary">${result}</div>`;
    })
    .catch((error) => console.error("Error:", error));
});

document
  .getElementById("viewHistoryBtn")
  .addEventListener("click", function () {
    window.location.href = "/history";
  });
