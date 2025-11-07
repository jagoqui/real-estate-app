/**
 * Converts a URL (blob or server URL) to a File object
 * 
 * @param url - The URL to convert (can be blob: or http:/https:)
 * @param fileName - The name for the resulting File
 * @param mimeType - Optional MIME type, will use blob type if not provided
 * @returns Promise that resolves with the File object
 */
export const urlToFile = async (url: string, fileName: string, mimeType?: string): Promise<File> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], fileName, { type: mimeType ?? blob.type });
  } catch (error) {
    console.error('Error converting URL to File:', error);
    throw error;
  }
};

/**
 * Converts an array of URLs to an array of Files
 * 
 * @param urls - Array of URLs to convert
 * @param getFileName - Optional function to generate filename from URL
 * @returns Promise that resolves with array of File objects
 */
export const urlsToFiles = async (
  urls: Array<string>,
  getFileName?: (url: string, index: number) => string
): Promise<Array<File>> => {
  return Promise.all(
    urls.map(async (url, index) => {
      const fileName = getFileName
        ? getFileName(url, index)
        : url.substring(url.lastIndexOf('/') + 1) || `image-${index}.jpg`;
      return urlToFile(url, fileName);
    })
  );
};
