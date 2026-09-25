const { Convert } = require("easy-currencies");

const currencyConvert = async (amount, from = "USD", to = "NPR") => {
   try{
    return (await Convert(Number(amount)).from(from).to(to));
   }catch(error){
    console.log(error)
   }
};

module.exports = currencyConvert;