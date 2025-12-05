
# BookMyMic - Backend

API backend pour la gestion des créneaux et réservations de karaoke.

## Technologies

* Node.js
* Express
* Sequelize (SQLite)

## Installation

1. Cloner le repo :

```bash
git clone https://github.com/LudivineLeLan/BookMyMic-back.git
cd BookMyMic-back
```

2. Installer les dépendances :

```bash
npm install
```

3. Initialiser la base de données :

```bash
node migrations/create-tables.js
```

## Démarrage en local

```bash
npm start
```

Le serveur tourne par défaut sur [http://localhost:3000](http://localhost:3000).

## API

### Slots

* `GET /slots` : récupérer tous les créneaux disponibles

### Bookings

* `GET /bookings` : récupérer toutes les réservations
* `POST /bookings` : créer une réservation

Exemple de body JSON :

```json
{
  "userName": "Nom",
  "email": "mail@example.com",
  "slotId": 1
}
```

## Liens

* [Repo front](https://github.com/LudivineLeLan/BookMyMic-front.git)
* [API déployée sur Render](https://bookmymic.onrender.com/)
