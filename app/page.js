"use client"

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Container, AppBar, Toolbar, Typography, Button, Box, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

const getStripe = () => {
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
};

export default function Home() {
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/checkout_session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [{ id: "pro_subscription" }]
        })
      });

      if (!response.ok) {
        console.error('Failed to create checkout session');
        return;
      }

      const checkoutSession = await response.json();

      if (!checkoutSession.id) {
        console.error('Checkout session ID is missing');
        return;
      }

      const stripe = await getStripe();

      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSession.id,
      });

      if (error) {
        console.warn(error.message);
      }

    } catch (error) {
      console.error('Error during checkout process:', error);
    }
  };
  
  return (
    <Container maxWidth="100vw" sx={{ 
      minHeight: "100vh", 
      padding: "0", 
      backgroundImage: "url('https://i.pinimg.com/originals/dc/ad/1e/dcad1e0ae9c943378f90c579a82d0040.jpg')", 
      backgroundSize: "cover", 
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      overflow: "hidden"
    }}>
      <AppBar position="static" sx={{ bgcolor: "rgba(255, 255, 255, 0.8)", boxShadow: 'none', width: "100vw", left: 0, marginLeft: 'calc(-50vw + 50%)' }}>
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
        Welcome to FlashBooks
        </Typography>
        <Typography variant="h5" sx={{ color: '#555', mb: 2 }}>
        The easiest way to create flashcards from your books
        </Typography>
      </Box>
      <Box sx={{ my: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', color: 'black' }}>
          Features
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            { title: 'Easy Book Input', description: 'Simply input your book title with author name and let our AI generate flashcards for you.' },
            { title: 'Smart Flashcards', description: 'Our AI breaks down your book into concise flashcards.' },
            { title: 'Accessible Anywhere', description: 'Access your flashcards from any device at any time.' }
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box sx={{
                p: 3,
                border: '2px solid #ccc',
                borderRadius: 2,
                borderTop: '3px solid rgba(255, 255, 255, 0.8)',
                borderLeft: '3px solid rgba(255, 255, 255, 0.8)',
                textAlign: 'center',
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  borderColor: 'rgba(255, 255, 255, 0.8)',
                }
              }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#333' }}>{feature.title}</Typography>
                <Typography sx={{ color: '#555' }}>{feature.description}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Pricing
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: '2px solid #ccc',
                borderRadius: 2,
                borderTop: '3px solid rgba(255, 255, 255, 0.8)',
                borderLeft: '3px solid rgba(255, 255, 255, 0.8)',
                textAlign: 'center',
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  borderColor: 'rgba(255, 255, 255, 0.8)',
                }
              }}
            >
              <Typography variant="h5" gutterBottom>
                Basic
              </Typography>
              <Typography variant="h6" gutterBottom>
                Free
              </Typography>
              <Typography>
                {" "}
                Generate 5 Flashcards Daily
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2, bgcolor: "#3f51b5", '&:hover': { bgcolor: "#303f9f" } }}>
                Choose Basic
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: '2px solid #ccc',
                borderRadius: 2,
                borderTop: '3px solid rgba(255, 255, 255, 0.8)',
                borderLeft: '3px solid rgba(255, 255, 255, 0.8)',
                textAlign: 'center',
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  borderColor: 'rgba(255, 255, 255, 0.8)',
                }
              }}
            >
              <Typography variant="h5" gutterBottom>
                Pro
              </Typography>
              <Typography variant="h6" gutterBottom>
                $5 / month
              </Typography>
              <Typography>
                {" "}
                Generate Unlimited Flashcards Daily
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2, bgcolor: "#3f51b5", '&:hover': { bgcolor: "#303f9f" } }} onClick={handleSubmit}>
                Choose Pro  
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
