import { MongoClient } from 'mongodb';

// /api/new-meetup/
// POST method

async function handler(req, res){
  if(req.method === 'POST'){
    const data = req.body;

    const client = await MongoClient.connect('mongodb+srv://MaWr1k:VwU4LZ1HbcpO9sBX@cluster0.xbin73r.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({message: 'Meetup added success!'});
  }else{
    console.log('NOT POST METHOD');
  }
}

export default handler;