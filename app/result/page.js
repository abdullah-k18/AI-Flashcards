"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CircularProgress, Typography, Container, Box } from "@mui/material";

const ResultContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

<<<<<<< HEAD
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);
=======
const ResultPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session_id')
>>>>>>> 11b670738275b2e5b89a61961415baea1bb62817

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!session_id) {
        setError("Session ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/checkout_session?session_id=${session_id}`);
        const sessionData = await res.json();
        if (res.ok) {
          setSession(sessionData);
        } else {
          setError(sessionData.error || "Failed to retrieve session.");
        }
      } catch (err) {
        setError("An error occurred.");
      } finally {
        setLoading(false);
      }
    };

<<<<<<< HEAD
    fetchCheckoutSession();
  }, [session_id]);

  if (loading) {
    return (
      <Container maxWidth="100vw" sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="100vw" sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="100vw" sx={{ textAlign: "center", mt: 4 }}>
      {session.payment_status === "paid" ? (
        <>
          <Typography variant="h4">Thank you for your purchase!</Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              We have received your payment. You will receive an email with the order details shortly.
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h4">Payment Failed</Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              Your payment was not successful. Please try again.
            </Typography>
          </Box>
        </>
      )}
    </Container>
  );
};

export default ResultContent;
=======
export default ResultPage
>>>>>>> 11b670738275b2e5b89a61961415baea1bb62817
