var fs = require("fs");

const readFile = fs.readFile;
const writeFile = fs.writeFile;


let json = require('./1-input.json');
let expenseArr = json.expenseData;
let revenueArr = json.revenueData;


var minDate = "9999-99-01T00:00:00.000Z";
var maxDate = "0000-00-01T00:00:00.000Z";


let arr = [];
let brr = [];

for (let i = 0; i < revenueArr.length; i++) {
    if (maxDate < revenueArr[i].startDate) maxDate = revenueArr[i].startDate;

    if (minDate > revenueArr[i].startDate) minDate = revenueArr[i].startDate;

    for (let j = i + 1; j < revenueArr.length; j++) {
        if (revenueArr[j].startDate === revenueArr[i].startDate) {
            revenueArr[i].amount += revenueArr[j].amount;
            revenueArr[j].amount = 0;
        }
    }

    arr.push(revenueArr[i]);
}

for (var i = 0; i < expenseArr.length; i++) {
    var x = 0;
    if (maxDate < expenseArr[i].startDate) maxDate = expenseArr[i].startDate;
    if (minDate > expenseArr[i].startDate) minDate = expenseArr[i].startDate;
    for (var j = 0; j < arr.length; j++) {
        if (arr[j].startDate === expenseArr[i].startDate) {
            arr[j].amount += -1 * expenseArr[i].amount;
            x = 1;
        }
    }

    if (x === 0) {
        expenseArr[i].amount = -1 * expenseArr[i].amount;
        arr.push(expenseArr[i]);
    }
}

var x = Number(minDate[5]) * 10 + Number(minDate[6]);
var y = Number(minDate[0]) * 1000 + Number(minDate[1]) * 100 + Number(minDate[2]) * 10 + Number(minDate[3]);



while (minDate < maxDate) {
    if (x < 10) minDate = y + "-0" + x + "-01T00:00:00.000Z";
    else minDate = y + "-" + x + "-01T00:00:00.000Z";

    var count = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].startDate == minDate) {
            brr.push(arr[i]);
            count = 1;
            break;
        }
    }
    if (count === 0) {
        brr.push({ "amount": 0, "startDate": minDate });
    }
    if (x == 12) {
        x = 0;
        y = y + 1;
    }
    x = x + 1;
}

console.log(brr);