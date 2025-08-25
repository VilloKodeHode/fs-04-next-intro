// app/components/atom/Onboarding.jsx

// This file is a React client component for user onboarding logic.
// It uses Clerk's useUser hook to check if a user is signed in.
// When a user signs in, it triggers a POST request to create the user in the database.
"use client";

// Import hooks from Clerk and React
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

// This component runs a side effect when the user is signed in
export default function UserOnboarding() {
  const { isSignedIn } = useUser(); // Get sign-in status

  useEffect(() => {
    // If the user is signed in, make a POST request to create the user
    if (isSignedIn) {
      fetch("/api/user/create", { method: "POST" });
    }
  }, [isSignedIn]);

  // This component does not render anything
  return null;
}
