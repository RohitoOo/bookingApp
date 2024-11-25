"use client";
import { toast } from "react-toastify";
import { FaTrash, FaEye } from "react-icons/fa";
import cancelBooking from "@/app/actions/cancelBooking";
const DeleteBookingButton = ({ bookingId }) => {
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (confirmed) {
      try {
        console.log({ bookingId });

        const response = await cancelBooking(bookingId);
        toast.success("Booking deleted successfully");
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete booking");
      }
    }
  };
  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-red-700"
    >
      {/* <FaTrash className="inline mr-1"></FaTrash>  */}
      Delete
    </button>
  );
};

export default DeleteBookingButton;
