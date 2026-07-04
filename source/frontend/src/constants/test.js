export const STUDENT_TEST = {

    PARAMS: {},

    QUERY: {
        SEARCHABLE: [],
        SORTABLE: [],
        FILTERS: [],
        DEFAULT: {},
    },

    BODY: {
        CREATE: [],
        UPDATE: [],
    },

    REQUIRED: {},

    ENUMS: {},

    FORM: {
        INITIAL_VALUES: {},
    },

    TABLE: {
        COLUMNS: [],
    },

    PLACEHOLDER: {},

    LABELS: {},

    FILTER_OPTIONS: {},

};

export const ROLE = {
  PARAMS: {
    ID: "id",
  },

  QUERY: {
    SEARCHABLE: ["role_code", "role_name"],
    SORTABLE: ["role_code", "role_name"],
    FILTERS: [],
    DEFAULT: {
      sort: "role_name",
      order: "asc",
    },
  },

  BODY: {
    CREATE: [
      "role_code",
      "role_name",
      "role_description",
    ],

    UPDATE: [
      "role_name",
      "role_description",
    ],
  },

  REQUIRED: {
    CREATE: [
      "role_code",
      "role_name",
    ],

    UPDATE: [
      "role_name",
    ],
  },

  ENUMS: {},

  FORM: {
    INITIAL_VALUES: {
      role_code: "",
      role_name: "",
      role_description: "",
    },
  },

  TABLE: {
    COLUMNS: [
      "role_code",
      "role_name",
      "role_description",
    ],
  },

  PLACEHOLDER: {
    role_code: "ROLE_ADMIN",
    role_name: "Administrator",
    role_description: "Role description",
  },

  LABELS: {
    role_code: "Role Code",
    role_name: "Role Name",
    role_description: "Description",
  },

  FILTER_OPTIONS: {},
};

export const ACCOUNT = {

    PARAMS:{
        ID:"id"
    },

    QUERY:{
        SEARCHABLE:[
            "username",
            "email"
        ],

        SORTABLE:[
            "created_at",
            "username",
            "email"
        ],

        FILTERS:[
            "account_status",
            "role_id"
        ],

        DEFAULT:{
            sort:"created_at",
            order:"desc"
        }
    },

    BODY:{
        CREATE:[
            "role_id",
            "username",
            "email",
            "password"
        ],

        UPDATE:[
            "role_id",
            "email",
            "avatar_url"
        ]
    },

    REQUIRED:{
        CREATE:[
            "role_id",
            "username",
            "email",
            "password"
        ],

        UPDATE:[
            "role_id",
            "email"
        ]
    },

    ENUMS:{
        STATUS:[
            "PENDING",
            "ACTIVE",
            "LOCKED",
            "DISABLED",
            "DELETED"
        ]
    },

    FORM:{
        INITIAL_VALUES:{
            role_id:null,
            username:"",
            email:"",
            password:"",
            avatar_url:"",
            account_status:"ACTIVE"
        }
    },

    TABLE:{
        COLUMNS:[
            "username",
            "email",
            "role",
            "account_status",
            "created_at"
        ]
    },

    PLACEHOLDER:{
        username:"admin01",
        email:"admin@gmail.com",
        password:"********"
    },

    LABELS:{
        username:"Username",
        email:"Email",
        password:"Password",
        role_id:"Role",
        account_status:"Status"
    },

    FILTER_OPTIONS:{
        STATUS:[
            "ACTIVE",
            "PENDING",
            "LOCKED",
            "DISABLED"
        ]
    }

}

export const STAFF={

    PARAMS:{
        ID:"id"
    },

    QUERY:{
        SEARCHABLE:[
            "staff_code",
            "full_name",
            "phone"
        ],

        SORTABLE:[
            "staff_code",
            "full_name",
            "hire_date"
        ],

        FILTERS:[
            "gender",
            "staff_status",
            "contract_type"
        ],

        DEFAULT:{
            sort:"hire_date",
            order:"desc"
        }
    },

    BODY:{
        CREATE:[
            "account_id",
            "staff_code",
            "full_name",
            "gender",
            "date_of_birth",
            "identity_card",
            "phone",
            "personal_email",
            "address",
            "academic_rank",
            "hire_date",
            "contract_type"
        ],

        UPDATE:[
            "full_name",
            "gender",
            "date_of_birth",
            "identity_card",
            "phone",
            "personal_email",
            "address",
            "academic_rank",
            "contract_type",
            "staff_status"
        ]
    },

    REQUIRED:{
        CREATE:[
            "account_id",
            "staff_code",
            "full_name",
            "phone"
        ],

        UPDATE:[
            "full_name",
            "phone"
        ]
    },

    ENUMS:{
        GENDER:[
            "MALE",
            "FEMALE",
            "OTHER"
        ],

        CONTRACT:[
            "PROBATION",
            "FULL_TIME",
            "PART_TIME"
        ],

        STATUS:[
            "ACTIVE",
            "ON_LEAVE",
            "SUSPENDED",
            "TERMINATED"
        ]
    },

    FORM:{
        INITIAL_VALUES:{
            account_id:null,
            staff_code:"",
            full_name:"",
            gender:"OTHER",
            date_of_birth:null,
            identity_card:"",
            phone:"",
            personal_email:"",
            address:"",
            academic_rank:"",
            hire_date:null,
            contract_type:"PROBATION",
            staff_status:"ACTIVE"
        }
    },

    TABLE:{
        COLUMNS:[
            "staff_code",
            "full_name",
            "phone",
            "contract_type",
            "staff_status"
        ]
    },

    PLACEHOLDER:{
        staff_code:"STF001",
        full_name:"Nguyen Van A",
        phone:"0900000000",
        identity_card:"012345678901"
    },

    LABELS:{
        staff_code:"Staff Code",
        full_name:"Full Name",
        gender:"Gender",
        phone:"Phone",
        personal_email:"Personal Email",
        academic_rank:"Academic Rank",
        contract_type:"Contract",
        staff_status:"Status"
    },

FILTER_OPTIONS: {
    GENDER: [
        { label: "Male", value: "MALE" },
        { label: "Female", value: "FEMALE" },
        { label: "Other", value: "OTHER" },
    ],

    CONTRACT_TYPE: [
        { label: "Probation", value: "PROBATION" },
        { label: "Full Time", value: "FULL_TIME" },
        { label: "Part Time", value: "PART_TIME" },
    ],

    STAFF_STATUS: [
        { label: "Active", value: "ACTIVE" },
        { label: "On Leave", value: "ON_LEAVE" },
        { label: "Suspended", value: "SUSPENDED" },
        { label: "Terminated", value: "TERMINATED" },
        { label: "Disabled", value: "DISABLE" },
    ],
},

}


