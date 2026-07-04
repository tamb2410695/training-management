const { QUERY_COMMON_FIELDS } = require("../../constants");
const ROOM_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },

  QUERY: {
    SEARCHABLE: ["roomCode", "roomName", "roomLocation"],

    SORTABLE: ["roomId", "roomCode", "roomName", "capacity"],

    FILTERS: ["roomStatus"],

    get ALLOWED_KEYS() {
      return [
        ...new Set([
          ...QUERY_COMMON_FIELDS.ALL_KEYS,
          ...this.SEARCHABLE,
          ...this.SORTABLE,
          ...this.FILTERS,
        ]),
      ];
    },
  },

  BODY: {
    CREATE: ["roomCode", "roomName", "capacity", "roomLocation"],

    UPDATE: ["roomName", "capacity", "roomLocation", "roomStatus"],
  },

  REQUIRED: {
    CREATE: ["roomCode", "roomName", "capacity", "roomLocation"],
  },
};
const ROOM_MAPS = {
  SEARCH: {
    roomCode: "rm.room_code",
    roomName: "rm.room_name",
    roomLocation: "rm.room_location",
  },

  SORT: {
    roomId: "rm.room_id",
    roomCode: "rm.room_code",
    roomName: "rm.room_name",
    capacity: "rm.capacity",
  },

  FILTER: {
    roomStatus: "rm.room_status",
    capacity: "rm.capacity",
  },
};
module.exports = {
  ROOM_FIELDS,
  ROOM_MAPS,
};
