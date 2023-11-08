import axios from "axios";

interface SecondaryFilterInterface {
  port: number;
  service: string;
}

export async function getSecondaryFilters({
  port,
  service,
}: SecondaryFilterInterface) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SECONDARY_FILTERS_BASE_URL}:${port}/${service}/sub_filters`
      //   body
    );
    return response;
  } catch (error) {
    throw error;
  }
}
