import { Slot } from "../models/index.js";

export const slotController = {
  async getAllSlots(req, res) {
    try {
      const slots = await Slot.findAll({
        order: [["date", "ASC"]],
      });

      res.json(slots);
    } catch (error) {
      console.error("Error downloading slots:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async generateSlots(startDate, endDate) {
    const slots = [];
    let current = new Date(startDate);

    while (current <= endDate) {
      for (let hour = 10; hour <= 22; hour++) {
        const date = new Date(
          current.getFullYear(),
          current.getMonth(),
          current.getDate(),
          hour,
          0,
          0
        );

        slots.push({
          date
        });
      }

      current.setDate(current.getDate() + 1);
    }
    return slots;
  },

  async seedSlotsIfEmpty() {
    const count = await Slot.count();
    if (count > 0) return;

    const today = new Date();
    const threeMonthsLater = new Date();
    threeMonthsLater.setMonth(today.getMonth() + 3);

    const slotsToCreate = await this.generateSlots(today, threeMonthsLater);

    await Slot.bulkCreate(slotsToCreate);
  }
}
