const template = `
<div id="card-root">
  <div class="card-title-row">
    <div>
      <span class="card-date-span">[ %date% ]</span> 
      <span class="card-title-span"> %title% </span>
    </div>

    <div class="card-status %activeStyle%"> %statusText% </div>
  </div>
  <span class="card-content-span">
    %teaser%
  </span>
  <a class="card-interaction" href=" %link% ">View Log</a>
</div>
`;

function constructTemplate(values) {
  return template.replace(/%([^%]+)%/g, (match, key) => {
    return Object.prototype.hasOwnProperty.call(values, key)
      ? values[key]
      : match;
  });
}

async function fetchIndex() {
  let response = await fetch("/post_index.json");

  return await response.json();
}

async function t() {
  let index = await fetchIndex();

  console.log(index);

  for (var [post, data] of Object.entries(index)) {

    var t = constructTemplate({
      "date": data["date_posted"],
      "title": data["title"],
      "activeStyle": "card-status-active",
      "statusText": "Active",
      "teaser": data["teaser"],
      "link": `/viewer?q=${post}`,
    });

    console.log(t);

    document.getElementById("card-viewer").innerHTML += t;
  }
}

t();

