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
      total_budget: { ...state?.total_budget, status: false },
      total_quantity: { ...state?.total_quantity, status: false },
      strategic_plan: { ...state?.strategic_plan, status: false },
      share_per: { ...state?.share_per, status: false },
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
      total_budget: { ...state?.total_budget, status: false },
      total_quantity: { ...state?.total_quantity, status: false },
      strategic_plan: { ...state?.strategic_plan, status: false },
      share_per: { ...state?.share_per, status: false },
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
      total_budget: { ...state?.total_budget, status: false },
      total_quantity: { ...state?.total_quantity, status: false },
      strategic_plan: { ...state?.strategic_plan, status: false },
      share_per: { ...state?.share_per, status: false },
      group_by: { ...state?.group_by, status: false },
      expand: { status: true, row: { ...row?.original } },
    };
  } else if (type === "EDIT_FIELD_SUBMIT") {
    const { row, column, value } = action?.payload;
    return {
      ...state,
      fetch_from_db: false,
      total_budget: { ...state?.total_budget, status: false },
      total_quantity: { ...state?.total_quantity, status: false },
      strategic_plan: { ...state?.strategic_plan, status: false },
      share_per: { ...state?.share_per, status: false },
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
      total_budget: { ...state?.total_budget, status: false },
      total_quantity: { ...state?.total_quantity, status: false },
      strategic_plan: { ...state?.strategic_plan, status: false },
      share_per: { ...state?.share_per, status: false },
      sort: action?.table?.getState()?.sorting[0] ?? {},
    };
  } else if (type === "PAGE_SIZE") {
    const { value } = action;
    return {
      ...state,
      fetch_from_db: false,
      table_changes: {},
      total_budget: { ...state?.total_budget, status: false },
      total_quantity: { ...state?.total_quantity, status: false },
      strategic_plan: { ...state?.strategic_plan, status: false },
      share_per: { ...state?.share_per, status: false },
      page_size: Number(value),
    };
  } else if (type === "PAGE_NUMBER") {
    const { value } = action;
    return {
      ...state,
      fetch_from_db: false,
      table_changes: {},
      total_budget: { ...state?.total_budget, status: false },
      total_quantity: { ...state?.total_quantity, status: false },
      strategic_plan: { ...state?.strategic_plan, status: false },
      share_per: { ...state?.share_per, status: false },
      page_number: value,
    };
  } else if (type === "SECONDARY_FILTER") {
    const { key, value } = action?.payload;
    return {
      ...state,
      fetch_from_db: false,
      table_changes: {},
      total_budget: { ...state?.total_budget, status: false },
      total_quantity: { ...state?.total_quantity, status: false },
      strategic_plan: { ...state?.strategic_plan, status: false },
      share_per: { ...state?.share_per, status: false },
      secondary_filter: {
        ...state?.secondary_filter,
        [key]: value,
      },
    };
  } else if (type === "SP_TOTAL_BUDGET_SUBMIT") {
    const { total_budget, price } = action?.payload;
    return {
      ...state,
      fetch_from_db: false,
      table_changes: {},
      strategic_plan: { ...state?.strategic_plan, status: true },
      // total_quantity: { ...state?.total_quantity, status: false },
      total_quantity: {
        status: false,
        value: Number(total_budget) / Number(price),
      },
      share_per: { ...state?.share_per, status: false },
      total_budget: { status: true, value: Number(total_budget) },
    };
  } else if (type === "SP_TOTAL_QUANTITY_SUBMIT") {
    const { total_quantity, price } = action?.payload;
    return {
      ...state,
      fetch_from_db: false,
      table_changes: {},
      strategic_plan: { ...state?.strategic_plan, status: true },
      share_per: { ...state?.share_per, status: false },
      // total_budget: { ...state?.total_budget, status: false },
      total_budget: {
        status: false,
        value: Number(total_quantity) * Number(price),
      },
      total_quantity: { status: true, value: Number(total_quantity) },
    };
  } else if (type === "SP_ADD_YEAR_SUBMIT") {
    const { value } = action;
    return {
      ...state,
      fetch_from_db: false,
      table_changes: {},
      total_budget: { ...state?.total_budget, status: false },
      total_quantity: { ...state?.total_quantity, status: false },
      share_per: { ...state?.share_per, status: false },
      strategic_plan: {
        status: true,
        values: { ...state?.strategic_plan?.values, ...value },
      },
    };
  } else if (type === "SP_MONTHLY_SHARE_MIX_SUBMIT") {
    const { value } = action;
    return {
      ...state,
      fetch_from_db: false,
      table_changes: {},
      total_budget: { ...state?.total_budget, status: false },
      total_quantity: { ...state?.total_quantity, status: false },
      strategic_plan: { ...state?.strategic_plan, status: false },
      share_per: { status: true, values: value },
    };
  } else {
    return state;
  }
}
