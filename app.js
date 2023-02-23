// console.log('I am working');

//* GLOBALS //
let newProdArray = [];
let votingRounds = 25;

//*DOM WINDOWS*//
let imgContainer = document.getElementById("imgContainer");
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultsBtn = document.getElementById('resultsBtn');
// let resultsList = document.getElementById('results-container');

//*CANVAS ELEMENT FOR CHART*//
let ctx = document.getElementById('myChart');

//*CONSTRUCTOR FUNCTION*//
function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.image = `img/${name}.${fileExtension}`;
  this.votes = 0;
  this.views = 0;
}

//*HELPER FUNCTIONS / UTILITIES*//
function renderImg() {
  let imgOneidx = randomIndex();
  let imgTwoidx = randomIndex();
  let imgThreeidx = randomIndex();

  while (imgOneidx === imgTwoidx || imgOneidx === imgThreeidx || imgTwoidx === imgThreeidx) {
    imgOneidx = randomIndex();
    imgTwoidx = randomIndex();
    imgThreeidx = randomIndex();
  }

  imgOne.src = newProdArray[imgOneidx].image;
  imgOne.title = newProdArray[imgOneidx].name;
  imgOne.alt = `This is an image of ${newProdArray[imgOneidx].name}`;
  imgTwo.src = newProdArray[imgTwoidx].image;
  imgTwo.title = newProdArray[imgTwoidx].name;
  imgTwo.alt = `This is an image of ${newProdArray[imgTwoidx].name}`;
  imgThree.src = newProdArray[imgThreeidx].image;
  imgThree.title = newProdArray[imgThreeidx].name;
  imgThree.alt = `This is an image of ${newProdArray[imgThreeidx].name}`;

  newProdArray[imgOneidx].views++;
  newProdArray[imgTwoidx].views++;
  newProdArray[imgThreeidx].views++;
}

function randomIndex() {
  return Math.floor(Math.random() * newProdArray.length);
}

//*HELPER FUNCTION TO RENDER CHART*
function renderChart() {

let productNames = [];
let productVotes = [];
let productViews = [];

for(let i = 0; i < newProdArray.length; i++) {
  productNames.push(newProdArray[i].name);
  console.log(productNames);
  productVotes.push(newProdArray[i].votes);
  console.log(productVotes);
  productViews.push(newProdArray[i].views);
  console.log(productViews);
}
console.log(productNames,productVotes,productViews);
  let chartObj = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Votes',
        data: productVotes,
        borderWidth: 5,
        backgroundColor: ['pink'],
        borderColor: ['pink']
      },
      {
        label: '# of Views',
        data: productViews,
        borderWidth: 5,
        backgroundColor: ['yellow'],
        borderColor: ['yellow']
      }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  };



  new Chart(ctx, chartObj);

}
//*EVENT HANDLERS*//

function handleImgClick(event) {
  let imgClicked = event.target.title;
  console.dir(imgClicked);

  for (let i = 0; i < newProdArray.length; i++) {
    if (imgClicked === newProdArray[i].name) {
      newProdArray[i].votes++;
    }
  }
  // renderImg();

  votingRounds--;
  console.log(votingRounds, 'remaining rounds');

  if (votingRounds === 0) {
    imgContainer.removeEventListener('click', handleImgClick);
    // renderChart();
  }
else{
  renderImg();
}

}
function handleShowResults() {
  console.log('testing');
  if (votingRounds === 0) {

    renderChart();

    resultsBtn.removeEventListener('click', handleShowResults);
  }
}

//*EXECUTABLE CODE*//
let bag = new Product('bag');
let banana = new Product('banana');
let bathroom = new Product('bathroom');
let boots = new Product('boots');
let breakfast = new Product('breakfast');
let bubblegum = new Product('bubblegum');
let chair = new Product('chair');
let cthulhu = new Product('cthulhu');
let dogduck = new Product('dog-duck');
let dragon = new Product('dragon');
let pen = new Product('pen');
let pet = new Product('pet-sweep');
let tauntaun = new Product('tauntaun');
let unicorn = new Product('unicorn');
let water = new Product('water-can');
let wine = new Product('wine-glass');

newProdArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogduck, dragon, pen, pet, tauntaun, unicorn, water, wine);

renderImg();
console.log(resultsBtn);

imgContainer.addEventListener('click', handleImgClick);
resultsBtn.addEventListener('click', handleShowResults);
