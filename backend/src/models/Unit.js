const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema(
  {
    unitName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    unitType: {
      type: String,
      enum: [
        "AMBULANCE",
        "POLICE",
        "FIRE_BRIGADE",
      ],
      required: true,
    },

    availability: {
      type: Boolean,
      default: true,
    },

    currentLocation: {
        nodeId: {
            type: String,
            required: true,
        },

        areaName: {
            type: String,
            required: true,
        },

        coordinates: {
            lat: {
            type: Number,
            required: true,
            },

            lng: {
            type: Number,
            required: true,
            },
        },
    },
    
    status: {
      type: String,
      enum: [
      "IDLE",
      "ASSIGNED",
      "EN_ROUTE",
      "BUSY",
      "OFFLINE",
    ],
      default: "IDLE",
    },

    currentMission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Incident",
      default: null,
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Unit",
  unitSchema
);