import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';

const columns_ = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const columns = [
  { field: 'id', headerName: 'ID', minWidth: 70, flex: 0.1 },
  { field: 'constituent', headerName: 'Constituent Name', minWidth: 130, flex: 0.3 },
  { field: 'weight', headerName: 'Weight', minWidth: 150, flex: 0.2 },
  { field: 'latestClosePrice', headerName: 'Latest Close Price', minWidth: 150, flex: 0.2 },
]

const rows1 = [
  { id: 1, etfName: "A", weight: 0.2, latestClosePrice: 100.0 },
  { id: 2, etfName: "B", weight: 0.3, latestClosePrice: 200.0 },
  { id: 3, etfName: "C", weight: 0.25, latestClosePrice: 150.0 },
  { id: 4, etfName: "D", weight: 0.15, latestClosePrice: 120.0 },
  { id: 5, etfName: "E", weight: 0.1, latestClosePrice: 80.0 },
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
