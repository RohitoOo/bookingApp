"use server";

import { createSessionClient } from "@/config/appwrite";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";

async function deleteRoom(roomId) {
  const sessionCookie = cookies().get("appwrite-session");
  if (!sessionCookie) {
    redirect("/login");
  }
  try {
    const { databases, account } = await createSessionClient(
      sessionCookie.value
    );

    // GET User's Id

    const user = await account.get();
    const userId = user.$id;

    // Fetch rooms
    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      [Query.equal("user_id", userId)]
    );

    // FIND Room to delete

    const roomToDelete = rooms.find((room) => room.$id === roomId);

    // Delete the room

    if (roomToDelete) {
      console.log({ roomToDelete });
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
        roomToDelete.$id
      );

      // Revalidate my rooms and all rooms
      revalidatePath("/rooms/my", "layout");
      revalidatePath("/", "layout");

      return {
        success: true,
      };
    } else {
      return {
        error: "Room Not Found :(",
      };
    }
  } catch (error) {
    console.log("Failed to delete room", error);
    return {
      error: "Failed to delete room",
    };
  }
}

export default deleteRoom;
