import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#0d1b2a" }}>
        <Toolbar>
          <Typography
            variant="h4"
            sx={{
              flexGrow: 1,
              cursor: "pointer",
              textDecoration: "none",
              color: "white",
            }}
            component={Link}
            to="/"
          >
            CookBook
          </Typography>
          <Button color="inherit" component={Link} to="/history">
            History
          </Button>
          <Button color="inherit" component={Link} to="/preference">
            Preference
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
