import React from "react";
import getMyBookings from "@/app/actions/getMyBookings";
import Heading from "@/components/Heading";
import BookedRoomCard from "@/components/BookedRoomCard";
const BookingsPage = async () => {
  const bookings = await getMyBookings();

  return (
    <>
      <Heading title="My Bookings" />
      {bookings.length === 0
        ? "No bookings"
        : bookings.map((booking) => {
            console.log(booking);
            return <BookedRoomCard booking={booking} />;
          })}
    </>
  );
};

export default BookingsPage;
