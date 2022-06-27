import React, {Fragment} from 'react';
import classes from './MeetupDetail.module.css';

const MeetupDetail = ({img, title, address, desc}) => {
  return (
    <section className={classes.detail}>
      <img src={img} alt=""/>
      <h1>{title}</h1>
      <address>{address}</address>
      <p>{desc}</p>
    </section>
  );
};

export default MeetupDetail;