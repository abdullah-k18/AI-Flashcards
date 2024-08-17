"use client";

import { Suspense } from "react";
import { CircularProgress, Typography, Container, Box } from "@mui/material";
import ResultContent from "./ResultContent"; // Separate the logic into another component

const ResultPage = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResultContent />
    </Suspense>
  );
};

const LoadingFallback = () => (
  <Container maxWidth="100vw" sx={{ textAlign: "center", mt: 4 }}>
    <CircularProgress />
    <Typography variant="h6">Loading...</Typography>
  </Container>
);

export default ResultPage;
