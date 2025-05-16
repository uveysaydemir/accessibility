const mockFlights = [
  {
    id: 1,
    fromLoc: "SAW",
    toLoc: "ADB",
    fromDate: new Date().toISOString().split("T")[0],
    fromTime: new Date(new Date().setHours(8, 10, 0, 0)),
    duration: {
      hours: 1,
      minutes: 10,
    },
    returnDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    returnTime: new Date(new Date().setHours(10, 30, 0, 0)),
    price: 1200,
  },
  {
    id: 2,
    fromLoc: "ADB",
    toLoc: "AYT",
    fromDate: new Date().toISOString().split("T")[0],
    fromTime: new Date(new Date().setHours(9, 30, 0, 0)),
    duration: {
      hours: 1,
      minutes: 20,
    },
    returnDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    returnTime: new Date(new Date().setHours(11, 0, 0, 0)),
    price: 1300,
  },
  {
    id: 3,
    fromLoc: "AYT",
    toLoc: "ERZ",
    fromDate: new Date().toISOString().split("T")[0],
    fromTime: new Date(new Date().setHours(7, 45, 0, 0)),
    duration: {
      hours: 1,
      minutes: 50,
    },
    returnDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    returnTime: new Date(new Date().setHours(9, 45, 0, 0)),
    price: 1400,
  },
  {
    id: 4,
    fromLoc: "ERZ",
    toLoc: "ESB",
    fromDate: new Date().toISOString().split("T")[0],
    fromTime: new Date(new Date().setHours(6, 30, 0, 0)),
    duration: {
      hours: 1,
      minutes: 30,
    },
    returnDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    returnTime: new Date(new Date().setHours(8, 0, 0, 0)),
    price: 1500,
  },
  {
    id: 5,
    fromLoc: "ESB",
    toLoc: "DLM",
    fromDate: new Date().toISOString().split("T")[0],
    fromTime: new Date(new Date().setHours(10, 15, 0, 0)),
    duration: {
      hours: 1,
      minutes: 45,
    },
    returnDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    returnTime: new Date(new Date().setHours(12, 15, 0, 0)),
    price: 1600,
  },
  {
    id: 6,
    fromLoc: "DLM",
    toLoc: "EZS",
    fromDate: new Date().toISOString().split("T")[0],
    fromTime: new Date(new Date().setHours(11, 0, 0, 0)),
    duration: {
      hours: 1,
      minutes: 55,
    },
    returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    returnTime: new Date(new Date().setHours(13, 0, 0, 0)),
    price: 1700,
  },
  {
    id: 7,
    fromLoc: "EZS",
    toLoc: "KYA",
    fromDate: new Date().toISOString().split("T")[0],
    fromTime: new Date(new Date().setHours(12, 30, 0, 0)),
    duration: {
      hours: 1,
      minutes: 25,
    },
    returnDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    returnTime: new Date(new Date().setHours(14, 0, 0, 0)),
    price: 1800,
  },
  {
    id: 8,
    fromLoc: "KYA",
    toLoc: "COV",
    fromDate: new Date().toISOString().split("T")[0],
    fromTime: new Date(new Date().setHours(13, 15, 0, 0)),
    duration: {
      hours: 1,
      minutes: 40,
    },
    returnDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    returnTime: new Date(new Date().setHours(15, 0, 0, 0)),
    price: 1900,
  },
  {
    id: 9,
    fromLoc: "COV",
    toLoc: "ERZ",
    fromDate: new Date().toISOString().split("T")[0],
    fromTime: new Date(new Date().setHours(14, 0, 0, 0)),
    duration: {
      hours: 2,
      minutes: 0,
    },
    returnDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    returnTime: new Date(new Date().setHours(16, 0, 0, 0)),
    price: 2000,
  },
  {
    id: 10,
    fromLoc: "ADB",
    toLoc: "DLM",
    fromDate: new Date().toISOString().split("T")[0],
    fromTime: new Date(new Date().setHours(15, 30, 0, 0)),
    duration: {
      hours: 1,
      minutes: 15,
    },
    returnDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    returnTime: new Date(new Date().setHours(17, 0, 0, 0)),
    price: 2100,
  },
];

export default mockFlights;
