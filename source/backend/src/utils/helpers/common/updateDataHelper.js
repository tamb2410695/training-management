async function buildUpdateData(body, handlers) {
  const updateData = {};

  for (const field in handlers) {
    if (hasField(body, field)) {
      updateData[field] = await handlers[field](body[field]);
    }
  }

  return updateData;
}

module.exports = {
  buildUpdateData,
};
