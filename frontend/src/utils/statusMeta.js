import {
  FaExclamationTriangle,
  FaUserCheck,
  FaRoute,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaCircle,
} from "react-icons/fa";

// Centralised presentation metadata for incident/unit statuses.
// This only controls how a given status STRING is displayed (label, color,
// icon) — it never changes the underlying status values sent to or
// received from the API.

export const incidentStatusMeta = {
  REPORTED: {
    label: "Reported",
    tone: "red",
    icon: FaExclamationTriangle,
  },
  ASSIGNED: {
    label: "Assigned",
    tone: "amber",
    icon: FaUserCheck,
  },
  ON_THE_WAY: {
    label: "On The Way",
    tone: "blue",
    icon: FaRoute,
  },
  ARRIVED: {
    label: "Arrived",
    tone: "purple",
    icon: FaMapMarkerAlt,
  },
  RESOLVED: {
    label: "Resolved",
    tone: "green",
    icon: FaCheckCircle,
  },
};

export const unitStatusMeta = {
  IDLE: {
    label: "Idle",
    tone: "green",
    icon: FaCircle,
  },
  ASSIGNED: {
    label: "Assigned",
    tone: "amber",
    icon: FaUserCheck,
  },
  ON_THE_WAY: {
    label: "On The Way",
    tone: "blue",
    icon: FaRoute,
  },
  RESCUING: {
    label: "Rescuing",
    tone: "red",
    icon: FaExclamationTriangle,
  },
};

export const getIncidentStatus = (status) =>
  incidentStatusMeta[status] || {
    label: status,
    tone: "slate",
    icon: FaCircle,
  };

export const getUnitStatus = (status) =>
  unitStatusMeta[status] || {
    label: status,
    tone: "slate",
    icon: FaCircle,
  };

export const severityTone = (severity) => {
  if (severity >= 8) return "red";
  if (severity >= 6) return "orange";
  return "green";
};

export const INCIDENT_PROGRESS_STEPS = [
  "REPORTED",
  "ASSIGNED",
  "ON_THE_WAY",
  "ARRIVED",
  "RESOLVED",
];
