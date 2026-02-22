 import http from "http";
 import fs from "fs";

 const server =  http.createServer((req, res) => {
    console.log(req.url);

   /*  res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Hello World</h1>');
    res.end(); */

   /*  const persona = {
        nombre: "Juan",
        edad: 30,
        profesion: "Desarrollador Web"
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(persona));
    res.end(); */

    if(req.url === '/'){
        const html = fs.readFileSync('./public/inex.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(html);
        res.end();

        return;
    }


    
 });

 server.listen(8080, () => {
    console.log("Server running at http://localhost:8080/");
 });
