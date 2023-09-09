import { Box, Stack, Typography } from "@mui/material";
import LogoIcon from "./icon/LogoIcon";

function Sidebar() {
    return (
          <Box
            display="flex"
            height="100vh"
            justifyContent="center"
            alignItems="center"
            bgcolor="#EFEBE0"
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >              
            <Typography variant="h3">frody</Typography>
              <LogoIcon></LogoIcon>
              <Typography variant="h6">
                Real-time fraud detection using Artificial Intelligence.
              </Typography>
              <br></br>
              <center>
              <Typography variant="inherit">
                Developed by Boosung Kim, Henry Nguyen, Marcel Lee, and Alexander Witkowski. Created for PennApps XXIV.
              </Typography>
              </center>
            </Stack>
          </Box>
)}

export default Sidebar;