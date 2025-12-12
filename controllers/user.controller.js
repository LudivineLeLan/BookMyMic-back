import { User, Booking, Slot } from '../models/index.js';
import Joi from "joi";
import jwt from "jsonwebtoken";
import { UserSchema } from '../schemas/user.schema.js';
import argon2 from "argon2";
import { Op } from 'sequelize';

export const userController = {

  async createUser(req, res) {
    try {
      const data = Joi.attempt(req.body, UserSchema);
      const hashedPassword = await argon2.hash(data.password);
      const user = await User.create({
        name: data.name,
        email: data.email,
        password: hashedPassword
      });

      await Booking.update(
        { user_id: user.id },
        {
          where: {
            user_id: null,
            user_email: user.email
          }
        }
      );

      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la création de l'utilisateur" });
    }
  },

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Email ou mot de passe invalide' });
      }
      const isValid = await argon2.verify(user.password, password);
      if (!isValid) {
        return res.status(401).json({ error: 'Email ou mot de passe invalide' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.json({ message: "Connexion réussie", token, id: user.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la connexion" });
    }
  },

  async getUserBookings(req, res) {
    try {
      const userId = req.user.id;

      const bookings = await Booking.findAll({
        where: {
          [Op.or]: [
            { user_id: userId },
            { user_email: req.user.email }
          ]
        },
        include: [{ model: Slot }],
        order: [[Slot, "date", "ASC"]]
      });

      res.json(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Impossible de récupérer les réservations" });
    }
  },

  async cancelBooking(req, res) {
    try {
      const bookingId = req.params.id;
      const userId = req.user.id;

      const booking = await Booking.findOne({
        // where: { id: bookingId, user_id: userId }
        where: { id: bookingId, [Op.or]: [{ user_id: req.user.id }, { user_email: req.user.email }] }
      });

      if (!booking) {
        return res
          .status(404)
          .json({ message: "Réservation introuvable." });
      }

      await booking.destroy();

      res.json({ message: "Réservation annulée." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de l'annulation." });
    }
  }
};
