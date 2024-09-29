import { DecryptCSV } from "./Crypto";

export async function HandleFileDownload(response: Response) {
  let filename = 'passwords.csv';
  const blob = await response.blob() as File
  const file = await DecryptCSV(blob) as Blob
  const url = window.URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  
  document.body.appendChild(link);
  link.click();
  
  link.remove();
  window.URL.revokeObjectURL(url);
}
