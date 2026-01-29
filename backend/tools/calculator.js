// backend/tools/calculator.js
module.exports = function (n1, n2, op) {
  n1 = Number(n1);
  n2 = Number(n2);

  if (isNaN(n1) || isNaN(n2)) return "Invalid input";

  switch (op) {
    case "+":
      return n1 + n2;
    case "-":
      return n1 - n2;
    case "*":
      return n1 * n2;
    case "/":
      return n2 === 0 ? "Divide by zero" : n1 / n2;
    default:
      return "Invalid operator";
  }
};
