const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const truncate = (str, length) => {
  if (typeof str !== "string") {
    throw new Error("Invalid input: expected a string");
  }
  if (typeof length !== "number") {
    throw new Error("Invalid input: expected a number");
  }
  return str.length > length ? str.slice(0, length) + "..." : str;
};

const reverse = (str) => {
  if (typeof str !== "string") {
    throw new Error("Invalid input: expected a string");
  }
  return str.split("").reverse().join("");
};

module.exports = {
  generateUUID,
  truncate,
  reverse,
};
