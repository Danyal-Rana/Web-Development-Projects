const http = require("http");
const fs = require("fs");

const myServer = http.createServer( (req, res)=> {

    const log = `${(Date.now())}: ${req.url} New Request Received.\n`;
    fs.appendFile("log.txt", log, (error, data)=> {
        switch(req.url) {
            case '/':
                res.end("Home");
                break;
            case '/about':
                res.end("About: I'm Danyal.");
                break;
            default:
                res.end("404 Page Not Found.");
        }
    })
});

myServer.listen(8000, ()=> {
    console.log("Server is listening on port 8000");
});