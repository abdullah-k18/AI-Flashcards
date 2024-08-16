import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Container, AppBar, Toolbar, Typography, Button, Box, Grid } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="100vw" sx={{ minHeight: "100vh", padding: "0", background: "linear-gradient(to bottom, #f5f5dc, #fafafa)" }}>
      <AppBar position="static" sx={{ bgcolor: "#e0e0e0", boxShadow: 'none', width: "100vw", left: 0, marginLeft: 'calc(-50vw + 50%)'  }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "black" }}>
            FlashBook
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in" sx={{ color: "#333" }}>sign in</Button>
            <Button color="inherit" href="/sign-up" sx={{ color: "#333" }}>Sign up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box 
        sx={{
          textAlign: 'center',
          my: 4,
          padding: 4,
          borderRadius: 2,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
          background: "rgba(255, 255, 255, 0.9)"
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#333' }}>
          Welcome to FlashBook
        </Typography>
        <Typography variant="h5" sx={{ color: '#555', mb: 2 }}>
          Effortlessly create smart flashcards from your favorite books for quick and effective learning.
        </Typography>
        <Button variant="contained" sx={{ mt: 2, bgcolor: "#ffeb3b", color: "#333", '&:hover': { bgcolor: "#ffd700" } }}>Get Started</Button>
      </Box>
      <Box sx={{ my: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', color: '#333' }}>
          Features
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            { title: 'Easy Text Input', description: 'Simply input your text and let our AI create flashcards for you. Creating flashcards has never been easier.' },
            { title: 'Smart Flashcards', description: 'Our AI breaks down your text into concise flashcards, perfect for studying.' },
            { title: 'Accessible Anywhere', description: 'Access your flashcards from any device at any time. Study anywhere, anytime.' }
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box sx={{
                p: 3,
                border: '2px solid #ccc',
                borderRadius: 2,
                borderTop: '3px solid #ffeb3b',
                borderLeft: '3px solid #ffeb3b',
                textAlign: 'center',
                bgcolor: '#fafafa',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  borderColor: '#ffeb3b',
                }
              }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#333' }}>{feature.title}</Typography>
                <Typography sx={{ color: '#555' }}>{feature.description}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#333' }}>
          Pricing
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            { plan: 'Basic', price: '$5 / month', description: 'Access to basic flashcard features and limited storage' },
            { plan: 'Pro', price: '$10 / month', description: 'Access to pro flashcard features and unlimited storage' }
          ].map((pricing, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box sx={{
                p: 3,
                border: '2px solid #ccc',
                borderRadius: 2,
                borderTop: '3px solid #ffeb3b',
                borderLeft: '3px solid #ffeb3b',
                textAlign: 'center',
                bgcolor: '#fafafa',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  borderColor: '#ffeb3b',
                }
              }}>
                <Typography variant="h5" gutterBottom sx={{ color: '#333' }}>{pricing.plan}</Typography>
                <Typography variant="h6" gutterBottom sx={{ color: '#555' }}>{pricing.price}</Typography>
                <Typography sx={{ color: '#555' }}>{pricing.description}</Typography>
                <Button variant="contained" sx={{ mt: 2, bgcolor: "#ffeb3b", color: "#333", '&:hover': { bgcolor: "#ffd700" } }}>Choose {pricing.plan}</Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}
