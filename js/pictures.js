import { apiKey, searchText, page } from "./main.js";
import main from "./main.js";
import { updateDOM } from "./dom.js";

function loadPictures() {
  return new Promise((resolve, reject) => {
    const URL =
      "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=" +
      apiKey +
      "&text=" +
      searchText +
      "&per_page=50&page=" +
      page +
      "&format=json&nojsoncallback=1";
    fetch(URL, {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        // const getSize = async () => {
        //   return await Promise.all(
        //     data.photos.photo.map(el =>
        //       pictureSize(el).then(res => {
        //         const arr = [...res];
        //         return { ...el, size: arr };
        //       })
        //     )
        //   );
        // };
        // resolve(getSize());
        const filteredArr = data.photos.photo.filter(el => el.farm !== 0);
        resolve(filteredArr);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
}

function calcClassArray(array) {
  const arr = [];
  for (let i = 0; i <= array.length - 1; i++) {
    const index = i + main.classArrayIndex;
    const cls =
      "cl1" +
      " cl2" +
      ((index % 2) + 1) +
      " cl3" +
      ((index % 3) + 1) +
      " cl4" +
      ((index % 4) + 1) +
      " cl5" +
      ((index % 5) + 1);
    const obj = { ...array[i] };

    obj.class = cls;
    arr.push(obj);
  }
  main.classArrayIndex += array.length;
  // console.log("calcClass", arr);
  return arr;
}

const getPictures = async () => {
  const pictureArr = await loadPictures();
  const newPictureArr = [...calcClassArray(pictureArr)];
  // console.log(newPictureArr);
  updateDOM(newPictureArr);
};

function pictureSize(picture = {}) {
  return new Promise((resolve, reject) => {
    const URL =
      "https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=" +
      main.apiKey +
      "&photo_id=" +
      picture.id +
      "&format=json&nojsoncallback=1";

    fetch(URL, {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        // console.log("picSize", data.sizes.size);
        // return data.sizes.size;
        resolve(data.sizes.size);
      })
      .catch(err => {
        // console.log(err);
        reject(err);
      });
  });
}

export { loadPictures, calcClassArray, getPictures };
