export const fileToBase64Helper = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (): void => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to base64.'));
      }
    };
    reader.onerror = (error: ProgressEvent<FileReader>): void =>
      reject(new Error(`File reading error: ${error.target?.error?.message || 'Unknown error'}`));
  });
};
