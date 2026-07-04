function buildPagination(page = 1, limit = 10) {
  const parsedPage = Number(page) || 1;

  const parsedLimit = Number(limit) || 10;

  const offset = (parsedPage - 1) * parsedLimit;

  return {
    page: parsedPage,
    limit: parsedLimit,
    offset,
  };
}

// function buildSearch(keyword, searchableFields = [], searchMap = {}) {
//   if (!keyword || searchableFields.length === 0) {
//     return {
//       clause: "",
//       values: [],
//     };
//   }

//   const conditions = searchableFields
//     .map((field) => `${field} LIKE ?`)
//     .join(" OR ");

//   return {
//     clause: `(${conditions})`,
//     values: searchableFields.map(() => `%${keyword}%`),
//   };
// }

function buildSearch(keyword, searchableFields = [], searchMap = {}) {
  if (!keyword || !searchableFields || searchableFields.length === 0) {
    return {
      clause: "",
      values: [],
    };
  }

  const safeKeyword = keyword.trim();

  const conditions = searchableFields
    .map((field) => {
      const dbColumn = searchMap[field] || field;
      return `${dbColumn} LIKE ?`;
    })
    .join(" OR ");

    
  return {
    clause: `(${conditions})`,
    values: searchableFields.map(() => `%${safeKeyword}%`),
  };
}

function buildFilters(filters = {}, filterMap = {}) {
  const conditions = [];
  const values = [];

  Object.entries(filterMap).forEach(([field, column]) => {
    const value = filters[field];

    if (value === undefined || value === null || value === "") {
      return;
    }

    conditions.push(`${column} = ?`);

    values.push(value);
  });

  return {
    clause: conditions.join(" AND "),
    values,
  };
}

function buildSort(sortBy, sortOrder = "ASC", sortMap = {}) {
  const column = sortMap[sortBy];

  if (!column) {
    return "";
  }

  const order = sortOrder?.toUpperCase() === "DESC" ? "DESC" : "ASC";

  return `
    ORDER BY
    ${column}
    ${order}
  `;
}

function buildWhere(...clauses) {
  const validClauses = clauses.filter(Boolean);

  if (validClauses.length === 0) {
    return "";
  }

  return `
    WHERE
    ${validClauses.join(" AND ")}
  `;
}

function buildSelectQuery({
  selectClause,
  fromJoinClause,
  whereClause,
  groupClause,
  sortClause,
}) {
  return `
    ${selectClause}
    ${fromJoinClause}
    ${whereClause}
    ${groupClause}
    ${sortClause || ""}
  `;
}

const buildQueryOptions = ({
  page,
  limit,
  
  search,
  searchableFields = [],
  searchMap = {},

  sortBy,
  sortOrder,
  sortMap = {},

  filters = {},
  filterMap = {},
}) => {
  const pagination = buildPagination(page, limit);
  const searchResult = buildSearch(search, searchableFields, searchMap);
  const filterResult = buildFilters(filters, filterMap);
  const sortClause = buildSort(sortBy, sortOrder, sortMap);

  return {
    pagination,
    searchResult,
    filterResult,
    sortClause,
  };
};

module.exports = {
  buildSearch,
  buildPagination,
  buildFilters,
  buildSort,
  buildQueryOptions,
  buildWhere,
  buildSelectQuery
};
