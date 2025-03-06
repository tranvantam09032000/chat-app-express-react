const express = require("express");
const app = express();
const port = 3100;
const cors = require("cors");

// Middleware để parse JSON
app.use(express.json());

app.use(cors());

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

// Route API
app.get("/api/users", (req, res) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
