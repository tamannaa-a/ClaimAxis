import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import GavelIcon from "@mui/icons-material/Gavel";
import DescriptionIcon from "@mui/icons-material/Description";
import SummarizeIcon from "@mui/icons-material/Summarize";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

const drawerWidth = 260;

export default function Sidebar(){
  const items = [
    { text: "Overview", to: "/", icon: <HomeIcon/> },
    { text: "Analyze Claim", to: "/analyze", icon: <GavelIcon/> },
    { text: "Document Classifier", to: "/documents", icon: <DescriptionIcon/> },
    { text: "Policy Summarizer", to: "/summaries", icon: <SummarizeIcon/> },
  ];

  return (
    <Drawer variant="permanent" sx={{
      width: drawerWidth,
      "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box", bgcolor: "primary.main", color: "white" }
    }}>
      <Toolbar sx={{ px:2 }}>
        <Typography variant="h6" noWrap component="div">ClaimAxis</Typography>
      </Toolbar>
      <List>
        {items.map((it)=>(
          <ListItemButton key={it.to} component={RouterLink} to={it.to} sx={{ color: "white" }}>
            <ListItemIcon sx={{ color: "white" }}>{it.icon}</ListItemIcon>
            <ListItemText primary={it.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
