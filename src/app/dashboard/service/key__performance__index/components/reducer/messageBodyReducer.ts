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
        newValue: Number(value),
      },
    };
  } else if (type === "SORT") {
    return {
      ...state,
      fetch_from_db: false,
      table_changes: {},
      sort: action?.table?.getState()?.sorting[0] ?? {},
    };
  } else if (type === "PAGE_SIZE") {
    const { value } = action;
    return {
      ...state,
      fetch_from_db: false,
      table_changes: {},
      page_size: Number(value),
    };
  } else if (type === "PAGE_NUMBER") {
    const { value } = action;
    return {
      ...state,
      fetch_from_db: false,
      table_changes: {},
      page_number: value,
    };
  } else if (type === "SECONDARY_FILTER") {
    const { key, value } = action?.payload;
    return {
      ...state,
      fetch_from_db: false,
      table_changes: {},
      secondary_filter: {
        ...state?.secondary_filter,
        [key]: value,
      },
    };
  } else {
    return state;
  }
}
