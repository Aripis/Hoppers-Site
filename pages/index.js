import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from '../components/head';

const Home = () => {
  const [names, setNames] = useState(null);

  useEffect(() => {
    const getNames = async () => {
      const res = await fetch('/api/test');
      const names = await res.json();
      setNames(names);
    }
    getNames();
  }, []);

  return (
    <div>
      <Head title="Home" />
      {names
        ? 
        names.map(name => (
          <p>{name.name}</p>
        ))
        :
        "loading..."
      }
    </div>
  );
};

export default Home;
