const axios = require("axios");
const cheerio = require("cheerio");

const Base_URL = "https://komikcast.com";

function Download(url) {
  return new Promise((res, rej) => {
    axios.get(url).then(({ data }) => {
      let $ = cheerio.load(data)
      let image = [];
      let title = $('div.chapter_headpost').find('h1').text()
      $('div.main-reading-area > img').get().map(s => {
        image.push($(s).attr('src'))
      })
      res({ title, image })
    }).catch(rej)
  })
}

function Latest(page = 1) {
  return new Promise((res, rej) => {
    axios.get(`${Base_URL}/project-list/page/${page}/`).then(({ data }) => {
      let $ = cheerio.load(data)
      let result = [];
      $('div.list-update_item').get().map(s => {
        let title = $(s).find('h3').text()
        let url = $(s).find('.chapter').attr('href')
        let type = $(s).find('span').text()
        let thumb = $(s).find('img').attr('src')
        let chapter = $(s).find('.chapter').text().trim().replace('Ch.', '').trim()
        let rating = $(s).find('.numscore').text().trim()
        result.push({ title, url, type, thumb, chapter, rating })
      })
      res(result)
    }).catch(rej)
  })
}

function Search(query) {
  return new Promise((res, rej) => {
    axios.get(`${Base_URL}/?s=${query}`).then(({ data }) => {
      let $ = cheerio.load(data)
      let result = [];
      $('div.list-update_item').get().map(s => {
        let title = $(s).find('h3').text()
        let url = $(s).find('a').attr('href')
        let type = $(s).find('span').text()
        let thumb = $(s).find('img').attr('src')
        let chapter = $(s).find('.chapter').text().trim().replace('Ch.', '').trim()
        let rating = $(s).find('.numscore').text().trim()
        result.push({ title, url, type, thumb, chapter, rating })
      })
      res(result)
    }).catch(rej)
  })
}

// Download("https://komikcast.com/chapter/drawing-saikyou-mangaka-wa-oekaki-skill-de-isekai-musou-suru-chapter-01-2-bahasa-indonesia/").then(console.log)
// Latest(2).then(console.log)
// Search("Yuan Zun").then(console.log)