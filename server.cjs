// eslint-disable-next-line @typescript-eslint/no-var-requires, n/no-missing-require
const jsonServer = require("json-server");
// eslint-disable-next-line @typescript-eslint/no-var-requires, n/no-missing-require
const cookieParser = require("cookie-parser");

const server = jsonServer.create();
const router = jsonServer.router("mock-data.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(cookieParser());

const COOKIE_NAME = "mock_session";

const buildUserResponse = (user) => ({
  id: user.id,
  username: user.username,
  name: user.name,
  role: user.role,
});

server.post("/auth/login", (req, res) => {
  const {username, password} = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required",
    });
  }

  const db = router.db;
  const user = db.get("users").find({username, password}).value();

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  res.cookie(COOKIE_NAME, String(user.id), {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
  });

  return res.status(200).json({
    user: buildUserResponse(user),
  });
});

server.get("/auth/me", (req, res) => {
  const sessionUserId = req.cookies[COOKIE_NAME];

  if (!sessionUserId) {
    return res.status(401).json({
      message: "Not authenticated",
    });
  }

  const db = router.db;
  const user = db
    .get("users")
    .find({id: Number(sessionUserId)})
    .value();

  if (!user) {
    return res.status(401).json({
      message: "Invalid session",
    });
  }

  return res.status(200).json({
    user: buildUserResponse(user),
  });
});

server.post("/auth/logout", (_req, res) => {
  res.clearCookie(COOKIE_NAME, {
    path: "/",
  });

  return res.status(200).json({
    message: "Logged out successfully",
  });
});

server.use(router);

server.listen(4000, () => {
  console.log("JSON Server is running on port 4000");
});
