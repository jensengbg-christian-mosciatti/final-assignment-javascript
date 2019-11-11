function getPictureURL(picture = {}, lightbox = false) {
  //   https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
  //   or
  //   https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
  //   or
  //   https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{o-secret}_o.(jpg|gif|png)
  if (picture.size !== undefined) {
    return picture.size[6].source;
  } else {
    const suffix = lightbox ? "_b" : "_n";
    return (
      "https://farm" +
      picture.farm +
      ".staticflickr.com/" +
      picture.server +
      "/" +
      picture.id +
      "_" +
      picture.secret +
      suffix +
      ".jpg"
    );
  }
}

function updateDOM(pictures = {}) {
  // const parentEl = document.querySelector(".cont1");
  const parentEl = document.querySelector(".grid");
  // console.log(parentEl.children[0]);
  for (let picture of pictures) {
    // const childHTML = setHTML(picture)

    // parentEl.appendChild;
    const newItem = document.createElement("img");
    newItem.className = picture.class;
    newItem.setAttribute("flickrId", picture.id);
    // newItem.setAttribute("src", picture.size[6].source);
    newItem.setAttribute("srclightbox", getPictureURL(picture, true));
    newItem.setAttribute("src", getPictureURL(picture));

    // newItem.innerHTML = childHTML;
    parentEl.children[0].appendChild(newItem);
  }

  // for (let i = 5; i > 0; i--) {
  //   const element = parentEl.children[i];
  //   if (element !== undefined && element !== null) {
  //     element.remove();
  //   }
  // }
  for (let i = 2; i <= 5; i++) {
    const clonedNode = parentEl.children[0].cloneNode(true);
    clonedNode.classList.replace("cont1", "cont" + i);
    // console.log("clone", clonedNode);

    if (
      parentEl.children[i - 1] !== undefined &&
      parentEl.children[i - 1] !== null
    ) {
      parentEl.replaceChild(clonedNode, parentEl.children[i - 1]);
    } else {
      parentEl.appendChild(clonedNode);
    }
  }
}

function clearPage() {
  const parentEl = document.querySelector(".grid");
  while (parentEl.firstChild) {
    parentEl.removeChild(parentEl.firstChild);
  }
  const newItem = document.createElement("div");
  newItem.className = "container cont1";
  parentEl.appendChild(newItem);
}

export { updateDOM, clearPage };
