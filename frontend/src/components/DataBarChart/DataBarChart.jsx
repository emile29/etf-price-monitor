import { BarChart } from '@mui/x-charts/BarChart';

export default function DataBarChart({ data }) {
  return (
    <BarChart
      dataset={data || []}
      xAxis={[{ dataKey: 'name', label: 'Constituent' }]}
      series={[{ dataKey: 'size', label: 'Size' }]}
      height={300}
    />
  );
}