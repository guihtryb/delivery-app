const createSaleDate = () => {
  const year = new Date().getUTCFullYear();
  const month = new Date().getUTCMonth();
  const day = new Date().getUTCDate();
  
  return `${day}/${month}/${year}`;
};

module.exports = createSaleDate;
