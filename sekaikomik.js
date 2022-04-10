const axios = require("axios");
const cheerio = require("cheerio");

const Base_URL = "http://www.sekaikomik.live/";

function Populer() {
  return new Promise((res, rej) => {
    axios.get(Base_URL).then(({ data }) => {
      let $ = cheerio.load(data)
      let result = [];
      $('div.bs').get().map(v => {
        let title = $(v).find('a').attr('title')
        let url = $(v).find('a').attr('href')
        let thumb = $(v).find('img').attr('src')
        let chapter = $(v).find('.epxs').text().trim().replace('Chapter', '').trim()
        let score = $(v).find('.numscore').text().trim()
        result.push({ title, url, thumb, chapter, score })
      })
      res(result)
    }).catch(rej)
  })
}

// Populer().then(console.log)