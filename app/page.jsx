// import rooms from "@/data/rooms.json";
import RoomCard from "@/components/RoomCard";
import Heading from "@/components/Heading";
import getAllRooms from "./actions/getAllRooms";
export default async function Home() {
  const rooms = await getAllRooms();
  // console.log("ROOMS ::", rooms);
  return (
    <>
      <Heading title="Available Rooms" />
      {rooms.length > 0
        ? rooms.map((room) => <RoomCard room={room} key={room.$id} />)
        : "No Rooms Available"}
    </>
  );
}
