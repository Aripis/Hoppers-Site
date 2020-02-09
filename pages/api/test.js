import { db } from '../../dbconfig'

export default async (req, res) => {
    let snap = await db.collection("notes").get()
    res.json(snap.docs.map(doc => doc.data()))
}