/* CIT 281 Project 3
Name: Kristie Chu
*/
function validDomination(coin) {
    const validDominations = [1, 5, 10, 25, 50, 100];
    return validDominations.indexOf(coin) !== -1;
}

function valueFromCoinObject(obj) {
    const {denom = 0, count = 0} = obj;
    return validDomination(denom) ? denom * count: 0
}

 function valueFromArray(arr) {
    return arr.reduce((acc,val) =>
        Array.isArray(val) ? 
        valueFromArray(val): acc + valueFromCoinObject(val)
        ,0
    )
}

function coinCount(...coinage){
    return valueFromArray(coinage);
}

console.log("{}", coinCount({denom: 5, count: 3}));
console.log("{}s", coinCount({denom: 5, count: 3},{denom: 10, count: 2}));
const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
console.log("...[{}]", coinCount(...coins));
console.log("[{}]", coinCount(coins));

module.exports = {
    coinCount: coinCount,
    coins: coins
    };