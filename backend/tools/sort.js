// backend/tools/sort.js
module.exports = function (nums) {
  if (!nums) return "Invalid input";

  return nums
    .split(",")
    .map(Number)
    .sort((a, b) => a - b)
    .join(",");
};
