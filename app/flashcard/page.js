"use client";

import { useUser, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useSearchParams } from "next/navigation";
import { Card, Grid, Container, Typography, Box, Button, CardActionArea, CardContent, AppBar, Toolbar } from '@mui/material';

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const searchParams = useSearchParams();
  const search = searchParams.get('id');

  useEffect(() => {
    const getFlashcards = async () => {
      if (!search || !user) return;

      try {
        const userDocRef = doc(db, 'users', user.id);

        const colRef = collection(userDocRef, search);

        const docs = await getDocs(colRef);
        const fetchedFlashcards = [];

        docs.forEach((doc) => {
          fetchedFlashcards.push({ id: doc.id, ...doc.data() });
        });

        setFlashcards(fetchedFlashcards);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };

    getFlashcards();
  }, [search, user]);

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <Container maxWidth="100vw">
      <AppBar sx={{ bgcolor: "#e0e0e0", boxShadow: 'none', width: "100vw", left: 0, marginLeft: 'calc(-50vw + 50%)' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ color: "black", fontWeight: 'bold'  }}>
            FlashBook
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6" sx={{ color: "black", fontWeight: 'bold'  }}>
              {collection.name}
            </Typography>
          </Box>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3} sx={{ mt: 4 }}>

              {flashcards.map((flashcard) => (
                <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
                  <Card>
                    <CardActionArea onClick={() => handleCardClick(flashcard.id)}>
                      <CardContent>
                        <Box sx={{
                          perspective: '1000px',
                          '& > div': {
                            transition: 'transform 0.6s',
                            transformStyle: 'preserve-3d',
                            position: 'relative',
                            width: '100%',
                            height: '200px',
                            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                            transform: flipped[flashcard.id] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                          },
                          '& > div > div': {
                            position: 'absolute',
                            width: '100%',
                            height: '200px',
                            backfaceVisibility: 'hidden',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 2,
                            boxSizing: 'border-box'
                          },
                          '& > div > div:nth-of-type(2)': {
                            transform: 'rotateY(180deg)',
                          }
                        }}>
                          <div>
                            <div>
                              <Typography variant='h5' component='div'>
                                {flashcard.front}
                              </Typography>
                            </div>
                            <div>
                              <Typography variant='h5' component='div'>
                                {flashcard.back}
                              </Typography>
                            </div>
                          </div>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
      </Grid>
    </Container>
  );
}
