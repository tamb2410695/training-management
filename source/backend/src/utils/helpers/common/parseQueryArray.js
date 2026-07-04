const parseQueryArray = (value) => {
  if (!value) return [];

  let result = [];

  if (Array.isArray(value)) {
    value.forEach(item => {
      const subItems = String(item).split(",").map(i => i.trim().toUpperCase());
      result.push(...subItems);
    });
  } 
  else {
    result = String(value)
      .split(",")
      .map(item => item.trim().toUpperCase());
  }

  return [...new Set(result)].filter(Boolean);
};

module.exports = {
  parseQueryArray
}