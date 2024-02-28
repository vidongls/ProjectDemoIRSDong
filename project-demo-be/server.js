const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;
const db = require("./db.json");

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.get("/customers", (req, res) => {
	if (req.method === "GET") {
		let q = req.query["q"];
		if (q) {
			let result = db.customers.filter((customer) => {
				return customer.code.toLowerCase().includes(q.toLowerCase()) || customer.name.toLowerCase().includes(q.toLowerCase());
			});
			res.status(200).json(result.length > 0 ? result : []);
		} else {
			res.status(400).json({
				error: "No data customers",
			});
		}
	}
});

server.get("/suppliers", (req, res) => {
	if (req.method === "GET") {
		let q = req.query["q"];
		if (q) {
			let result = db.suppliers.filter((supplier) => {
				return supplier.code.toLowerCase().includes(q.toLowerCase()) || supplier.name.toLowerCase().includes(q.toLowerCase());
			});

			res.status(200).json(result.length > 0 ? result : []);
		} else {
			res.status(400).json({
				error: "No data suppliers",
			});
		}
	}
});

server.use(router);
server.listen(port);
