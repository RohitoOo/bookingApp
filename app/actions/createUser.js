"use server";

import { createAdminClient } from "@/config/appwrite";
import { ID } from "node-appwrite";

async function createUser(previousState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");

  if (!email || !name || !password) {
    return {
      error: "Please fill in all fields",
    };
  }

  if (password.length < 8) {
    return {
      error: "Passwords must be atleast 8 characters long",
    };
  }
  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match",
    };
  }

  const { account } = await createAdminClient();

  try {
    // Create User
    console.log("Creating USer");
    await account.create(ID.unique(), email, password, name);

    return {
      success: true,
    };
  } catch (error) {
    console.log("User not created - Registration Error");
    return {
      error: "User not created",
    };
  }
}

export default createUser;
