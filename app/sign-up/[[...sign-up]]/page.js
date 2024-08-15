import Link from "next/link";
import { SignUp } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";

export default function SignUpPage() {
  return (
    <Container sx={{ minHeight: "100vh", padding: "0", background: "#f5f5dc" }}>
      <AppBar position="static" sx={{ bgcolor: "#e0e0e0", boxShadow: 'none', width: "100vw", left: 0, marginLeft: 'calc(-50vw + 50%)'  }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#333" }}>
            FlashBook
          </Typography>
          <Button color="inherit">
            <Link href="/" passHref>
              <Typography sx={{ color: "#333" }}>Home</Typography>
            </Link>
          </Button>
          <Button color="inherit">
            <Link href="/sign-in" passHref>
              <Typography sx={{ color: "#333" }}>Sign in</Typography>
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 4, padding: 4, borderRadius: 2, background: "#f5f5dc" }}
      >
        <SignUp />
      </Box>
    </Container>
  );
}
