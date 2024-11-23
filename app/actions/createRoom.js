"use server";

import { createAdminClient } from "@/config/appwrite";
import checkAuth from "./checkAuth";
import { ID } from "node-appwrite";
import { revalidatePath } from "next/cache";

async function createRoom(previousState, formData) {
  console.log("CREATE ROOM FUNCTION", formData);
  // GET DATABASES INSTANCE

  const { databases, storage } = await createAdminClient();
  const { user } = await checkAuth();
  console.log({ user });
  try {
    if (!user) {
      return {
        error: "You need to be logged in",
      };
    }
    // UPLOADING IMAGE

    let imageID;

    const image = formData.get("image");
    console.log({ image });

    if (image && image.size > 0 && image.name !== undefined) {
      try {
        // UPLOAD

        const response = await storage.createFile("rooms", ID.unique(), image);
        imageID = response.$id;
      } catch (error) {
        console.log("Error uploading Image", error);
        return {
          error: "Image Upload Error",
        };
      }
    } else {
      console.log(" No image, Invalid file or no file provided");
    }

    const newRoom = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      ID.unique(),
      {
        user_id: user.id,
        name: formData.get("name"),
        description: formData.get("description"),
        sqft: formData.get("sqft"),
        capacity: formData.get("capacity"),
        location: formData.get("location"),
        address: formData.get("address"),
        availability: formData.get("availability"),
        price_per_hour: formData.get("price_per_hour"),
        amenities: formData.get("amenities"),
        image: imageID,
      }
    );

    // revalidatePath("/", layout);

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    const errorMessage = error || "Room creation error";
    return {
      error: errorMessage,
    };
  }
}

export default createRoom;
