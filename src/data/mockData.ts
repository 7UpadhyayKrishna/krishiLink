// Mock data for Mandi prices
export const mockMandiPrices = [
  {
    state: "Maharashtra",
    district: "Pune",
    market: "Pune",
    commodity: "Rice",
    variety: "Basmati",
    arrival_date: "2025-03-15",
    min_price: "3200",
    max_price: "3800",
    modal_price: "3500"
  },
  {
    state: "Punjab",
    district: "Amritsar",
    market: "Amritsar",
    commodity: "Wheat",
    variety: "Common",
    arrival_date: "2025-03-15",
    min_price: "2100",
    max_price: "2400",
    modal_price: "2250"
  },
  {
    state: "Uttar Pradesh",
    district: "Lucknow",
    market: "Lucknow",
    commodity: "Potato",
    variety: "Regular",
    arrival_date: "2025-03-15",
    min_price: "1200",
    max_price: "1500",
    modal_price: "1350"
  },
  {
    state: "Karnataka",
    district: "Bangalore",
    market: "Bangalore",
    commodity: "Tomato",
    variety: "Local",
    arrival_date: "2025-03-15",
    min_price: "1800",
    max_price: "2200",
    modal_price: "2000"
  },
  {
    state: "Gujarat",
    district: "Ahmedabad",
    market: "Ahmedabad",
    commodity: "Groundnut",
    variety: "Bold",
    arrival_date: "2025-03-15",
    min_price: "4500",
    max_price: "5000",
    modal_price: "4750"
  }
];

// Mock data for locations
export const mockLocations = [
  "Mumbai, Maharashtra",
  "Delhi, NCR",
  "Bangalore, Karnataka",
  "Chennai, Tamil Nadu",
  "Kolkata, West Bengal",
  "Hyderabad, Telangana",
  "Pune, Maharashtra",
  "Ahmedabad, Gujarat",
  "Jaipur, Rajasthan",
  "Lucknow, Uttar Pradesh"
];

// Mock data for weather
export const mockWeatherData = {
  current: {
    temperature: 28,
    feelsLike: 30,
    condition: "Partly Cloudy",
    humidity: 65,
    wind: 12,
    uvIndex: "Moderate",
    high: 32,
    low: 24
  },
  forecast: [
    {
      day: "Today",
      date: "Mar 15",
      temperature: { high: 32, low: 24 },
      condition: "Partly Cloudy",
      precipChance: 20
    },
    {
      day: "Tomorrow",
      date: "Mar 16",
      temperature: { high: 31, low: 23 },
      condition: "Sunny",
      precipChance: 10
    },
    {
      day: "Sunday",
      date: "Mar 17",
      temperature: { high: 30, low: 23 },
      condition: "Cloudy",
      precipChance: 40
    },
    {
      day: "Monday",
      date: "Mar 18",
      temperature: { high: 29, low: 22 },
      condition: "Rainy",
      precipChance: 80
    },
    {
      day: "Tuesday",
      date: "Mar 19",
      temperature: { high: 28, low: 22 },
      condition: "Partly Cloudy",
      precipChance: 30
    }
  ]
};

// Mock data for crop diseases
export const mockDiseases = [
  {
    id: "1",
    name: "Bacterial Leaf Blight",
    crops: ["Rice", "Wheat"],
    image: "https://images.pexels.com/photos/7728087/pexels-photo-7728087.jpeg",
    description: "A serious bacterial disease affecting rice and wheat crops",
    symptoms: [
      "Yellow to white lesions along leaf veins",
      "Lesions turn gray to white when severe",
      "Leaves become dry and roll up",
      "Wilting of seedlings"
    ],
    treatment: [
      "Use disease-resistant varieties",
      "Apply copper-based bactericides",
      "Maintain proper field drainage",
      "Remove infected plants"
    ],
    prevention: [
      "Use certified disease-free seeds",
      "Maintain proper spacing between plants",
      "Avoid excessive nitrogen fertilization",
      "Practice crop rotation"
    ]
  },
  {
    id: "2",
    name: "Early Blight",
    crops: ["Tomato", "Potato"],
    image: "https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg",
    description: "A fungal disease that affects tomatoes and potatoes",
    symptoms: [
      "Dark brown spots with concentric rings",
      "Yellowing of leaves around spots",
      "Lower leaves affected first",
      "Premature leaf drop"
    ],
    treatment: [
      "Remove infected leaves",
      "Apply fungicides",
      "Improve air circulation",
      "Maintain proper watering schedule"
    ],
    prevention: [
      "Use resistant varieties",
      "Practice crop rotation",
      "Mulch around plants",
      "Avoid overhead watering"
    ]
  }
];

// Mock data for plants
export const mockPlants = [
  "Rice",
  "Wheat",
  "Maize",
  "Potato",
  "Tomato",
  "Cotton",
  "Sugarcane",
  "Soybean",
  "Groundnut",
  "Mustard"
];

// Mock data for farmer listings
export const mockFarmerListings = [
  {
    id: "1",
    name: "Basmati Rice",
    variety: "PUSA-1121",
    image: "https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg",
    pricePerKg: 85,
    apmcMin: 80,
    apmcMax: 90,
    quantity: 2000,
    harvestDate: "2025-03-10",
    status: "active",
    offerCount: 5,
    viewCount: 120
  },
  {
    id: "2",
    name: "Wheat",
    variety: "HD-2967",
    image: "https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg",
    pricePerKg: 28,
    apmcMin: 25,
    apmcMax: 30,
    quantity: 5000,
    harvestDate: "2025-03-12",
    status: "active",
    offerCount: 3,
    viewCount: 85
  }
];

// Mock data for crop listings
export const mockCropListings = [
  {
    id: "1",
    name: "Basmati Rice",
    variety: "PUSA-1121",
    image: "https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg",
    pricePerKg: 85,
    apmcMin: 80,
    apmcMax: 90,
    quantity: 2000,
    location: "Karnal, Haryana",
    harvestDate: "2025-03-10",
    farmerName: "Rajesh Kumar",
    farmerRating: 4.8,
    organic: true
  },
  {
    id: "2",
    name: "Wheat",
    variety: "HD-2967",
    image: "https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg",
    pricePerKg: 28,
    apmcMin: 25,
    apmcMax: 30,
    quantity: 5000,
    location: "Ludhiana, Punjab",
    harvestDate: "2025-03-12",
    farmerName: "Gurpreet Singh",
    farmerRating: 4.6,
    organic: false
  },
  {
    id: "3",
    name: "Potato",
    variety: "Kufri Jyoti",
    image: "https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg",
    pricePerKg: 15,
    apmcMin: 12,
    apmcMax: 18,
    quantity: 3000,
    location: "Agra, Uttar Pradesh",
    harvestDate: "2025-03-08",
    farmerName: "Amit Sharma",
    farmerRating: 4.5,
    organic: true
  }
];

// Mock data for buyer offers
export const mockBuyerOffers = [
  {
    id: "1",
    cropName: "Basmati Rice",
    cropVariety: "PUSA-1121",
    cropImage: "https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg",
    buyerName: "Rahul Traders",
    sellerName: "Rajesh Kumar",
    location: "Karnal, Haryana",
    quantity: 500,
    pricePerKg: 82,
    originalPrice: 85,
    apmcMin: 80,
    apmcMax: 90,
    status: "pending"
  },
  {
    id: "2",
    cropName: "Wheat",
    cropVariety: "HD-2967",
    cropImage: "https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg",
    buyerName: "Singh Exports",
    sellerName: "Gurpreet Singh",
    location: "Ludhiana, Punjab",
    quantity: 1000,
    pricePerKg: 28,
    originalPrice: 28,
    apmcMin: 25,
    apmcMax: 30,
    status: "accepted"
  }
];

// Mock data for transactions
export const mockTransactions = [
  {
    id: "1",
    date: "2025-03-14",
    cropName: "Basmati Rice",
    cropVariety: "PUSA-1121",
    cropImage: "https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg",
    buyerName: "Rahul Traders",
    sellerName: "Rajesh Kumar",
    location: "Karnal, Haryana",
    quantity: 500,
    pricePerKg: 82,
    totalValue: "41,000",
    status: "completed"
  },
  {
    id: "2",
    date: "2025-03-13",
    cropName: "Wheat",
    cropVariety: "HD-2967",
    cropImage: "https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg",
    buyerName: "Singh Exports",
    sellerName: "Gurpreet Singh",
    location: "Ludhiana, Punjab",
    quantity: 1000,
    pricePerKg: 28,
    totalValue: "28,000",
    status: "in_transit"
  }
];