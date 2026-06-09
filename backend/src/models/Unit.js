const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema(
  {
    unitName: {
      type: String,
      required: true,
      trim: true,
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
        "DISPATCHED",
        "EN_ROUTE",
        "BUSY",
      ],
      default: "IDLE",
    },

    currentMission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Incident",
      default: null,
    },

    assignedOperator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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