import { createServer } from "node:http";

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(process.env, null, 2));
});

server.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
