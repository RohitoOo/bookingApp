import React from "react";
import Link from "next/link";
import DeleteBookingButton from "@/components/DeleteBookingButton";
const BookedRoomCard = ({ booking }) => {
  const { room_id: room } = booking;
  console.log({ room });
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // GET MONTH
    const options = { month: "short" };
    const month = date.toLocaleDateString("en-US", options, {
      timeZone: "UTC",
    });
    // GET DAY
    const day = date.getUTCDate();

    // Format time in UTC 12-hour
    const timeOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "UTC",
    };

    const time = date.toLocaleString("en-US", timeOptions);

    // Final Formatted

    return `${month} ${day} at ${time}`;
  };
  return (
    <>
      <div className="bg-white shadow rounded-lg p-4 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h4 className="text-lg font-semibold">{room.name}</h4>
          <p className="text-sm text-gray-600">
            <strong>Check In:</strong> {formatDate(booking.check_in)}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Check Out:</strong> {formatDate(booking.check_out)}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0">
          <Link
            href={`rooms/${room.$id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-blue-700"
          >
            View Room
          </Link>
          <DeleteBookingButton
            bookingId={booking.$id}
            title="Cancel Booking"
            className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto text-center hover:bg-red-700"
          />

          {/* <button href="#"></button> */}
        </div>
      </div>
    </>
  );
};

export default BookedRoomCard;
