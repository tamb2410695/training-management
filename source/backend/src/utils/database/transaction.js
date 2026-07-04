const db = require("../../config/database");

const withTransaction = async (callback, existingConnection = null) => {
  if (
    existingConnection &&
    typeof existingConnection.beginTransaction !== "function"
  ) {
    existingConnection = null;
  }

  if (existingConnection) {
    return await callback(existingConnection);
  }

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

module.exports = {
  withTransaction,
};
