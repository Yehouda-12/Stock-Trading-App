
export function searchStock(identifier) {
  const findStock = stocks.filter(
    (stock) => stock.name === identifier || stock.id === identifier
  );
  if (findStock.length >= 1) {
    return findStock;
  } else {
    console.log("No found stock with this identifier");

    return [];
  }
}

export function filterStocksByPrice(givenPrice, above) {
  if (typeof givenPrice !== "number") {
    console.log("The price must be a number");
    return [];
  }
  const findStocks = stocks.filter((stock) => {
    if (above) {
      return stock.currentPrice > givenPrice;
    } else {
      return stock.currentPrice < givenPrice;
    }
  });
  if (findStocks.length >= 1) {
    return findStocks;
  } else {
    console.log("No found stocks with tis price ");
    return [];
  }
}



export function buy(identifier) {
  const find = searchStock(identifier);
  if (find.length === 0) {
    console.log("Not stock with this identifier");
    return;
  }
  const stock = find[0];
  const units = parseInt(
    readLine.question(`How many ${stock.name} you want to buy? :`)
  );
  if (!units || units <= 0) {
    console.log("Invalid units");
    return;
  }
  if (units > stock.availableStocks) {
    console.log("There isn't enough");
    return;
  }
  console.log(stock);

  console.log(`you pay ${stock.currentPrice * units}`);
  stock.availableStocks -= units;
  stock.previousPrices.push(stock.currentPrice);
  stock.currentPrice = stock.currentPrice * 1.05;
  stockMarket.lastUpdated = new Date();
  stocks.forEach((stock) => {
    if (stock.category === find[0].category && stock.id !== find[0].id) {
      stock.previousPrices.push(stock.currentPrice);
      stock.currentPrice = stock.currentPrice * 1.01;
    }
  });
  console.log(`You buy ${units} ${stock.name} `);
  console.log(stock);
}

export function sell(identifier) {
  const find = searchStock(identifier);
  if (find.length === 0) {
    console.log("Not stock with this identifier");
    return;
  }
  const stock = find[0];
  const units = parseInt(
    readLine.question(`How many ${stock.name} you want to sell? :`)
  );
  if (!units || units <= 0) {
    console.log("Invalid units");
    return;
  }
  console.log(`You receveid ${units * stock.currentPrice}`);

  stock.availableStocks += units;
  stock.previousPrices.push(stock.currentPrice);
  stock.currentPrice = stock.currentPrice * 0.95;
  stockMarket.lastUpdated = new Date();
  stocks.forEach((stock) => {
    if (stock.category === find[0].category && stock.id !== find[0].id) {
      stock.previousPrices.push(stock.currentPrice);
      stock.currentPrice = stock.currentPrice * 0.99;
    }
  });
  console.log(`You sell ${units} ${stock.name} `);
  console.log(stock);
}

export function OperateOnStock(operation, identifier) {
  if (operation === "buy") {
    buy(identifier);
  } else if (operation === "sell") {
    sell(identifier);
  } else {
    console.log("Invalid operation");
  }
}
