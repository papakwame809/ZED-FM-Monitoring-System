const assets = [
  {
    id: "AST-001",
    name: "FM Transmitter",
    type: "Transmission",
    location: "Tower Room",
    status: "Operational",
    lastService: "10 Jul 2026",
    warranty: "Dec 2028",

    serialNumber: "ZED-FM-001",
    purchaseDate: "15 Jan 2024",

    maintenance: [
      {
        date: "10 Jul 2026",
        task: "Routine Inspection",
        technician: "Ama",
        status: "Completed",
      },
      {
        date: "15 Jul 2026",
        task: "Calibration",
        technician: "Kwame",
        status: "Completed",
      },
    ],

    incidents: [
      {
        id: "INC-021",
        title: "Power Fluctuation",
        severity: "Medium",
        status: "Resolved",
      },
    ],
  },

  {
    id: "AST-002",
    name: "Studio Console",
    type: "Audio",
    location: "Studio A",
    status: "Maintenance Due",
    lastService: "10 Jul 2026",
    warranty: "Dec 2028",

    serialNumber: "ZED-AUD-013",
    purchaseDate: "2 Feb 2025",

    maintenance: [],
    incidents: [],
  },

  {
    id: "AST-003",
    name: "Generator",
    type: "Power",
    location: "Newsroom",
    status: "Faulty",
    lastService: "10 Jul 2026",
    warranty: "Dec 2028",

    serialNumber: "GEN-021",
    purchaseDate: "8 Mar 2022",

    maintenance: [],
    incidents: [],
  },
];

export default assets;