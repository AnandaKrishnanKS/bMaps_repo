import axios, { AxiosError } from "axios";
import { getauthHeader } from "@/app/api/utils/AuthHeader";
import { ENDPOINTS } from "./utils/apiConfig";
import { Filter } from "lucide-react";

interface MasterFilterResponse {
  filter_values: {
    channel: string[];
    category: string[];
    sub_category: string[]
    family: string[];
    sub_family: string[];
    suppliers: string[];
    sku: string[];
    class: string[];
    top_items: number[];
  };
}
interface ErrorResponse {
  message: string;
  detail: string;
}

export async function getMasterFilters(
  filters: string[]
): Promise<MasterFilterResponse> {
  try {
    const response = await axios.post(
      ENDPOINTS.ITEM_MASTER_FILTERS,
      {
        filter_params: filters,
      },
      {
        headers: getauthHeader(),
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response) {
        throw new Error(axiosError.response.data.message || "Error logging in");
      } else if (axiosError.request) {
        throw new Error("No response received from server. Please try again.");
      }
    }
    // Handle generic error
    throw new Error("Error fetching user details.");
  }
}

interface hierarchyProps {
  filterName: string;
  filterData: string[];
}

export async function getHierarchicalFilters({
  filterName,
  filterData,
}: hierarchyProps): Promise<MasterFilterResponse> {
  try {
    const response = await axios.post(
      ENDPOINTS.ITEM_MASTER_HIERARCHICAL_FILTERS,
      {
        filter_name: filterName,
        filter_data: filterData,
      },
      {
        headers: getauthHeader(),
      }
    );
    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response) {
        throw new Error(axiosError.response.data.message || "Error logging in");
      } else if (axiosError.request) {
        throw new Error("No response received from server. Please try again.");
      }
    }
    // Handle generic error
    throw new Error("Error fetching user details.");
  }
}