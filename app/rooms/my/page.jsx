import React from "react";
import Heading from "@/components/Heading";
import getMyRooms from "@/app/actions/getMyRooms";
import MyRoomCard from "@/components/MyRoomCard";
import Link from "next/link";
const MyRoomsPage = async () => {
  const rooms = await getMyRooms();
  return (
    <>
      <Heading title="My Rooms" />
      {/* {console.log({ rooms })} */}
      {rooms.length > 0 ? (
        rooms.map((room) => {
          return <MyRoomCard key={room.$Id} room={room} />;
        })
      ) : (
        <>
          <h1>You have no rooms created</h1>
          <Link href="/rooms/add" className="text-blue-500 pl-2">
            Add Room
          </Link>
        </>
      )}
    </>
  );
};

export default MyRoomsPage;
