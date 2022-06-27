import React from 'react';
import {MongoClient, ObjectId} from "mongodb";

import MeetupDetail from "../components/meetups/MeetupDetail";


const DetailMeetup = ({meetupData}) => {

  return (
    <MeetupDetail title={meetupData.title}
                  img={meetupData.image}
                  address={meetupData.address}
                  desc={meetupData.desc}/>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect('mongodb+srv://MaWr1k:VwU4LZ1HbcpO9sBX@cluster0.xbin73r.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();

  await client.close();
  return {
    fallback: false,
    paths: meetups.map(meetup => ({
      params: {meetupId: meetup._id.toString()}
    }))
  }
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect('mongodb+srv://MaWr1k:VwU4LZ1HbcpO9sBX@cluster0.xbin73r.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({_id:ObjectId(meetupId)});
  await client.close();
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        desc: selectedMeetup.description,
      }
      //   {
      //   ...selectedMeetup,
      //   id: selectedMeetup._id.toString()
      // }

    }
  };
}

export default DetailMeetup;