import puppeteer from "puppeteer";

const searchTermCLI =
  process.argv.length >= 3 ? process.argv[2] : "web scraping";
// const url = "https://www.amazon.com/";
const url = "https://developer.chrome.com/";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1024 });

  await page.goto(url);

  const searchInputSelector = ".devsite-search-field";
  await page.waitForSelector(searchInputSelector);
  await page.type(searchInputSelector, searchTermCLI, { delay: 100 });

  const searchResultSelector = ".devsite-result-item-link";
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);

  const searchResults = "div > .gs-title";
  await page.waitForSelector(searchResults);
  await page.click(searchResults);

  const titleSelector = ".devsite-page-title";
  await page.waitForSelector(titleSelector);
  const pageTitle = await page.$eval(titleSelector, (elem) => elem.innerText);
  console.log({ pageTitle });

  await page.screenshot({ path: "./screens/screenshot.jpg" });

  browser.close();
})();
