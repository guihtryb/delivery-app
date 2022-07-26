const formingSaleDate = (saleDate) => {
  const dateAndTimeArray = JSON.stringify(saleDate).split('T');
  const dateWithDash = dateAndTimeArray[0].slice(1);
  const dateArray = JSON.stringify(dateWithDash).split('-');

  const day = dateArray[2].slice(0, 2);
  const month = dateArray[1];
  const year = dateArray[0].slice(1);

  return `${day}/${month}/${year}`;
};

module.exports = formingSaleDate;
