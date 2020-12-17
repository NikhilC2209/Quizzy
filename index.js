const nightmare = require("nightmare")();
const fetch = require("node-fetch");
require("dotenv").config();

scraper();

async function scraper() {
    const url = process.env.QUIZ_API_URL;
    const result = await nightmare.goto(url)
    .wait("#trivia_amount")
    .type('#trivia_amount', '')
    .type('#trivia_amount', 1)
    .select('select[name="trivia_category"]','9')
    .select('select[name="trivia_difficulty"]','medium')
    .click('#page-top > div.container > form > button')
    .wait('#page-top > div:nth-child(2) > div > input')
    .evaluate(() => document.querySelector("#page-top > div:nth-child(2) > div > input").value)
    .end()

    console.log(result)

    fetch(result)
        .then(res => res.json())
        .then(data => {
           console.log(data["results"][0]["question"])
        });
}    