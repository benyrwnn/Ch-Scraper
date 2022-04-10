const axios = require("axios");
const cheerio = require("cheerio");

const Base_URL = "https://www.wallpaperbetter.com/en";

function Search(query) {
  return new Promise((res, rej) => {
    axios.get(`${Base_URL}/search?q=${query}`).then(({ data }) => {
      let $ = cheerio.load(data)
      let result = [];
      $('a > img.lazy').get().map(v => {
        result.push($(v).attr('data-src'))
      })
      res(result)
    }).catch(rej)
  })
}

// Search("anime").then(console.log)