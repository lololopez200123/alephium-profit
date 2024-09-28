export default function formatPNLvalue(value: number) {
  return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%' || '0%';
}
