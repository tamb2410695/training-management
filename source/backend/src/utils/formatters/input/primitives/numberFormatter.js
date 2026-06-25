const toNumber = (value) => {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const number = Number(value);

  return Number.isNaN(number) ? null : number;
};

module.exports = {
  toNumber,
};
