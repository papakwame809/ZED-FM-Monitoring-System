const incidents = [
  {
    id: "INC-001",
    title: "Generator Failure",
    asset: "Backup Generator",
    severity: "Critical",
    technician: "Ama",
    status: "Open",
    description: "Generator stopped working.",
    date: "2026-08-03",
  },

  {
    id: "INC-002",
    title: "UPS Fault",
    asset: "UPS System",
    severity: "Medium",
    technician: "Kwame",
    status: "Resolved",
    description: "UPS battery issue.",
    date: "2026-07-27",
  },

  {
    id: "INC-003",
    title: "Studio Console Issue",
    asset: "Studio Console",
    severity: "Low",
    technician: "Sara",
    status: "Pending",
    description: "Audio channel problem.",
    date: "2026-07-26",
  },
];

export default incidents;