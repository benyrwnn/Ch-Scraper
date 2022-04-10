const axios = require("axios");
const cheerio = require("cheerio");

const Base_URL = "https://hanime.tv";

function Latest() {
  return new Promise((res, rej) => {
    axios.get(Base_URL).then(({ data }) => {
      let $ = cheerio.load(data)
      let result = [];
      $('div.elevation-3').get().map(v => {
        let title = $(v).find('a').attr('alt')
        let views = $(v).find('.hv-subtitle').text().trim()
        let url = Base_URL + $(v).find('a').attr('href')
        result.push({ title, views, url })
      })
      res(result)
    }).catch(rej)
  })
}

// Latest().then(console.log)