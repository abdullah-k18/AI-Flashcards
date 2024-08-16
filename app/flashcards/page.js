"use client";

import { useUser, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { collection, doc, getDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase';
import { useRouter } from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';
import { Container, Grid, Card, CardActionArea, CardContent, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, AppBar, Toolbar } from '@mui/material';

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcardCollections, setFlashcardCollections] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [collectionToDelete, setCollectionToDelete] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchFlashcardCollections = async () => {
      if (!user) return;

      try {
        const userDocRef = doc(db, 'users', user.id);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const collections = docSnap.data().flashcards || [];
          setFlashcardCollections(collections);
        } else {
          console.log("No flashcard collections found.");
        }
      } catch (error) {
        console.error("Error fetching flashcard collections:", error);
      }
    };

    fetchFlashcardCollections();
  }, [user]);

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`);
  };

  const handleDelete = async () => {
    if (!user || !collectionToDelete) return;

    try {
      const userDocRef = doc(db, 'users', user.id);
      const colRef = collection(userDocRef, collectionToDelete);
      const docs = await getDocs(colRef);

      for (const docSnap of docs.docs) {
        await deleteDoc(docSnap.ref);
      }

      const flashcardsRef = collection(userDocRef, 'flashcards');
      const collectionDocRef = doc(flashcardsRef, collectionToDelete);
      await deleteDoc(collectionDocRef);

      setFlashcardCollections((prevCollections) =>
        prevCollections.filter((collection) => collection.name !== collectionToDelete)
      );

      setOpenDialog(false);
      setCollectionToDelete(null);
    } catch (error) {
      console.error("Error deleting collection:", error);
    }
  };

  const handleOpenDialog = (collectionName) => {
    setCollectionToDelete(collectionName);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCollectionToDelete(null);
  };

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <AppBar sx={{ bgcolor: "#e0e0e0", boxShadow: 'none', width: "100vw", left: 0, marginLeft: 'calc(-50vw + 50%)' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ color: "black", fontWeight: 'bold'  }}>
          FlashBook
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ color: "black", fontWeight: 'bold'  }}>
            MY COLLECTION
          </Typography>
        </Box>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Toolbar>
    </AppBar>
    <Box 
        position="fixed" 
        bottom={20} 
        right={80} 
        display="flex" 
        justifyContent="center" 
        alignItems="center"
      >
        <Button
          variant="contained"
          sx={{ 
            backgroundColor: '#0A4D68', 
            color: '#FFF4DD', 
            borderRadius: '50%', 
            width: 60, 
            height: 60, 
            minWidth: 0, 
            padding: 0,
            boxShadow: 3,
            position: 'relative',
            '&:hover': {
              backgroundColor: '#084C61',
              boxShadow: 6,
              transform: 'scale(1.1)',
              '&::after': {
                content: '"GENERATE NEW FLASHCARD"',
                position: 'absolute',
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#0A4D68',
                color: '#FFF4DD',
                padding: '4px 8px',
                borderRadius: '4px',
                whiteSpace: 'nowrap',
                fontSize: '0.75rem',
                boxShadow: 3,
                opacity: 1,
                visibility: 'visible',
              },
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#0A4D68',
              color: '#FFF4DD',
              padding: '4px 8px',
              borderRadius: '4px',
              whiteSpace: 'nowrap',
              fontSize: '0.75rem',
              boxShadow: 3,
              opacity: 0,
              visibility: 'hidden',
              transition: 'opacity 0.3s, visibility 0.3s',
            },
          }}
          onClick={() => {
            router.push('/generate')
          }}
        >
          <AddIcon />
        </Button>
      </Box>
    <Grid sx={{ mt: 8 }} container spacing={3} justifyContent="center">
      {flashcardCollections.length > 0 ? (
        flashcardCollections.map((collection, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardActionArea onClick={() => handleCardClick(collection.name)}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                    <Typography variant="h5">{collection.name}</Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography sx={{ mt: 2 }} variant="body1">No flashcard collections available.</Typography>
      )}
    </Grid>
  </Container>
  );
}
