import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from '../components/head';
import { db } from '../dbconfig'

const Home = () => {
  const [names, setNames] = useState(null);

  useEffect(() => {
    db.collection("notes").onSnapshot(snap => {
      setNames(snap.docs.map(doc => doc.data()))
    })
  }, []);

  return (
    <div>
      <Head title="Home" />
      {names
        ? 
        names.map((name, i) => (
          <p key={i}>{name.name}</p>
        ))
        :
        "loading..."
      }
    </div>
  );
};

export default Home;
