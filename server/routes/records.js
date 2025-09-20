import express from 'express';

// For handling data type conv from _id
import mongodb from "mongodb";
const { ObjectId } = mongodb;

import { getDb } from '../db/connection.js';

const router = express.Router();

// Post using api to initially save menu to db
router.post('/', async (req, res) => {
  try {
    const db = getDb();
    console.log('Received menuData:', req.body);
    const collection = db.collection('records');
    const result = await collection.insertOne(req.body);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: 'Failed to save menu' });
  }
});

// standard get for all records
router.get("/", async (req, res) => {
  const db = getDb();
  let results = await db.collection("records").find({}).toArray();
  res.send(results).status(200);
});

// standard get for one record by id
router.get("/:id", async (req, res) => {
  const db = getDb();
  let collection = await db.collection("records");
  let result = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});


router.put('/:id', async (req, res) => {
  try {
    const db = getDb();
    const collection = db.collection('records');
    const { _id, ...safeBody } = req.body; 

    const result = await collection.replaceOne({ _id: new ObjectId(req.params.id) }, req.body)

    if (result.matchedCount === 0) {
      return res.status(404).send({ error: 'Record not found' });
    }

    res.status(200).send(result);
  } catch (err) {
    console.error('Update failed:', err);
    res.status(500).send({ error: 'Failed to update menu' });
  }
});

// standard delete to delete a record by id
router.delete("/:id", async (req, res) => {
   const db = getDb();
    try{
        const collection = await db.collection("records");
        const query = { _id: new ObjectId(req.params.id) };
        let result = await collection.deleteOne(query);
    
    res.send(result).status(200);
    } catch (error) {
        res.status(500).send("Error deleting record");
    }
});

export default router;