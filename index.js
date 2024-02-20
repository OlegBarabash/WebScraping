import puppeteer from "puppeteer";

const searchTermCLI =
  process.argv.length >= 3 ? process.argv[2] : "macbook pro";
const url = "https://www.amazon.com/";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1024 });

  await page.goto(url);

  const searchInputSelector = "twotabsearchtextbox";
  await page.waitForSelector(searchInputSelector);
  await page.type(searchInputSelector, searchTermCLI, { delay: 100 });

  // const searchResultSelector = ".ng-star-inserted";
  // await page.waitForSelector(searchResultSelector);

  await page.screenshot({ path: "./screens/macBook_screenshot.jpg" });

  browser.close();
})();
