import Link from "next/link";
import { SignUp } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";

export default function SignUpPage() {
  return (
    <Box sx={{
      backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/022/100/132/non_2x/abstract-pink-color-polygon-background-design-abstract-geometric-origami-style-with-gradient-presentation-website-backdrop-cover-banner-pattern-template-free-vector.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      width: '100vw',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
    }}>
    <Container sx={{ minHeight: "100vh", padding: "0", background: "rgba(255, 255, 255, 0.8)" }}>
      <AppBar position="static" sx={{ bgcolor: "rgba(255, 255, 255, 0.8)", boxShadow: 'none', width: "100vw", left: 0, marginLeft: 'calc(-50vw + 50%)'  }}>
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
        sx={{ mt: 4, padding: 4, borderRadius: 2, background: "rgba(255, 255, 255, 0.8)" }}
      >
        <SignUp />
      </Box>
    </Container>
    </Box>
  );
}
