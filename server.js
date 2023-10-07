const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 8000;

app.use(cors());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.get("/api/search", (req, res) => {
  const ticker = req.query.symbol;
  const period = req.query.period;

  const ohlcData = [];

  let date = new Date(Date.UTC(2020, 0, 1, 0, 0, 0, 0));
  let init = 100;
  let timeInterval;

  switch (period) {
    case "1D":
      timeInterval /= 1;
      break;
    case "1H":
      timeInterval *= 24;
      break;
    case "2H":
      timeInterval /= 12;
      break;
    case "4H":
      timeInterval /= 6;
  }

  for (let i = 0; i < 1000; i++) {
    const time = date.getTime() / 1000;
    const open = init;
    const high = open + Math.random() * 10;
    const low = open - Math.random() * 10;
    const close = low + Math.random() * (high - low);
    init = close;

    ohlcData.push({
      time,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
    });

    date.setUTCDate(date.getUTCDate() + 1);
  }

  return res.json(ohlcData);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
