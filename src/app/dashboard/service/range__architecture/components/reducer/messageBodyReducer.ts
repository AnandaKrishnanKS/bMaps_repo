export function messageBodyReducer(state: any, action: any) {
  const { type } = action;

  if (type === "FILTER_SUBMIT") {
    return action?.data;
  } else if (type === "GET_INITIAL_TABLE_PAGE") {
    return {
      ...state,
      fetch_from_db: false,
      table_changes: {},
      expand: {
        status: false,
        row: {},
      },
      input_field: {
        ...state?.input_field,
        status: false,
      },
      group_by: { ...state?.group_by, status: true },
      page_number: 0,
      page_size: 10,
    };
  } else if (type === "COLLAPSE") {
    const { expandHistory } = action;
    return {
      ...state,
      table_changes: {},
      fetch_from_db: false,
      input_field: {
        ...state?.input_field,
        status: false,
      },
      expand: {
        status: true,
        row: { ...expandHistory[expandHistory?.length - 2] },
      },
    };
  } else if (type === "EXPAND_ROW") {
    const { row } = action;
    return {
      ...state,
      table_changes: {},
      fetch_from_db: false,
      group_by: { ...state?.group_by, status: false },
      input_field: {
        ...state?.input_field,
        status: false,
      },
      expand: { status: true, row: { ...row?.original } },
    };
  } else if (type === "EDIT_FIELD_SUBMIT") {
    const { row, column, value } = action?.payload;
    return {
      ...state,
      fetch_from_db: false,
      table_changes: {
        row: row?.original,
        columnId: column.id,
        input_field: {
          ...state?.input_field,
          status: false,
        },
        newValue: Number(value),
      },
    };
  } else if (type === "SORT") {
    return {
      ...state,
      fetch_from_db: false,
      table_changes: {},
      input_field: {
        ...state?.input_field,
        status: false,
      },
      sort: action?.table?.getState()?.sorting[0] ?? {},
    };
  } else if (type === "PAGE_SIZE") {
    const { value } = action;
    return {
      ...state,
      fetch_from_db: false,
      table_changes: {},
      input_field: {
        ...state?.input_field,
        status: false,
      },
      page_size: Number(value),
    };
  } else if (type === "PAGE_NUMBER") {
    const { value } = action;
    return {
      ...state,
      fetch_from_db: false,
      table_changes: {},
      input_field: {
        ...state?.input_field,
        status: false,
      },
      page_number: value,
    };
  } else if (type === "SECONDARY_FILTER") {
    const { key, value } = action?.payload;
    return {
      ...state,
      fetch_from_db: false,
      table_changes: {},
      input_field: {
        ...state?.input_field,
        status: false,
      },
      secondary_filter: {
        ...state?.secondary_filter,
        [key]: value,
      },
    };
  } else if (type === "RA_INPUT_FIELD_SUBMIT") {
    const { value } = action;
    return {
      ...state,
      fetch_from_db: false,
      table_changes: {},
      input_field: {
        status: true,
        ...value,
      },
    };
  } else if (type === "RA_UPLOAD_INIT") {
    return {
      ...state,
      fetch_from_db: false,
      table_changes: {},
      input_field: {
        ...state?.input_field,
        status: false,
      },
      upload_status: false,
    };
  } else if (type === "RA_UPLOAD_SUCCESS") {
    return {
      ...state,
      fetch_from_db: false,
      table_changes: {},
      input_field: {
        ...state?.input_field,
        status: false,
      },
      upload_status: true,
    };
  } else if (type === "RA_TAB_CHANGE") {
    const { tabName } = action;
    return {
      ...state,
      fetch_from_db: false,
      tab_name: tabName,
    };
  } else {
    return state;
  }
}
