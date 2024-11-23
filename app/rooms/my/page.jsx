import React from "react";
import Heading from "@/components/Heading";
import getMyRooms from "@/app/actions/getMyRooms";
import MyRoomCard from "@/components/MyRoomCard";

const MyRoomsPage = async () => {
  const rooms = await getMyRooms();
  return (
    <>
      <Heading title="My Rooms" />
      {console.log({ rooms })}
      {rooms.length > 0
        ? rooms.map((room) => {
            return <MyRoomCard key={room.$Id} room={room} />;
          })
        : console.log("Hello")}
    </>
  );
};

export default MyRoomsPage;
