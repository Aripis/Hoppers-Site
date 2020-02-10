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
            <style jsx>{`
                .test{
                    color: red;
                }
            `}</style>
            <Head title="Home" />
            <div className="test">ADasdasdasd</div>
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
