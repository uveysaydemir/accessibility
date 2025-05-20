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
    returnTime: "10:30",
    price: 1200,
    flexPrice: 1200 * 1.2,
    premiumPrice: 1200 * 1.5,
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
    returnTime: "11:00",
    price: 1300,
    flexPrice: 1300 * 1.2,
    premiumPrice: 1300 * 1.5,
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
    returnTime: "09:45",
    price: 1400,
    flexPrice: 1400 * 1.2,
    premiumPrice: 1400 * 1.5,
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
    returnTime: "08:00",
    price: 1500,
    flexPrice: 1500 * 1.2,
    premiumPrice: 1500 * 1.5,
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
    returnTime: "12:15",
    price: 1600,
    flexPrice: 1600 * 1.2,
    premiumPrice: 1600 * 1.5,
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
    returnTime: "13:00",
    price: 1700,
    flexPrice: 1700 * 1.2,
    premiumPrice: 1700 * 1.5,
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
    returnTime: "14:00",
    price: 1800,
    flexPrice: 1800 * 1.2,
    premiumPrice: 1800 * 1.5,
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
    returnTime: "15:00",
    price: 1900,
    flexPrice: 1900 * 1.2,
    premiumPrice: 1900 * 1.5,
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
    returnTime: "16:00",
    price: 2000,
    flexPrice: 2000 * 1.2,
    premiumPrice: 2000 * 1.5,
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
    returnTime: "17:00",
    price: 2100,
    flexPrice: 2100 * 1.2,
    premiumPrice: 2100 * 1.5,
  },
  {
    id: 11,
    fromLoc: "ADB",
    toLoc: "AYT",
    fromDate: new Date().toISOString().split("T")[0],
    fromTime: new Date(new Date().setHours(12, 40, 0, 0)),
    duration: {
      hours: 1,
      minutes: 20,
    },
    returnDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    returnTime: "11:00",
    price: 1600,
    flexPrice: 1600 * 1.2,
    premiumPrice: 1600 * 1.5,
  },
  {
    id: 12,
    fromLoc: "SAW",
    toLoc: "ADB",
    fromDate: new Date().toISOString().split("T")[0],
    fromTime: new Date(new Date().setHours(9, 10, 0, 0)),
    duration: {
      hours: 1,
      minutes: 10,
    },
    returnDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    returnTime: "10:30",
    price: 1400,
    flexPrice: 1400 * 1.2,
    premiumPrice: 1400 * 1.5,
  },
];

export default mockFlights;
