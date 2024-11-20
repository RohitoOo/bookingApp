"use server";

import { createAdminClient } from "@/config/appwrite";

async function createSession(previousState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  console.log(email, password);

  if (!email || !password) {
    return {
      error: "Please fill out all fields",
    };
  }

  // GET ACCOUNT INSTANCE

  return {
    success: true,
  };
}

export default createSession;
