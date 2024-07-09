export default function useFile() {
  /**
   * @param {File} file: file to upload
   * @returns {fileNm: string}
   */
  async function uploadFile(file: File) {
    const data = new FormData();
    data.set("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });

    if (!res.ok) throw new Error("Failed to get upload url");

    return res.json();
  }

  return {
    uploadFile: uploadFile,
  };
}
