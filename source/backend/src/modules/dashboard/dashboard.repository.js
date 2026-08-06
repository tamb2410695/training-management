const db = require("@/config/database");

const getOverview = async (connection = db) => {
  const [
    studentRows,
    staffRows,
    courseRows,
    classRows,
    enrollmentRows,
    documentRows,
  ] = await Promise.all([
    connection.query(`
      SELECT COUNT(*) AS total
      FROM STUDENT_PROFILE stu
      LEFT JOIN ACCOUNT acc
        ON stu.account_id = acc.account_id
      WHERE acc.deleted_at IS NULL
    `),

    connection.query(`
      SELECT COUNT(*) AS total
      FROM STAFF_PROFILE sp
      LEFT JOIN ACCOUNT acc
        ON sp.account_id = acc.account_id
      WHERE acc.deleted_at IS NULL
    `),

    connection.query(`
      SELECT COUNT(*) AS total
      FROM COURSE
      WHERE deleted_at IS NULL
    `),

    connection.query(`
      SELECT COUNT(*) AS total
      FROM CLASS
      WHERE deleted_at IS NULL
    `),

    connection.query(`
      SELECT COUNT(*) AS total
      FROM ENROLLMENT
    `),

    connection.query(`
      SELECT COUNT(*) AS total
      FROM DOCUMENT
      WHERE deleted_at IS NULL
    `),
  ]);

  return {
    totalStudents: studentRows[0][0].total,
    totalStaff: staffRows[0][0].total,
    totalCourses: courseRows[0][0].total,
    totalClasses: classRows[0][0].total,
    totalEnrollments: enrollmentRows[0][0].total,
    totalDocuments: documentRows[0][0].total,
  };
};


const getStudentStatistics = async (connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      student_status AS status,
      COUNT(*) AS total
    FROM STUDENT_PROFILE
    GROUP BY student_status
    `
  );

  return rows;
};


const getCourseStatistics = async (connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      course_status AS status,
      COUNT(*) AS total
    FROM COURSE
    WHERE deleted_at IS NULL
    GROUP BY course_status
    `
  );

  return rows;
};


const getClassStatistics = async (connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      class_status AS status,
      COUNT(*) AS total
    FROM CLASS
    WHERE deleted_at IS NULL
    GROUP BY class_status
    `
  );

  return rows;
};


const getEnrollmentStatistics = async (connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      enrollment_status AS status,
      COUNT(*) AS total
    FROM ENROLLMENT
    GROUP BY enrollment_status
    `
  );

  return rows;
};


const getClassEnrollmentOverview = async (connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      cls.class_id,
      cls.class_code,
      cls.class_name,

      crs.course_name,

      COUNT(e.enrollment_id) AS total_students

    FROM CLASS cls

    LEFT JOIN COURSE crs
      ON cls.course_id = crs.course_id

    LEFT JOIN ENROLLMENT e
      ON cls.class_id = e.class_id
      AND e.enrollment_status = 'ACTIVE'

    WHERE cls.deleted_at IS NULL
      AND crs.deleted_at IS NULL

    GROUP BY
      cls.class_id,
      cls.class_code,
      cls.class_name,
      crs.course_name

    ORDER BY total_students DESC
    `
  );

  return rows;
};


const getPopularCourses = async (connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      crs.course_id,
      crs.course_code,
      crs.course_name,

      COUNT(e.enrollment_id) AS total_students

    FROM COURSE crs

    LEFT JOIN CLASS cls
      ON crs.course_id = cls.course_id

    LEFT JOIN ENROLLMENT e
      ON cls.class_id = e.class_id
      AND e.enrollment_status = 'ACTIVE'

    WHERE crs.deleted_at IS NULL
      AND cls.deleted_at IS NULL

    GROUP BY
      crs.course_id,
      crs.course_code,
      crs.course_name

    ORDER BY total_students DESC
    LIMIT 10
    `
  );

  return rows;
};


const getRecentDocuments = async (
  limit = 10,
  connection = db,
) => {
  const [rows] = await connection.query(
    `
    SELECT
      doc.document_id,
      doc.title,
      doc.category,
      doc.created_at,

      crs.course_name,

      sp.full_name AS uploader_name

    FROM DOCUMENT doc

    LEFT JOIN COURSE crs
      ON doc.course_id = crs.course_id

    LEFT JOIN STAFF_PROFILE sp
      ON doc.uploaded_by = sp.staff_id

    WHERE doc.deleted_at IS NULL
      AND crs.deleted_at IS NULL

    ORDER BY doc.created_at DESC

    LIMIT ?
    `,
    [limit],
  );

  return rows;
};


module.exports = {
  getOverview,

  getStudentStatistics,
  getCourseStatistics,
  getClassStatistics,
  getEnrollmentStatistics,

  getClassEnrollmentOverview,
  getPopularCourses,
  getRecentDocuments,
};