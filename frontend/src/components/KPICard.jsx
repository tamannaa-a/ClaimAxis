import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function KPICard({title, value, sub}){
  return (
    <Box className="card">
      <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
      <Typography variant="h5" sx={{ mt:1 }}>{value}</Typography>
      {sub && <Typography variant="body2" color="text.secondary" sx={{ mt:1 }}>{sub}</Typography>}
    </Box>
  );
}
