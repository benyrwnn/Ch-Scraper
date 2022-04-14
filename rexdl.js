const axios = require("axios");
const cheerio = require("cheerio");

const Base_URL = "https://rexdl.com";

async function Home(page = 1) {
  let res = await axios(`${Base_URL}/page/${page}/`)
  let $ = cheerio.load(res.data)
  let result = [];
  $('div.post-content').each(function () {
    let title = $(this).find('.post-title > a').text()
    let url = $(this).find('.post-title > a').attr('href')
    let release = $(this).find('.post-date').text()
    let type = $(this).find('.post-category').text()
    let desc = $(this).find('.entry.excerpt').text().trim()
    result.push({ title, url, release, type, desc })
  })
  return result
}

async function Search(query) {
  let res = await axios(`${Base_URL}/?s=${query}`)
  let $ = cheerio.load(res.data)
  let result = [];
  $('div.post-content').each(function () {
    let title = $(this).find('.post-title > a').text()
    let url = $(this).find('.post-title > a').attr('href')
    let release = $(this).find('.post-date').text()
    let type = $(this).find('.post-category').text()
    let desc = $(this).find('.entry.excerpt').text().trim()
    result.push({ title, url, release, type, desc })
  })
  return result
}

async function Download(url) {
  let res = await axios(url)
  let $ = cheerio.load(res.data)
  let result = [];
  $('#dlbox > ul.dl > a').each(function () {
    result.push($(this).attr('href'))
  })
  return result
}

// Home(2).then(console.log)
// Search("Minecraft").then(console.log)
// Download("https://rexdlbox.com/index.php?id=picsart-photo-studio-full-premium-unlocked-final-apk").then(console.log)
