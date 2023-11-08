import axios from "axios";

export async function uploadExcel(body: any) {
  try {
    const response = await axios.post(
      "http://3.6.35.155:3900/range/upload",
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}
