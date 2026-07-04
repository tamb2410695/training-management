const normalizePhone = (phone) => {
  if (typeof phone !== "string") {
    return phone;
  }

  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.startsWith("84")) {
    return `0${cleaned.slice(2)}`;
  }

  return cleaned;
};

module.exports = {
  normalizePhone,
};
