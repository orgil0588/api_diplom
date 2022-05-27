import axios from "axios"
import cheerio from "cheerio"


const crawler = async () => {
  await axios
    .get("http://mse.mn/mn/trade_today/23")
    .then((res) => {
      const $ = cheerio.load(res.data);
      const classSelector = [
        ".table-responsive",
        "div.trade_table:nth-child(8) > table:nth-child(1)",
        "div.trade_table:nth-child(10) > table:nth-child(1)",
      ];

      for (let classIdx = 0; classIdx < classSelector.length; classIdx++) {
        const elSelector = `${classSelector[classIdx]} > tbody:nth-child(2) > tr`;

        $(elSelector).each((index, element) => {
          const ticker = `${classSelector[classIdx]
            } > tbody:nth-child(2) > tr:nth-child(${index + 1
            }) > td:nth-child(1)`;
          const open = `${classSelector[classIdx]
            } > tbody:nth-child(2) > tr:nth-child(${index + 1
            }) > td:nth-child(2)`;
          const high = `${classSelector[classIdx]
            } > tbody:nth-child(2) > tr:nth-child(${index + 1
            }) > td:nth-child(3)`;
          const low = `${classSelector[classIdx]
            } > tbody:nth-child(2) > tr:nth-child(${index + 1
            }) > td:nth-child(4)`;
          const close = `${classSelector[classIdx]
            } > tbody:nth-child(2) > tr:nth-child(${index + 1
            }) > td:nth-child(5)`;

          const change = `${classSelector[classIdx]
            } > tbody:nth-child(2) > tr:nth-child(${index + 1
            }) > td:nth-child(9)`;
          const volume = `${classSelector[classIdx]
            } > tbody:nth-child(2) > tr:nth-child(${index + 1
            }) > td:nth-child(10)`;
          const code = parseInt($(ticker + " > a").attr("href")!.split("/")[3])
          let obj = {
            code: code,
            ticker: $(ticker).text(),
            open: parseFloat($(open).text()),
            high: parseFloat($(high).text()),
            low: parseFloat($(low).text()),
            close: parseFloat($(close).text()),
            change: parseFloat($(change).text()),
            volume: parseFloat($(volume).text()),
            date: new Date().toISOString().split("T")[0],
          };
          axios.post('http://localhost:8080/api/trade_history/crawler/', obj)
        });
      }
      console.log('success');
    })
    .catch((err) => {
      if (err.response) {
        console.log(err);
        return err.message;
      }
    });
};


export default crawler