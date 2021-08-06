const RECOMMENDATIONS = 'https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=6&placement.name=Below%20Article%20Thumbnails&placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init'

async function getRecommendations() {
  let response = await fetch(RECOMMENDATIONS);
  let data = await response.json();
  return data;
}
getRecommendations().then(data => console.log(data.list))

function addElement() {
  getRecommendations().then(data => {

    var header = document.createElement('h3');
    var headerText = document.createTextNode("You May Like");
    header.className = 'header';
    header.appendChild(headerText);
    document.getElementById('main').appendChild(header);

    var allRecommendations = document.createElement('div');
    allRecommendations.className = 'recommendations'
    document.getElementById('main').appendChild(allRecommendations);
    
    data.list.forEach(element => {
      console.log(element) // TODO - delete

      // Create new elements
      var cardDiv = document.createElement('div');
      cardDiv.className = 'card';
      var br = document.createElement('br');
      var br1 = document.createElement('br');
      var spanName = document.createElement('span');
      spanName.className = 'name';
      var spanBrandding = document.createElement('span');
      spanBrandding.className = 'brand'

      // Add content
      var name = document.createTextNode(element.name);
      var branding = document.createTextNode(element.branding);
      var img = document.createElement('IMG');
      img.className = 'img';
      img.setAttribute('src', element.thumbnail[0].url);

      // add the text node to the newly created div
      cardDiv.appendChild(img);
      cardDiv.appendChild(br1);
      cardDiv.appendChild(spanName);
      spanName.appendChild(name);
      cardDiv.appendChild(br);
      cardDiv.appendChild(spanBrandding);
      spanBrandding.appendChild(branding);
      
      // add the newly created element and its content into the DOM
      allRecommendations.appendChild(cardDiv);
    });
    
  })
}

document.body.onload = addElement;
