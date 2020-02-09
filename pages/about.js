import { useEffect, useState } from 'react'

const About = () => {
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")

    useEffect(() => {
        fetch("/api/test").then(res => {
            res.json().then(json => {
                setName(json.name)
                setSurname(json.surname)
            })
        })
    }, [])

    return(
        <>
            <p>{`${name} ${surname}`}</p>
            <input value={name} onChange={e => setName(e.target.value)}/>
            <br />
            <input value={surname} onChange={e => setSurname(e.target.value)}/>

        </>
    )
}

export default About