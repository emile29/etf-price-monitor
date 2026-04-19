import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export default function DataGraph({ data }) {
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    if (data) {
      const formatted = data.map(item => ({
        ...item,
        timestamp: new Date(item.timestamp)
      }));
      setFormattedData(formatted);
    }
  }, [data]);

  return (
    <LineChart
      dataset={formattedData || []}
      xAxis={[
        {
          dataKey: 'timestamp',
          scaleType: 'time',
          valueFormatter: (date) => dayjs.utc(date).format('YYYY/MM/DD'),
          label: 'Time',
        },
      ]}
      yAxis={[{ label: 'Price' }]}
      series={[{ dataKey: 'price' }]}
      height={300}
      grid={{ vertical: true, horizontal: true }}
    />
  );
}
