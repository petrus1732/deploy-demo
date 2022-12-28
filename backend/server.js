import cors from 'cors';
import db from './db'
import express from 'express'
import dotenv from 'dotenv-defaults'
import route from './routes/scoreCard.js'
import path from "path"

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "../frontend", "build")));
    app.get("/*", function (req, res) {
      res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
    });
}

if (process.env.NODE_ENV === "development") {
	app.use(cors());
}

app.use(express.json());
app.use('/', route);

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})
db.connect();

