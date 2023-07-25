import * as XLSX from 'xlsx';

export const convertToExcel = async (jsonData: object[], fileName: string): Promise<void> => {
  const worksheet = XLSX.utils.json_to_sheet(jsonData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const excelData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(excelData);
  link.download = `${fileName}.xlsx`;
  link.click();
  link.remove();

  await new Promise((resolve) => setTimeout(resolve, 100));
};
