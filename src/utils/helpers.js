export const formatPrice = (price) => {
    if (price == Number(price)){
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: "NGN",
            minimumFractionDigits: 0,
        }).format(price / 1);
    }else{
        return price
    }
}


export const shuffleArray = (array) => {
    let shuffled = array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
       
    return(shuffled)
    
}