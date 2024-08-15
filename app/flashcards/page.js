"use client";

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { collection, doc, getDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Container, Grid, Card, CardActionArea, CardContent, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

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
    <Typography variant="h4" gutterBottom>My Flashcard Collections</Typography>
    <Grid container spacing={3} justifyContent="center">
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
              <Button
                variant="contained"
                color="error"
                sx={{ mt: 2, mx: 1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDialog(collection.name);
                }}
              >
                Delete
              </Button>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography sx={{ mt: 2 }} variant="body1">No flashcard collections available.</Typography>
      )}
    </Grid>

    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete the collection "{collectionToDelete}"?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  </Container>
  );
}
