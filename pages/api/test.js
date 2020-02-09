export default (req, res) => {
    let name = "Ivan"
    let surname = "Dimitrov"
    res.json(`{"name": "${name}", "surname": "${surname}"}`)
}