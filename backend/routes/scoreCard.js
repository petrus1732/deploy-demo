import { Router } from "express";
import ScoreCard from "../models/ScoreCard";


const router = Router();
router.delete("/cards", async(req, res) => {
    try {
        await ScoreCard.deleteMany();
        res.send({message:'Database cleared'})
    } catch (e) {
        throw new Error("Database deletion failed"); 
    }
});
router.post("/card", async (req, res) => {
    const {name, subject, score} = req.body;
    const existing = await ScoreCard.findOne({Name:name, Subject:subject});
    console.log(existing);
    if (existing) {
        existing.update( {Name:name, Subject:subject, Score:score});
        existing.save();
        res.send({message:`Updating (${name}, ${subject}, ${score})`, card: existing})
        return 
    }
    const newScoreCard = new ScoreCard({Name:name, Subject:subject, Score:score});
    newScoreCard.save();
    res.send({message:`Adding (${name}, ${subject}, ${score})`, card: newScoreCard});
});
router.get("/cards", async (req, res) => {
    const {type, queryString} = req.query;
    let card
    if (type === 'name') card = await ScoreCard.find({Name: queryString});
    else card = await ScoreCard.find({Subject: queryString});
    const messages = card.map(o => `Found card with ${type}: (${o.Name}, ${o.Subject}, ${o.Score})`);
    if (!messages.length) res.send({messages:null, message: `${type} (${queryString}) not found!`})
    else res.send({messages, message:null});
});
export default router