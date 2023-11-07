import { FC, ReactElement } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

export const Footer: FC = (): ReactElement => {
  return (
    <Box
        sx={{
            width: "100%",
            height: "auto",
            background: 'linear-gradient(135deg, #e91e63, #2D1638)',
            paddingTop: "0.3rem",
            paddingBottom: "0.3rem",
            left:0,
            bottom:0,
            right:0
        }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="#fff" variant="h5" fontFamily='monospace'>
              Downtown
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color='#fff' variant="subtitle1" fontFamily='monospace'>
              {`Copyrights ${new Date().getFullYear()} | About | Our Team | Contact us | Terms of Service`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;