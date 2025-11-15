import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function TopBar(){
  return (
    <AppBar position="static" elevation={0} color="transparent" sx={{ borderBottom: "1px solid rgba(15,23,42,0.06)" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">Claims Operations</Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography variant="body2" color="text.secondary">Status: Offline Demo</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
