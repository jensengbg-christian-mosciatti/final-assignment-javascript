import { clearPage } from "./dom.js";
import { getPictures } from "./pictures.js";

const apiKey = "19d3e6e0acfe9c438f368e2c2bab1c5d";
let page = 1;
let classArrayIndex = 0;
let searchText = "";
let searchQty = null;

function getRandom(max) {
  // min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * max);
}

function getRandomText() {
  const textArray = [
    "Frog",
    "monte vettore",
    "Rottnest island",
    "Sunset",
    "Ferrari gto",
    "gransasso",
    "Liseberg",
    "Cat animal",
    "madagascar nature",
    "Coral reef"
  ];
  const text = textArray[getRandom(textArray.length - 1)];
  // console.log("searched text:", text);
  return text;
}
searchText = getRandomText();

function setPage(increase) {
  if (increase) page++;
  else page = 1;
}

function search(text, qty = 50) {
  if (text) searchText = text;
  searchQty = qty;
  classArrayIndex = 0;
  setPage(false);
  clearPage();
  getPictures();
}

export default { classArrayIndex };
export {
  apiKey,
  page,
  classArrayIndex,
  searchText,
  searchQty,
  setPage,
  search
};
