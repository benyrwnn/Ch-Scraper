const axios = require("axios");
const cheerio = require("cheerio");

const Base_URL = "https://www.happymod.com";

function Search(query) {
  return new Promise((res, rej) => {
    axios.get(`${Base_URL}/search.html?q=${query}`).then(({ data }) => {
      let $ = cheerio.load(data)
      let result = [];
      $('div.pdt-app-box').get().map(v => {
        let title = $(v).find('a').attr('title')
        let thumb = $(v).find('img.lazy').attr('data-original')
        let rating = $(v).find('span').text()
        let url = Base_URL + $(v).find('a').attr('href')
        result.push({ title, thumb, rating, url })
      })
      res(result)
    }).catch(rej)
  })
}

// Search("Minecraft").then(console.log)