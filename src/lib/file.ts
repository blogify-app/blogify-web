export const toBase64 = (blob: Blob) => {
  const reader = new FileReader();

  return new Promise<string>((resolve, reject) => {
    reader.onerror = (e) => {
      reject(e);
    };

    reader.onload = (e) => {
      // expecting a base64
      const base64 = e.target?.result! as string;
      resolve(base64);
    };

    reader.readAsDataURL(blob);
  });
};
