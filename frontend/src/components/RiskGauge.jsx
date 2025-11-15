import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

export default function RiskGauge({score=0.17}){
  const pct = Math.round(score*100);
  return (
    <Box className="card">
      <Typography variant="subtitle2" color="text.secondary">Fraud Risk</Typography>
      <Typography variant="h4" sx={{ mt:1 }}>{pct}%</Typography>
      <Box sx={{ mt:2 }}>
        <LinearProgress variant="determinate" value={pct} />
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mt:1 }}>
        Level: {pct>=70? "High": pct>=55? "Medium":"Low"}
      </Typography>
    </Box>
  );
}
