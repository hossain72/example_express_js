const express = require("express");
const app = express();
const port = 3000;

const postRouter = require("./routes/post.route");
const userRouter = require("./routes/user.route");

const db =
  "mongodb+srv://example:1234567890@cluster0.vzky2.mongodb.net/exampledb?retryWrites=true&w=majority";

const exampleDB = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await exampleDB.connect(db);
  console.log("connected");
}

app.use(express.json());

app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
