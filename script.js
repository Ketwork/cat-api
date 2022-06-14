const apiKey = 'e43253b3-3f60-4f8d-b55e-8ec89a267d09'
const url = 'https://api.thecatapi.com/v1/images/search'
const breedUrl = 'https://api.thecatapi.com/v1/breeds'

const catName = document.querySelector("#name");
const catDescription = document.querySelector("#discription");
const catsImgDiv = document.querySelector(".catsImgDiv")
const temperament = document.querySelector(".temperament-wrapper");

const generate_btn = document.querySelector(".generate_btn");

// generate_btn.addEventListener("click", fetchPic);
generate_btn.addEventListener("click", getRandomCat);


// V2 generates random cat with breed name, image and description
async function fetchAllCats() {
  const response = await fetch(breedUrl);
  const cats =  await response.json();
  return cats;
}

async function getAllCatsIds() {
  const cats = await fetchAllCats();
  const ids = cats.map(cat => cat.id);
  return ids;
}

async function getRandomCat() {
  
  catsImgDiv.innerHTML = '';

  const catsIds = await getAllCatsIds();
  const catId = catsIds[Math.floor(Math.random() * catsIds.length)];

  const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${catId}`);
  const catArray = await response.json();
  console.log(catArray[0].breeds[0].temperament)

  const catsImgUrl = catArray[0].url
  const catBreeds = catArray[0].breeds[0];

  let catsImgEl = document.createElement('img')
  catsImgEl.setAttribute('src', `${catsImgUrl}`)
  catsImgEl.classList.add("showcase")
  catsImgDiv.appendChild(catsImgEl)

  catName.innerText = catBreeds.name
  catDescription.innerText = catBreeds.description

  temperament.innerHTML =  catBreeds.temperament.trim().split(',').map(temperament => {
    return `<span class="temperament"> ${temperament} </span>`;
  });
}


// V1 generates random image only
// function fetchPic() {
//   catsImgDiv = document.querySelector(".catsImgDiv")
//   catsImgDiv.innerHTML = '';

//   fetch(url, { 
//     headers: {
//       'x-api-key' : apiKey
//       }
//     })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data[0])
//     let catsImgUrl = data[0].url

//     let catsImgEl = document.createElement('img')
//     catsImgEl.setAttribute('src', `${catsImgUrl}`)
//     catsImgEl.classList.add("showcase")
  
//     let catsImgDiv = document.querySelector(".catsImgDiv")
//     catsImgDiv.appendChild(catsImgEl)

//   })
//   .catch(err => console.log(err));
// }