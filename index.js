import puppeteer from "puppeteer";
import fs from "fs-extra";

// const SBR_WS_ENDPOINT =
//   "wss://brd-customer-hl_7e2f3345-zone-scraping_cars:yggiufuzayq9@brd.superproxy.io:9222";
const URL = "https://www.icarros.com.br/comprar/volkswagen/gol?reg=city";

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1024 });
    page.setDefaultNavigationTimeout(2 * 60 * 1000);
    // await page.goto(URL);

    // await page.waitForSelector(".offer-card");

    // const carsLinks = await getLinksFromPage(page);

    // for (let i = 1; i < 10; i += 1) {
    //   await nextPage(page);
    //   await page.waitForNavigation();
    //   carsLinks.push(...(await getLinksFromPage(page)));
    // }

    // fs.writeFile(
    //   "carsLinks.json",
    //   JSON.stringify(carsLinks, null, 4),
    //   (err) => {
    //     if (err) throw err;
    //     console.log("File saved");
    //   }
    // );

    const carsLinks = await fs.readJson("./fixedCarsLinks.json");

    const carsListInfo = [];

    for (let i = 0; i < carsLinks.length; i += 1) {
      const { url } = carsLinks[i];
      console.log("Processing car:", url);
      await page.goto(url);

      // await page.waitForSelector(".sectionlimit .detalhes-anuncio ");
      console.log("Going to");
      await page.waitForSelector(".sectionlimit .conteudo-anuncio");

      const infoNote = await page.$$(".card-conteudo span");
      const info = await Promise.all(
        infoNote.map(async (li) => {
          return await li.evaluate((sp) => sp.textContent);
        })
      );
      console.log("Have info", info);

      carsListInfo.push({
        offer_url: url,
        title: await page.$eval("#ctdoTopo h1", (elem) => elem.innerText),
        car_year: info[0],
        car_millage: info[1],
        color: info[2],
      });
    }

    // const carsListInfo = await Promise.all(
    //   carsLinks.map(async ({ url }) => {
    //     console.log("Processing car:", url);
    //     await page.goto(url);
    //     // await page.waitForSelector(".sectionlimit .detalhes-anuncio ");
    //     console.log("Going to");
    //     await page.waitForSelector(".sectionlimit .conteudo-anuncio");

    //     const info = await page.$$eval(
    //       ".card-conteudo .primeiro span",
    //       (elements) =>
    //         elements.map((e) => e.querySelector(".destaque").innerText)
    //     );
    //     console.log("Have info", info);
    //     return {
    //       offer_url: url,
    //       title: await page.$eval("#ctdoTopo h1", (elem) => elem.innerText),
    //       car_year: info[0],
    //       car_millage: info[1],
    //       color: info[2],
    //     };
    //   })
    // );

    console.log("carsListInfo", carsListInfo);
  } catch (error) {
    console.error("ERROR - ", error);
  } finally {
    browser.close();
  }
})();

// const getLinksFromPage = async (p) =>
//   await p.$$eval("#cards-grid .offer-card   ", (elements) =>
//     elements.map((e) => ({
//       url: e.querySelector("a").href,
//     }))
//   );

// const nextPage = async (p) => {
//   const selector =
//     ".pagination .ids-icon-button__neutral .itaufonts_seta_right";
//   await p.waitForSelector(selector);
//   await p.click(selector);
// };
//---------------------------------------------------------------------------------------------------------------------
// const searchTermCLI =
//   process.argv.length >= 3 ? process.argv[2] : "web scraping";
// const url = "https://www.amazon.com/";
// const url = "https://developer.chrome.com/";

// (async () => {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();
//   await page.setViewport({ width: 1280, height: 1024 });

//   await page.goto(url);

//   const searchInputSelector = ".devsite-search-field";
//   await page.waitForSelector(searchInputSelector);
//   await page.type(searchInputSelector, searchTermCLI, { delay: 100 });

//   const searchResultSelector = ".devsite-result-item-link";
//   await page.waitForSelector(searchResultSelector);
//   await page.click(searchResultSelector);

//   const searchResults = "div > .gs-title";
//   await page.waitForSelector(searchResults);
//   await page.click(searchResults);

//   const titleSelector = ".devsite-page-title";
//   await page.waitForSelector(titleSelector);
//   const pageTitle = await page.$eval(titleSelector, (elem) => elem.innerText);
//   console.log({ pageTitle });

//   await page.screenshot({ path: "./screens/screenshot.jpg" });

//   browser.close();
// })();
