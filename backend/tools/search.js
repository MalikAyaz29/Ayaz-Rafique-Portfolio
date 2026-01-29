// backend/tools/search.js
module.exports = function (data, target) {
  if (!data) return "Invalid input";

  const arr = data.split(",").map(Number);
  target = Number(target);

  const index = arr.indexOf(target);
  return index === -1 ? "Not Found" : `Found at index ${index}`;
};
