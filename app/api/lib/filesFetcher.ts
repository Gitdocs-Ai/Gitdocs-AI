import axios from "axios";

export async function FetchAllFilesData(
  userId: string,
  files: string[],
  doc_name: string,
) {
  try {
    const response = await axios.post(
      `https://www.gitdocs.space/api/fetch/filetreedata`,
      {
        files,
        doc_name,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userId}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    return [{ name: "error", content: "error" }];
  }
}
