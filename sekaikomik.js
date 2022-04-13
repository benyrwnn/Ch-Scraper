const axios = require("axios");
const cheerio = require("cheerio");

const Base_URL = "http://www.sekaikomik.live";

function Populer() {
  return new Promise((res, rej) => {
    axios.get(Base_URL).then(({ data }) => {
      let $ = cheerio.load(data)
      let result = [];
      $('div.bs').get().map(v => {
        let title = $(v).find('a').attr('title')
        let chapter = $(v).find('.epxs').text().trim().replace('Chapter', '').trim()
        let rating = $(v).find('.numscore').text().trim()
        let url = $(v).find('a').attr('href')
        let thumb = $(v).find('img').attr('src')
        result.push({ title, url, thumb, chapter, rating })
      })
      res(result)
    }).catch(rej)
  })
}

function Latest(page = 1) {
  return new Promise((res, rej) => {
    axios.get(`${Base_URL}/manga/?page=${page}&order=update`).then(({ data }) => {
      let $ = cheerio.load(data)
      let result = [];
      $('div.bs').get().map(s => {
        let title = $(s).find('a').attr('title')
        let chapter = $(s).find('.epxs').text().replace('Chapter', '').trim()
        let rating = $(s).find('.numscore').text().trim()
        let thumb = $(s).find('img').attr('src')
        let url = $(s).find('a').attr('href')
        result.push({ title, chapter, rating, thumb, url })
      })
      res(result)
    }).catch(rej)
  })
}

function Search(query, page = 1) {
  return new Promise((res, rej) => {
    axios.get(`${Base_URL}/page/${page}/?s=${query}`).then(({ data }) => {
      let $ = cheerio.load(data)
      let result = [];
      $('div.bs').get().map(s => {
        let title = $(s).find('a').attr('title')
        let chapter = $(s).find('.epxs').text().replace('Chapter', '').trim()
        let rating = $(s).find('.numscore').text().trim()
        let thumb = $(s).find('img').attr('src')
        let url = $(s).find('a').attr('href')
        result.push({ title, chapter, rating, thumb, url })
      })
      res(result)
    }).catch(rej)
  })
}

async function Download(url) {
  let res = await axios.get(url)
  let $ = cheerio.load(res.data)
  let title = $('div.headpost').find('h1').text()
  let data = $('script').map((idx, el) => $(el).html()).toArray()
  data = data.filter(v => /wp-content/i.test(v))
  data = eval(data[0].split('"images":')[1].split('}],')[0])
  return { title, images: data.map(v => encodeURI(v)) }
}

// Populer().then(console.log)
// Latest(2).then(console.log)
// Search("he", 2)
// Download("https://www.sekaikomik.live/sextudy-group-chapter-14/").then(console.log)