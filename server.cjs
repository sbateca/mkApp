// eslint-disable-next-line @typescript-eslint/no-var-requires, n/no-missing-require
const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("mock-data.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/auth/login", (req, res) => {
  const {username, password} = req.body;

  const db = router.db; // lowdb
  const user = db.get("users").find({username, password}).value();

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  return res.status(200).json({
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
    },
    accessToken: `fake-jwt-token-${user.id}`,
  });
});

server.use(router);

server.listen(4000, () => {
  console.log("JSON Server is running on port 4000");
});
