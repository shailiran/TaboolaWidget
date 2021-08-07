const RECOMMENDATIONS = 'https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=6&placement.name=Below%20Article%20Thumbnails&placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init'

async function getRecommendations() {
  try {
    let response = await fetch(RECOMMENDATIONS);
    let data = await response.json();
    while (!data.list) {
      response = await fetch(RECOMMENDATIONS);
      data = await response.json();
    }
    return data;
  } catch (error) {
    console.log(error)
  }
}

function addElement() {
  getRecommendations().then(data => {

    // Add header and disclosure
    addTop();

    var recommendations_1 = document.createElement('div');
    recommendations_1.className = 'recommendations'
    document.getElementById('main').appendChild(recommendations_1);

    var recommendations_2 = document.createElement('div');
    recommendations_2.className = 'recommendations'
    document.getElementById('main').appendChild(recommendations_2);
    
    cnt_row = 0;
    console.log(data);
    data.list.forEach(element => {
      // Create new elements
      var cardDiv = document.createElement('div');
      cardDiv.className = 'card';
      var br = document.createElement('br');

      // Redirect to url
      cardDiv.addEventListener('click', () => {
        window.location.replace(element.url)
      });

      // Add content
      var spanName = document.createElement('a');
      spanName.className = 'name';
      var spanBrandding = document.createElement('span');
      spanBrandding.className = 'brand'
      var name = document.createTextNode(element.name);
      var branding_text = element.categories ?
        element.branding + ' | ' + 
        element.categories[0].charAt(0).toUpperCase() + 
        element.categories[0].slice(1) : element.branding;
      var branding = document.createTextNode(branding_text);
      var img = document.createElement('IMG');
      img.className = 'img';
      img.setAttribute('src', element.thumbnail[0].url);

      // add the text node to the newly created div
      cardDiv.appendChild(img);
      cardDiv.appendChild(br);
      cardDiv.appendChild(spanName);
      spanName.appendChild(name);
      cardDiv.appendChild(spanBrandding);
      spanBrandding.appendChild(branding);
      
      // add the newly created element and its content into the DOM
      if (cnt_row < 3) {
        // Add elements to the first row
        recommendations_1.appendChild(cardDiv);
        cnt_row++;
      } else {
        // Add elements to the second row
        recommendations_2.appendChild(cardDiv);
      }
    });
    
  })
}

function addTop() {
  var top = document.createElement('div');
  top.className = 'top'

  var header = document.createElement('span');
  header.className = 'header';
  var headerText = document.createTextNode("You May Like");
  header.appendChild(headerText);

  var disclosure = document.createElement('span');
  disclosure.className = 'disclosure'
  var disclosureText = document.createTextNode("Sponsored Links by Taboola");
  disclosure.appendChild(disclosureText);

  top.appendChild(header);
  top.appendChild(disclosure);

  document.getElementById('main').appendChild(top);
}

document.body.onload = addElement;
