const startYear = 2015;
const endYear = 2019;

// const p1 = fetch('2017.csv').then(res => res.text())
// const p2 = fetch('2018.csv').then(res => res.text())
// const p3 = fetch('2019.csv').then(res => res.text())
// Promise.all([p1, p2, p3])
//     .then((array) => {})


// reads from csv files
function getDataPromise(url) {
  return fetch(url)
    .then(res => res.text())
}

function setup() {
  // const urlPrefix = "./world-happiness/" // local
  const urlPrefix = "https://anisha7.github.io/Few23final/world-happiness"; // live
  let curr = startYear;

  const jsonArray = [];
  const promises = []
  while (curr < endYear) {
    const url = `${urlPrefix}/${curr}.csv`;
    promises.push(getDataPromise(url))
    curr += 1;
  }

  Promise.all(promises)
    .then((arr) => {
        arr.forEach(s => {
            // console.log(csvJSON(s)) 
            jsonArray.push(csvJSON(s))
        })
        console.log(jsonArray)
        challenge2(jsonArray);
    })
}

setup()

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

function challenge2(jsonArray) {
  console.log("HERE")
  const data = {}; // key = year, value = # countries
  let i = 0;
  while (i < jsonArray.length) {
    data[startYear + i] = jsonArray[i].length;
  }
  console.log(data);
  // create visual with data
  createDataTable(data, "container")
}
