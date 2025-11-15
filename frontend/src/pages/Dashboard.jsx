import Grid from "@mui/material/Grid";
import KPICard from "../components/KPICard";
import RiskGauge from "../components/RiskGauge";
import Typography from "@mui/material/Typography";

export default function Dashboard(){
  return (
    <>
      <Typography variant="h4" gutterBottom>Overview</Typography>
      <Typography className="small-muted" gutterBottom>Enterprise AI Platform for Intelligent Insurance Operations</Typography>

      <Grid container spacing={3} sx={{ mt:1 }}>
        <Grid item xs={12} md={4}><KPICard title="Claims Processed Today" value="182" sub="Automated coverage 71%" /></Grid>
        <Grid item xs={12} md={4}><KPICard title="Avg. Time Saved" value="37 sec" sub="Per claim (est.)" /></Grid>
        <Grid item xs={12} md={4}><KPICard title="Doc Class Accuracy" value="92%" sub="Confidence" /></Grid>

        <Grid item xs={12} md={8}>
          <div className="card">
            <Typography variant="h6">Business Impact</Typography>
            <ul className="small-muted">
              <li>Estimated ops savings: <strong>₹38,000/day</strong></li>
              <li>Manual review reduction: <strong>42%</strong></li>
              <li>Fraud catch rate improvement: <strong>+18% YoY</strong></li>
            </ul>
          </div>
        </Grid>

        <Grid item xs={12} md={4}><RiskGauge score={0.17} /></Grid>
      </Grid>
    </>
  );
}
