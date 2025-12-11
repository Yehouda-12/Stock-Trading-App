import readLine from "readline-sync";
import {
  searchStock,
  filterStocksByPrice,
  buy,
  sell,
  OperateOnStock,
} from "./utilsStock/utils.js";

import { stockMarket } from "./dataStock/data.js";
const stocks = stockMarket.stocks;


console.log("===WELCOME TO THE TRADING MARKET===");

const menu = `1. Search for a stock by name or id 
2. Show all stocks above or below a given price 
3. Buy or sell a stock 
0. Exit 
`;
let nameOrID;
let choice;
do {
  console.log(menu);
   choice = readLine.question("Select option: ");
  switch (choice) {
    case '1':
      nameOrID = readLine.question("PLease enter name or id : ");
      console.log(searchStock(nameOrID));
      break
    case '2':
      const price = readLine.questionInt("Please enter the price : ");
      const aboveOrBelow = readLine.question(
        "Type above to show stocks above the price or below to show stocks below : "
      );
      if (aboveOrBelow === "above") {
        console.log(filterStocksByPrice(price, true));
      } else if (aboveOrBelow === "below") {
        console.log(filterStocksByPrice(price, false));
      } else {
        console.log("invalid option!");
      }
      break
    case '3':
      const operation = readLine.question(
        "Type buy to buy or sell to sell stock :"
      );
      nameOrID = readLine.question("PLease enter name or id : ");
      if (operation === "buy" || operation === "sell") {
        OperateOnStock(operation, nameOrID);
      }
      break
  }
} while (choice !== '0');
{

}

   