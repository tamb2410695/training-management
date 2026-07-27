const BASE_FIELD = {
  defaultValue: null,

  form: {
    visible: true,
    component: null,
    placeholder: "",
    readonly: false,

    disabled: {
      create: false,
      update: false,
    },

    layout: {
      col: 12,
      xs: 12,
      sm: null,
      md: null,
      lg: null,
      xl: null,
    },
  },

  view:{
    visible:true,
    component:null,
    formatter:null,
    emptyText:"-",
  },


  table: {
    visible: true,
    width: 180,
    align: "left",
    formatter: null,
    renderer: null,
    nowrap: true,
  },

  query: {
    searchable: false,
    sortable: false,
    filter: null,
  },

  validation: {
    required: {
      create: false,
      update: false,
    },
    rules: [],
    trigger: "blur",
  },

  enum: null,

  api: {
    create: true,
    update: true,
  },

  export: {
    visible: false,
  },

  import: {
    visible: false,
  },
};

const createField = (config) => ({
  ...structuredClone(BASE_FIELD),
  ...config,

  form: {
    ...structuredClone(BASE_FIELD.form),
    ...(config.form ?? {}),

    layout: {
      ...structuredClone(BASE_FIELD.form.layout),
      ...(config.form?.layout ?? {}),
    },
  },

  view: {
    ...structuredClone(BASE_FIELD.view),
    ...(config.view ?? {}),
  },

  table: {
    ...structuredClone(BASE_FIELD.table),
    ...(config.table ?? {}),
  },

  query: {
    ...structuredClone(BASE_FIELD.query),
    ...(config.query ?? {}),
  },

  validation: {
    ...structuredClone(BASE_FIELD.validation),
    ...(config.validation ?? {}),
  },


  api: {
    ...structuredClone(BASE_FIELD.api),
    ...(config.api ?? {}),
  },

  export: {
    ...structuredClone(BASE_FIELD.export),
    ...(config.export ?? {}),
  },

  import: {
    ...structuredClone(BASE_FIELD.import),
    ...(config.import ?? {}),
  },
});

export const FIELD_DEFAULTS = {
  text: createField({
    defaultValue: "",
    form: {
      component: "TextField",
    },
    query: {
      searchable: true,
      filter: {
        type: "text",
        defaultValue: "",
      },
    },
  }),

  email: createField({
    defaultValue: "",
    form: {
      component: "EmailField",
    },
    table: {
      width: 220,
    },
    query: {
      searchable: true,
      filter: {
        type: "text",
        defaultValue: "",
      },
    },
  }),

  password: createField({
    defaultValue: "",
    form: {
      component: "PasswordField",
    },
    view: {
      visible: false
    },
    table: {
      visible: false,
    },
  }),

  phone: createField({
    defaultValue: "",
    form: {
      component: "PhoneField",
    },
    table: {
      width: 140,
    },
    query: {
      searchable: true,
      filter: {
        type: "text",
        defaultValue: "",
      },
    },
  }),

  date: createField({
    form: {
      component: "DateField",
    },
    table: {
      width: 130,
    },
    query: {
      filter: {
        type: "date-range",
        defaultValue: {
          from: null,
          to: null,
        },
      },
    },
  }),

  textarea: createField({
    defaultValue: "",
    form: {
      component: "TextareaField",
    },
    table: {
      visible: false,
    },
  }),

  select: createField({
    defaultValue: "",
    form: {
      component: "SelectField",
    },
    table: {
      width: 120,
    },
  }),

  badge: createField({
    defaultValue: "",
    form: {
      component: "BadgeField",
    },
    table: {
      width: 130,
    },
  }),
};
