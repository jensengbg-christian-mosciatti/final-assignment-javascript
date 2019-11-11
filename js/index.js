import { setPage, search } from "./main.js";
import { getPictures } from "./pictures.js";

window.addEventListener("load", function(event) {
  search();
});

let cached = null;
window.addEventListener("scroll", event => {
  if (!cached) {
    setTimeout(() => {
      let scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      if (window.scrollY + window.outerHeight > scrollHeight - 1000) {
        // console.log(
        //   "position",
        //   document.querySelector(".cont1").getBoundingClientRect().bottom,
        // );
        // console.warn(
        //   "It's scrolling THROTTLED! ",
        //   window.scrollY,
        //   window.scrollX,
        //   scrollHeight,
        //   window
        // );

        setPage(true);
        getPictures();
      }

      cached = null;
    }, 500);
  }
  cached = event;
});

document.querySelector("main").addEventListener("click", event => {
  if (event.target.src !== undefined) {
    const lightbox = document.querySelector(".lightbox");
    lightbox.childNodes[1].childNodes[1].setAttribute(
      "href",
      event.target.attributes.srclightbox.value
    );
    const img = document.createElement("img");
    img.setAttribute("src", event.target.attributes.src.value);
    img.setAttribute("alt", "image");
    img.classList.add("preview");
    lightbox.childNodes[1].childNodes[1].appendChild(img);

    // lightbox.childNodes[1].childNodes[1].childNodes[1].setAttribute(
    //   "src",
    //   event.target.attributes.src.value
    // );
    lightbox.childNodes[1].childNodes[1].classList.add("replace");
    // lightbox.childNodes[1].childNodes[1].childNodes[1].classList.add("preview");
    lightbox.classList.toggle("display");
  }
});

document.querySelector(".lightbox").addEventListener("click", function(event) {
  document.querySelector(".lightbox").classList.add("display");
  const lightbox = document.querySelector(".lightbox");
  lightbox.childNodes[1].childNodes[1].setAttribute("href", "#");
  while (lightbox.childNodes[1].childNodes[1].firstChild) {
    lightbox.childNodes[1].childNodes[1].removeChild(
      lightbox.childNodes[1].childNodes[1].firstChild
    );
  }
  // event.preventDefault();
});

function toggleSearch() {
  // if (open) section.classList.remove("searchSlide");
  // else section.classList.add("searchSlide");
  const classAdded = document
    .querySelector(".search")
    .classList.toggle("searchSlide");
  const toggle = document.querySelector(".toggle");
  toggle.classList.toggle("toggle-bckground");
  if (!classAdded) document.getElementById("search-text").focus();
  // toggle.classList.toggle("toggle-slide");
}

document.getElementById("search-submit").addEventListener("click", event => {
  event.preventDefault();
  const text = document.getElementById("search-text").value;
  if (text.length) {
    // main.searchText = text;
    search(text);
    // document.querySelector(".search").classList.toggle("displayI");
    document.getElementById("search-text").value = "";
    toggleSearch();
  }
});

document.getElementById("checkbox").addEventListener("click", function() {
  toggleSearch();
});

document.querySelector("body").addEventListener(
  "keyup",
  function(event) {
    const key = event.which || event.keyCode;
    if (key === 27) {
      const lightbox = document.querySelector(".lightbox");
      if (!lightbox.classList.contains("display")) {
        lightbox.classList.toggle("display");
      } else toggleSearch();
    }
  },
  false
);

// Test Test Test Test Test Test Test Test Test Test Test
const getTest = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // console.log("getTest", el);
      resolve("hej");
    }, 500);
  });
};

function getSize(pictureObj) {
  const getData = async () => {
    // console.log("picSizeCall: ", pictureObj);
    return await pictureSize(pictureObj);
  };
  //   const obj = { dimensions: await pictureSize(pictureObj) };
  //   return { dimensions: getData().then() };
  getData().then(data => {
    return { dimensions: data };
  });
  //   return await { ...pictureObj, ...obj };
  //   return await obj;
}

// "cl1 cl22 cl32 cl42 cl55"
// "cl1 cl21 cl33 cl43 cl51"
