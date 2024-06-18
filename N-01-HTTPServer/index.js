const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer( (req, res)=> {

    if (req.url === "/favicon.ico") {
        res.end();
        return;
    }

    const log = `${(Date.now())}: ${req.url} New Request Received.\n`;
    const myURL = url.parse(req.url, true);
    console.log(myURL);

    fs.appendFile("log.txt", log, (error, data)=> {

        switch(myURL.pathname) {
            case '/':
                res.end("Home");
                break;
            case '/about':
                const temp = myURL.query.username;
                res.end(`Hi, ${temp}`);
                break;
            default:
                res.end("404 Page Not Found.");
        }
    })
});

myServer.listen(8000, ()=> {
    console.log("Server is listening on port 8000");
});