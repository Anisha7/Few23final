// HELPERS
// https://stackoverflow.com/questions/27979002/convert-csv-data-into-json-format-using-javascript
// Converts csv to json
function csvJSON(csv) {
  const lines = csv.split("\n");
  const result = [];
  const headers = lines[0].split(",");

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) continue;
    const obj = {};
    const currentline = lines[i].split(",");

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }
  return result;
}

const url = "https://anisha7.github.io/Few23final/world-happiness/2019.csv";
fetch(url)
  .then(res => res.text())
  .then(csv => {
    const json = csvJSON(csv);
    console.log(json);
    drawChallenge2(json);
    drawChallenge3(json);
  });

function drawChallenge2(json) {
  const data = {};
  data["Year"] = "2019";
  data["Number of countries"] = `${json.length}`;
  createDataTable(data, "ch2");
}

function getTop10(data) {
  const result = {};
  const keys = Object.keys(data);
  keys.sort((a, b) => {
    data[a] - data[b];
  });

  for (i = 0; i < 10; i++) {
    const key = keys[i];
    result[key] = data[key];
  }

  return result;
}

function drawChallenge3(json) {
  const gdpData = {};
  const supportData = {};
  const healthData = {};
  const genorisyData = {};
  json.forEach(d => {
    const country = d["Country or region"];
    const GDPscore = d["GDP per capita"];
    const supportScore = d["Social support"];
    const healthScore = d["Healthy life expectancy"];
    const generosityScore = d["Generosity"];
    gdpData[country] = GDPscore;
    supportData[country] = supportScore;
    healthData[country] = healthScore;
    genorisyData[country] = generosityScore;
  });

  const top10gdpData = getTop10(gdpData);
  const top10supportData = getTop10(supportData);
  const top10healthData = getTop10(healthData);
  const top10genoristyData = getTop10(genorisyData);

  createDataTable(top10gdpData, "ch3-GDP");
  createDataTable(top10supportData, "ch3-support");
  createDataTable(top10healthData, "ch3-expectancy");
  createDataTable(top10genoristyData, "ch3-generosity");

  // challenge 4
  createBarGraphDiff(
    top10gdpData,
    Object.values(top10gdpData).reduce(
      (acc, curr) => parseFloat(acc) + parseFloat(curr),
      0
    ),
    "ch4-GDP"
  );
  createBarGraphDiff(
    top10supportData,
    Object.values(top10supportData).reduce(
      (acc, curr) => parseFloat(acc) + parseFloat(curr),
      0
    ),
    "ch4-support"
  );
  createBarGraphDiff(
    top10healthData,
    Object.values(top10healthData).reduce(
      (acc, curr) => parseFloat(acc) + parseFloat(curr),
      0
    ),
    "ch4-expectancy"
  );
  createBarGraphDiff(
    top10genoristyData,
    Object.values(top10genoristyData).reduce(
      (acc, curr) => parseFloat(acc) + parseFloat(curr),
      0
    ),
    "ch4-generosity"
  );
}


function createBarGraphDiff(data, total, id) {
    const container = document.getElementById(id);
  
    const barsDiv = document.createElement("div");
    barsDiv.style.width = "800px";
    barsDiv.style.height = "400px";
    barsDiv.style.borderLeft = "1px solid #515ada";
    barsDiv.style.borderBottom = "1px solid #515ada";
    barsDiv.style.display = "flex";
    barsDiv.style.flexDirection = "row";
    barsDiv.style.alignItems = "flex-end";
  //   barsDiv.style.backgroundColor = "#3c3c3c";
  
    const labelsDiv = document.createElement("div");
    labelsDiv.style.width = "400px";
    labelsDiv.style.display = "flex";
    labelsDiv.style.flexDirection = "row";
    labelsDiv.style.alignItems = "flex-end";
  
    Object.keys(data).forEach(key => {
      console.log(key, data[key]);
      const el = document.createElement("div");
      el.style.width = `100px`;
      el.style.height = `${(data[key] / total) * 700}%`;
      el.style.border = "1px solid #515ada";
      el.style.marginLeft = "20px";
      el.style.borderTopLeftRadius = "25px";
      el.style.borderTopRightRadius = "25px";
      // text
      el.style.fontSize = "16px";
      el.style.textAlign = "center";
      el.innerText = `${data[key]}`;
      el.style.paddingBottom = "20px";
      // colors
      el.style.background = "linear-gradient(135deg, #efd5ff 0%, #515ada 100%)";
      // append to graph
      barsDiv.appendChild(el);
  
      // labels
      const el_label = document.createElement("div");
      el_label.style.width = `100px`;
      el_label.style.height = "20px";
      el_label.style.marginLeft = "20px";
      el_label.style.marginTop = "10px";
      el_label.style.textAlign = "center";
      el_label.style.fontSize = "16px";
      el_label.style.fontWeight = "bold";
      el_label.innerText = key;
      labelsDiv.appendChild(el_label);
    });
    
    container.appendChild(barsDiv);
    container.appendChild(labelsDiv);
  }