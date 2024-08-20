import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectionPool from "./utils/db.mjs";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors({ origin: true }));
app.use(bodyParser.json());

app.post("/posts", async (req, res) => {
  const newPost = req.body;
  console.log(newPost);

  try {
    const result = await connectionPool.query(
      `insert into posts(description) values($1) returning *`,
      [newPost.description]
    );
    return res.status(201).json({
      message: "Post created successfully.",
      data: result.rows[0],
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const result = await connectionPool.query(`select * from posts`);
    return res.status(201).json({
      message: "Post created successfully.",
      data: result.rows,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/test", (req, res) => {
  return res.status(200).json("Server API is working 🚀");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
