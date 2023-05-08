import Box from "@mui/material/Box"
import { Container, Grid } from "@mui/material";

function LeasePage() {
  return (
    <Container maxWidth="lg" sx={{
      backgroundColor:"green"
    }}>
      <Grid container spacing={3} sx={{
        backgroundColor:"orange"
      }}>
        <Grid item xs={12} md={8} lg={9}>1</Grid>
        <Grid item xs={12} md={8} lg={9}>1</Grid>

        <Grid item xs={12} md={8} lg={9}>1</Grid>

      </Grid>
    </Container>
  )
}

export default LeasePage;