const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
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
        "EN_ROUTE",
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
            "EN_ROUTE",
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Incident",
  incidentSchema
);