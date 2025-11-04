export const dataToFormDataHelper = <Data extends object>(data: Data): FormData => {
  const formData = new FormData();

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key as keyof typeof data];

      if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    }
  }

  return formData;
};
