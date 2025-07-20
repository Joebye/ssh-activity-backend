import { DataGrid, type GridColDef} from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { useSocketLoginEvents } from "../hooks/useSocketLoginEvents";


type GridComponentProps = {
  mainTitle: string,
  emptyState: string
}


const EventLoginDataGrid: React.FC<GridComponentProps> = (props) => {
  const loginEvents = useSocketLoginEvents();
  
  const rows = loginEvents.map((event) => ({
    id: `${event._id}`,
    
    ...event,
  }));

 const columns: GridColDef[] = [
  {
    field: "username",
    headerName: "User",
    flex: 1, 
    minWidth: 200,
    sortable: true,
  },
  {
    field: "ip",
    headerName: "IP",
    flex: 1,
    minWidth: 180,
    sortable: true,
  },
  {
    field: "timestamp",
    headerName: "Time",
    flex: 2,
    minWidth: 280,
    valueFormatter: (params) =>
      new Date(params as string).toLocaleString(),
    sortable: true,
  },
];


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {props.mainTitle}
      </Typography>
      <Box sx={{ width: 'auto', height: 'auto', borderRadius: 2, boxShadow: 1, p: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          getRowId={(row) => row.id}
        />
      </Box>
      {loginEvents.length === 0 && (
        <Typography sx={{ mt: 2 }}>{props.mainTitle}</Typography>
      )}
    </Box>
  );
}

export default EventLoginDataGrid;
