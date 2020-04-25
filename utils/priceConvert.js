export default (price, currency) => {
    let parsedPrice = (Math.round((parseFloat(price) + Number.EPSILON) * 100) / 100).toString().split(".")
    return(
        <>
            <style jsx>{`
                sup {
                    margin-right: .125em;
                }
            `}</style>
            <span>{parsedPrice[0]}</span>
            <sup>{parsedPrice[1]}</sup>
            <span>{currency === "лв" ? currency + "." : currency}</span>
        </>
    )
}