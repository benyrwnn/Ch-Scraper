const axios = require("axios");
const cheerio = require("cheerio");

const Base_URL = "https://meownime.moe/";

function Ongoing(page = 1) {
  return new Promise((res, rej) => {
    axios.get(`${Base_URL}tag/ongoing/page/${page}`).then(({ data }) => {
      let $ = cheerio.load(data)
      let result = [];
      $('div.featured-thumb').get().map(v => {
        let title = $(v).find('a').attr('title')
        let url = $(v).find('a').attr('href')
        let thumb = $(v).find('img').attr('src')
        let episode = $(v).find('.postedon').text().replace('Episode', '').trim()
        result.push({ title, url, thumb, episode })
      })
      res(result)
    }).catch(rej)
  })
}

function Search(query) {
  return new Promise((res, rej) => {
    axios.get(`${Base_URL}?s=${query}`).then(({ data }) => {
      let $ = cheerio.load(data)
      let result = [];
      $('div.featured-thumb').get().map(v => {
        let title = $(v).find('a').attr('title')
        let url = $(v).find('a').attr('href')
        let thumb = $(v).find('img').attr('src')
        let score = $(v).find('.postedon').text()
        result.push({ title, url, thumb, score })
      })
      res(result)
    }).catch(rej)
  })
}

// Ongoing(2).then(console.log)
// Search("Date a live").then(console.log)