import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';

const columns = [
  { field: 'id', headerName: 'ID', minWidth: 70, flex: 0.1 },
  { field: 'constituent', headerName: 'Constituent Name', minWidth: 130, flex: 0.3 },
  { field: 'weight', headerName: 'Weight', minWidth: 150, flex: 0.2 },
  { field: 'latestClosePrice', headerName: 'Latest Close Price', minWidth: 150, flex: 0.2 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable({ data }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data) {
      setRows(data.map((row, index) => ({ id: index + 1, constituent: row.name, weight: row.weight, latestClosePrice: row.latestClosePrice })));
    }
  }, [data]);

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
        checkboxSelection={false}
        disableRowSelectionOnClick 
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false
            },
          },
        }}
      />
    </Paper>
  );
}
