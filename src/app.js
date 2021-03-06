const RECOMMENDATIONS_API = 'https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=6&placement.name=Below%20Article%20Thumbnails&placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init'

async function getRecommendations() {
  try {
    let response = await fetch(RECOMMENDATIONS_API);
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
  }
}

function createHeaderElement() {
  var header = document.createElement('span');
  header.className = 'header';
  var headerText = document.createTextNode("You May Like");
  header.appendChild(headerText);
  return header;
}

function createDisclosureElement() {
  var disclosure = document.createElement('span');
  disclosure.className = 'disclosure'
  var disclosureText = document.createTextNode("Sponsored Links by Taboola");
  disclosure.appendChild(disclosureText);
  return disclosure;
}

function createTop() {
  var top = document.createElement('div');
  top.className = 'top'
  header = createHeaderElement();
  top.appendChild(header);
  disclosure = createDisclosureElement();
  top.appendChild(disclosure);
  document.getElementById('main').appendChild(top);
}

function addRecommendationElements() {
  // First row of recommendations
  var recommendations1 = document.createElement('div');
  recommendations1.className = 'recommendations'
  recommendations1.id = 'recommendations1';
  document.getElementById('main').appendChild(recommendations1);

  // Second row of recommendations
  var recommendations2 = document.createElement('div');
  recommendations2.className = 'recommendations'
  recommendations2.id = 'recommendations2';
  document.getElementById('main').appendChild(recommendations2);
}

function createImageElement(element) {
  var img = document.createElement('IMG');
  img.className = 'img';
  img.setAttribute('src', element.thumbnail[0].url);
  return img;
}

function createNameElement(element) {
  var spanName = document.createElement('span');
  spanName.className = 'name';
  var name = document.createTextNode(element.name);
  spanName.appendChild(name);
  return spanName;
}

function createBrandAndCategoryElement(element) {
  var spanBranddingCategory = document.createElement('span');
  spanBranddingCategory.className = 'brand'
  var branding_text = element.categories ?
    element.branding + ' | ' + 
    element.categories[0].charAt(0).toUpperCase() + 
    element.categories[0].slice(1) : element.branding;
  var branding = document.createTextNode(branding_text);
  spanBranddingCategory.appendChild(branding);
  return spanBranddingCategory;
}

function createCardElement(element) {
  var cardDiv = document.createElement('a');
  cardDiv.className = 'card';
  cardDiv.href = element.url;

  // Add image, name, and brandding + category to card
  img = createImageElement(element);
  cardDiv.appendChild(img);
  spanName = createNameElement(element);
  cardDiv.appendChild(spanName);
  spanBranddingCategory = createBrandAndCategoryElement(element);
  cardDiv.appendChild(spanBranddingCategory);

  return cardDiv;
}

function addAllRecommendations() {
  getRecommendations().then(data => {
    if (data.list.length != 6) {
      // Did not get 6 recommendations
      addAllRecommendations();
    } else {
      // Add header and disclosure to 'main' div
      createTop();
      // Add recommendtions rows to 'main' div
      addRecommendationElements();
      cnt_row_elements = 0;
      data.list.forEach(element => {
        cardDiv = createCardElement(element);
        if (cnt_row_elements < 3) {
          // Add elements to the first row
          document.getElementById('recommendations1').appendChild(cardDiv);
          cnt_row_elements++;
        } else {
          // Add elements to the second row
          document.getElementById('recommendations2').appendChild(cardDiv);
        }
      });
    }
  });
}

document.body.onload = addAllRecommendations;
