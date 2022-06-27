import React, {Fragment, useState, useEffect} from 'react';
import {MongoClient} from "mongodb";

import MeetupList from "../components/meetups/MeetupList";



const HomePage = ({meetups}) => {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);
  // useEffect(() => {
  //   setLoadedMeetups(DUMMY_MEETUP);
  // },[setLoadedMeetups]);
  return (
    <Fragment>
      <h1>Home page</h1>
      <MeetupList meetups={meetups}/>
    </Fragment>
  );
};

export async function getStaticProps(){

  const client = await MongoClient.connect('mongodb+srv://MaWr1k:VwU4LZ1HbcpO9sBX@cluster0.xbin73r.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props:{
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 60
  }
}

export default HomePage;