// Calculator
function calculate() {
  const n1 = document.getElementById("num1").value;
  const n2 = document.getElementById("num2").value;
  const op = document.getElementById("op").value;
  
  fetch(`/api/calculate?n1=${n1}&n2=${n2}&op=${encodeURIComponent(op)}`)
    .then(res => res.text())
    .then(data => {
      document.getElementById("calcResult").innerText = data;
    });
}

// Sort
function sortNumbers() {
  const nums = document.getElementById("sortInput").value;

  fetch(`/api/sort?nums=${nums}`)
    .then(res => res.text())
    .then(data => {
      document.getElementById("sortResult").innerText = data;
    });
}

// Search
function searchNumber() {
  const data = document.getElementById("searchData").value;
  const target = document.getElementById("searchTarget").value;

  fetch(`/api/search?data=${data}&target=${target}`)
    .then(res => res.text())
    .then(data => {
      document.getElementById("searchResult").innerText = data;
    });
}
