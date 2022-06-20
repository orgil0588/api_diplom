const fs = require('fs')
const { Key } = require('selenium-webdriver');
const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const HtmlTableToJson = require('html-table-to-json');




// selenium deer ajillah code 
async function openChromeTest(element) {

  let code = element.code.toString(), ticker = element.ticker;

  try {
    let options = new chrome.Options();

    let driver = await new Builder()
      .setChromeOptions(options)
      .forBrowser('chrome')
      .build();

    await driver.get(`https://mse.mn/mn/company/${code}`);

    await driver.findElement(By.xpath('//*[@id="trade_news"]/div/ul/li[2]/a')).click();

    await driver.sleep(1000);

    await driver.findElement(By.xpath('//*[@id="startdate"]')).sendKeys(Key.CONTROL, 'a');

    await driver.findElement(By.xpath('//*[@id="startdate"]')).sendKeys(Key.RETURN, '01/01/1990');

    await driver.sleep(1000);

    const html = await driver.findElement(By.xpath('//*[@id="ajaxTradeHistory"]')).getAttribute('innerHTML');

    const obj = HtmlTableToJson.parse(html);

    const loop = obj.results;

    let arr = [];

    loop[0].map(e => {
      arr.push(Object.assign(e, { code: parseInt(code) }, { ticker: ticker }))
    });

    driver.quit();

    return arr;

  } finally {
    console.log('')
  }



}

// init json-g unshij dawtaltaar data-g tataj avah
const loop = async () => {

  const data = JSON.parse(fs.readFileSync('data/init.json'))

  let resultArr = [];

  const length = data.length;

  for (let i = 0; i < length; i++) {

    const result = await openChromeTest(data[i]);

    console.log(i)

    resultArr.push(...result);

  }

  return resultArr;
}

// table-aas tuuj avsan medeelliig json file bolgono

const writeFile = async () => {

  const file = JSON.stringify(await loop());

  fs.writeFileSync('data/result.json', file, function (err) {

    return console.log(err || 'Result is created successfully.');

  });

}

// amjilttai tatagdsan hanshiin .json file generate hiine 

const checker = async () => {

  await writeFile();

  const res = JSON.parse(fs.readFileSync('data/result.json'));

  const uniqueIds = [];

  const unique = res.filter(element => {

    const isDuplicate = uniqueIds.includes(element.ticker);

    if (!isDuplicate) {

      uniqueIds.push(element.ticker);

      return true;

    }

    return false;

  });

  fs.writeFileSync('data/checklist.json', JSON.stringify(uniqueIds), function (err) {

    return console.log(err || 'Checkedlist created success!!!')

  })


}

// dutuu tatagdsan hanshiin .json generate hiine
const compare = async () => {

  await checker();

  const init = JSON.parse(fs.readFileSync('data/init.json'));
  const result = JSON.parse(fs.readFileSync('data/checklist.json'));

  let nonfound = []

  init.map(e => {

    const found = result.find((element) => element === e.ticker)

    if (!found) {

      nonfound.push(e)
    }

  })


  fs.writeFileSync('data/nonfound.json', JSON.stringify(nonfound), function (err) {
    return console.log(err || "non found file success")
  })

}

// result.json iig csv ruu horwuulne
const converter = async () => {
  await compare()
  const items = JSON.parse(fs.readFileSync('data/result.json'));
  const replacer = (key, value) => value === null ? '' : value
  const header = Object.keys(items[0])
  const csv = [
    header.join(','), // header row first
    ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
  ].join('\r\n')

  fs.writeFileSync('data/result.csv', csv, function (err) {
    return console.log(err || "non found file success")
  })
  console.log(csv)
}


 converter()
// const repeatLoop = async () => {

//   const data = JSON.parse(fs.readFileSync('data/nonfound.json'))

//   let resultArr = [];

//   const length = data.length;

//   for (let i = 0; i < length; i++) {

//     const result = await openChromeTest(data[i]);

//     console.log(i)

//     resultArr.push(...result);

//   }

//   return resultArr;

  

// }

// const writeFileRepeat = async () => {

//   const file = JSON.stringify(await repeatLoop());

//   fs.writeFileSync('data/repeat.json', file, function (err) {

//     return console.log(err || 'Repeat is created successfully.');

//   });

// }



// const merger = async () => {
//   // await writeFileRepeat()

//   const init = JSON.parse(fs.readFileSync('data/result.json'))
//   const repeat = JSON.parse(fs.readFileSync('data/repeat.json'))

//   const merge = {
//     ...init, ...repeat
//   }
//   console.log(merge)
  
// }
// merger()