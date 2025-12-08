import { User } from '../models/index.js';
import Joi from "joi";
import jwt from "jsonwebtoken";
import { UserSchema } from '../schemas/user.schema.js';
import argon2 from "argon2";

export const userController = {

  async createUser(req, res) {
    try {
      const data = Joi.attempt(req.body, UserSchema);
      const hashedPassword = await argon2.hash(data.password);
      const user = await User.create({
        email: data.email,
        password: hashedPassword
      });
      res.status(201).json({ message: "Utilisateur créé", userId: user.id });
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

      res.json({ message: "Connexion réussie", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la connexion" });
    }
  },
};
