"use server";

import { createAdminClient } from "@/config/appwrite";
import checkAuth from "./checkAuth";
import { ID } from "node-appwrite";
import { revalidatePath } from "next/cache";

async function createRoom(previousState, formData) {
  // GET DATABASES INSTANCE

  const { databases } = await createAdminClient();

  try {
    if (!user) {
      return {
        error: "You need to be logged in",
      };
    }

    const newRoom = await databases.creaateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      ID.unique(),
      {
        user_Id: user.id,
        name: formData.get("name"),
        description: formData.get("description"),
        sqft: formData.get("sqft"),
        location: formData.get("location"),
        address: formData.get("address"),
        availability: formData.get("availability"),
        amenities: formData.get("amenities"),
      }
    );

    revalidatePath("/", layout);

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    const errorMessage = error.response.message || "Room creation error";
    return {
      error: errorMessage,
    };
  }
}

export default createRoom;
