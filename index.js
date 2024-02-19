import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://developer.chrome.com/");

  await page.setViewport({ width: 1280, height: 1024 });
  await page.screenshot({ path: "./screens/first_screenshot.jpg" });

  browser.close();
})();
