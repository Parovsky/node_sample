let http = require('http');
let PORT = process.env.PORT || 3000;

http.createServer(function (req, res) {
    res.end('This is Node.js!')
}).listen(PORT, function () {
    console.log("server running on http://localhost:" + PORT);
});
