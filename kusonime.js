const axios = require("axios");
const cheerio = require("cheerio");

const Base_URL = "https://kusonime.com/";

function Latest(page = 1) {
  return new Promise((res, rej) => {
    axios.get(`${Base_URL}page/${page}/`).then(({ data }) => {
      let $ = cheerio.load(data)
      let result = [];
      $('div.kover').get().map(v => {
        let title = $(v).find('a').attr('title')
        let genre = $(v).find('p').text().trim().split('Genre')[1].trim()
        let url = $(v).find('a').attr('href')
        let thumb = $(v).find('img').attr('src')
        result.push({ title, genre, url, thumb })
      })
      res(result)
    }).catch(rej)
  })
}

function Search(query, page = 1) {
  return new Promise((res, rej) => {
    axios.get(`${Base_URL}page/${page}/?s=${query}`).then(({ data }) => {
      let $ = cheerio.load(data)
      let result = [];
      $('div.kover').get().map(v => {
        let title = $(v).find('a').attr('title')
        let genre = $(v).find('p').text().trim().split('Genre')[1].trim()
        let url = $(v).find('a').attr('href')
        let thumb = $(v).find('img').attr('src')
        result.push({ title, genre, url, thumb })
      })
      res(result)
    }).catch(rej)
  })
}

// Latest(2).then(console.log)
// Search("one piece", 2).then(console.log)