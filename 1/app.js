const http= require('http')
const fs = require('fs')

const server = http.createServer((req,res) => {
    // console.log(req.url, req.headers, req.method);

    const url = req.url;
    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        
        return res.end();
    }
    if(url === '/message') {
        const body = [];
        req.on('data', (chunk) => {
        console.log(chunk);
        body.push(chunk);
        });
        req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        const message = parsedBody.split('=')[1];
        fs.writeFileSync('message.txt', message);
        });

        res.statusCode = 303;
        res.setHeader('Location', '/')
        return res.end();
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body>I am a Nodejs Hero</body>');
    res.write('</html>');
    res.end(); //when you don't use it page is keeping to relod status
})

server.listen(3000)