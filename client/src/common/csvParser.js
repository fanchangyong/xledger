import Papa from 'papaparse';

export default function parseCsv(csvString) {
  const results = Papa.parse(csvString);
  return results;
}
