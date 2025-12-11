// searchStock(identifier) 
// Input: name or id 
// Output: returns an array of all stocks whose name or id matches exactly. 
// if no matches are found, log it, and return an empty array.
import {stockMarket} from '../dataStock/data.js'
const stocks = stockMarket.stocks

export function searchStock(identifier){
    const findStock  = stocks.filter((stock) => stock.name === identifier || stock.id === identifier);
    if(findStock){
        return findStock
    }else{
        return [] 
    }

};

console.log(searchStock('uygf'));
