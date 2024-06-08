
const fs = require('fs');
const {coinCount, coins} = require("./p3-module.js");
// Require the Fastify framework and instantiate it

//console.log("Coins array before:", coins); 

const fastify = require("fastify")({
  logger: false,
});

fastify.get("/", (request, reply) => {
    //const data = fs.readFileSync('index.html', 'utf8');
    fs.readFile(`${__dirname}/index.html`, (err, data) => {
        if (err) {
            reply
                .code(500)
                .header('Content-Type', 'text/plain')
                .send('Error processing request');
        } else {
            reply
                .code(200)
                .header('Content-Type', 'text/html; charset=utf-8')
                .send(data);
        }
    });
});

fastify.get ("/coin", (request, reply) => {
    const {denom = 0, count = 0} = request.query;
    //const denomInt = parseInt(denom);
    //const countInt = parseInt(count); 
    const coinValue = coinCount({denom: parseInt(denom), count: parseInt(count)});
    //console.log(coinValue);
    reply 
        .code(200)
        .header("Content-Type", "text/html; charset=utf-8")
        .send (`<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`);

});

fastify.get ("/coins", (request, reply) => {
    const {option} = request.query;
    let coinValue;
    switch (option) {
        case '1':
            coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });   // option = 1
            break;
        case '2':
            coinValue = coinCount(...coins); // option = 2
            break;
        case '3':
            coinValue = coinCount(coins);
            break;
        default:
            coinValue = coinCount(0);
            break;
    }
    reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`);

});

// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    // fastify.log.error(err);
    console.log(err);
    process.exit(1);
  }
  // fastify.log.info(`Server listening on ${address}`);
  console.log(`Server listening on ${address}`);
});