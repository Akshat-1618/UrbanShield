const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    type: {
      type: String,
      enum: [
        "ACCIDENT",
        "FIRE",
        "MEDICAL",
        "CRIME",
        "INFRASTRUCTURE",
      ],
      required: true,
    },

    severity: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },

    location: {
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
        "REPORTED",
        "ASSIGNED",
        "ON_THE_WAY",
        "ARRIVED",
        "RESOLVED",
      ],
      default: "REPORTED",
    },

    statusHistory: [
      {
        status: {
          type: String,
          enum: [
            "REPORTED",
            "ASSIGNED",
            "ON_THE_WAY",
            "ARRIVED",
            "RESOLVED",
          ],
        },

        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedUnit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
      default: null,
    },

    route: {
      type: [String],
      default: [],
    },

    routeDistance: {
      type: Number,
      default: 0,
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Incident",
  incidentSchema
);