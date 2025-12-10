import { Booking, Slot } from "../models/index.js";


export const bookingController = {
  async getAllBookings(req, res) {
    try {
      const bookings = await Booking.findAll({
        include: [{ model: Slot }],
        order: [["slot_id", "ASC"]],
      });

      res.json(bookings);
    } catch (error) {
      console.error("Error retrieving bookings:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async createBooking(req, res) {
    try {
      const { userName, userEmail, slotId } = req.body;

      const slot = await Slot.findByPk(slotId);
      if (!slot) {
        return res.status(404).json({ message: "Slot not found" });
      }

      if (!slot.available) {
        return res.status(400).json({ message: "Slot is already booked" });
      }

      const booking = await Booking.create({
        user_name: userName,
        user_email: userEmail,
        slot_id: slotId,
        user_id: null
      });
      await slot.update({ available: false });

      res.status(201).json({
        message: "Booking successful",
        booking,
      });
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}