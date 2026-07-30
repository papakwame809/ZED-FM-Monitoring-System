const assets = [
  {
    id: "ZED-FM-001",
    name: "FM Transmitter",
    type: "Transmission Equipment",
    location: "Transmission Room",
    status: "Operational",
    purchaseDate: "15 Jan 2024",
    warranty: "15 Jan 2027",

    maintenance: [
      {
        date: "10 Jul 2026",
        task: "Routine Inspection",
        technician: "Ama",
        status: "Completed"
      },
      {
        date: "15 Jul 2026",
        task: "Calibration",
        technician: "Kwame",
        status: "Completed"
      }
    ],

    incidents: [
      {
        id: "INC-021",
        title: "Power Fluctuation",
        severity: "Medium",
        status: "Resolved"
      },
      {
        id: "INC-022",
        title: "Network Latency",
        severity: "High",
        status: "In Progress"
      }
    ]
  }
];

export default assets;