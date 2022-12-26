import cors from 'cors';
import db from './db'
import express from 'express'
import dotenv from 'dotenv-defaults'
import route from './routes/scoreCard.js'

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use('/', route);

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})
db.connect();

