import axios from "axios";

export async function getOtbData(body: any) {
  try {
    const response = await axios.post(
      "http://43.231.127.113:8001/otb/get_data",
      body
    );
    return response;
  } catch (error) {
    throw error;
  }
}
