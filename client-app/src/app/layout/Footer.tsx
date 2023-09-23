import React, { FC, ReactElement } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

export const Footer: FC = (): ReactElement => {
  return (
    <Box
        sx={{
            width: "100%",
            height: "auto",
            bgcolor: "primary.main",
            paddingTop: "0.3rem",
            paddingBottom: "0.3rem",
            position:'fixed',
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
              {`${new Date().getFullYear()} | About | Creator | Bars`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;