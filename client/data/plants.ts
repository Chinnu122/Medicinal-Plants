export interface MedicinalPlant {
  id: string;
  name: string;
  scientificName: string;
  image: string;
  description: string;
  benefits: string[];
  uses: string[];
  preparation: string[];
  precautions: string[];
  cost: {
    fresh: string;
    dried: string;
    supplement: string;
  };
  availability: "common" | "moderate" | "rare";
  difficulty: "easy" | "moderate" | "difficult";
  category: string[];
  season: string[];
  region: string[];
}

export const medicinalPlants: MedicinalPlant[] = [
  {
    id: "1",
    name: "Turmeric",
    scientificName: "Curcuma longa",
    image:
      "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&h=300&fit=crop",
    description:
      "A golden spice with powerful anti-inflammatory and antioxidant properties.",
    benefits: [
      "Anti-inflammatory",
      "Antioxidant",
      "Pain relief",
      "Digestive health",
      "Immune support",
    ],
    uses: [
      "Joint pain",
      "Arthritis",
      "Digestive issues",
      "Wound healing",
      "Skin conditions",
    ],
    preparation: [
      "Fresh root tea",
      "Powder in milk",
      "Turmeric paste",
      "Capsules",
    ],
    precautions: [
      "May increase bleeding risk",
      "Avoid before surgery",
      "May worsen acid reflux",
    ],
    cost: {
      fresh: "₹50-80/kg",
      dried: "₹150-250/kg",
      supplement: "₹300-500/bottle",
    },
    availability: "common",
    difficulty: "easy",
    category: ["Anti-inflammatory", "Digestive", "Skin"],
    season: ["Year-round"],
    region: ["Tropical", "Subtropical"],
  },
  {
    id: "2",
    name: "Ginger",
    scientificName: "Zingiber officinale",
    image:
      "https://images.unsplash.com/photo-1565876465021-3c4463eede12?w=400&h=300&fit=crop",
    description:
      "A warming root excellent for digestive health and nausea relief.",
    benefits: [
      "Digestive aid",
      "Anti-nausea",
      "Anti-inflammatory",
      "Circulation",
      "Immune support",
    ],
    uses: [
      "Motion sickness",
      "Morning sickness",
      "Digestive upset",
      "Cold and flu",
      "Pain relief",
    ],
    preparation: [
      "Fresh ginger tea",
      "Ginger juice",
      "Candied ginger",
      "Powder in cooking",
    ],
    precautions: [
      "May interact with blood thinners",
      "Avoid large amounts during pregnancy",
    ],
    cost: {
      fresh: "₹60-120/kg",
      dried: "₹200-350/kg",
      supplement: "₹250-400/bottle",
    },
    availability: "common",
    difficulty: "easy",
    category: ["Digestive", "Anti-inflammatory", "Respiratory"],
    season: ["Year-round"],
    region: ["Tropical", "Subtropical"],
  },
  {
    id: "3",
    name: "Echinacea",
    scientificName: "Echinacea purpurea",
    image:
      "https://images.unsplash.com/photo-1564419320461-6870880221ad?w=400&h=300&fit=crop",
    description:
      "Purple coneflower known for immune system support and cold prevention.",
    benefits: [
      "Immune support",
      "Antiviral",
      "Antibacterial",
      "Wound healing",
      "Anti-inflammatory",
    ],
    uses: [
      "Common cold",
      "Upper respiratory infections",
      "Flu prevention",
      "Wound care",
    ],
    preparation: [
      "Tea from dried leaves",
      "Tincture",
      "Capsules",
      "Fresh plant juice",
    ],
    precautions: [
      "May cause allergic reactions",
      "Avoid with autoimmune conditions",
    ],
    cost: {
      fresh: "₹300-400/kg",
      dried: "₹400-500/kg",
      supplement: "₹350-600/bottle",
    },
    availability: "moderate",
    difficulty: "moderate",
    category: ["Immune", "Respiratory", "Antiviral"],
    season: ["Summer", "Fall"],
    region: ["Temperate", "North America"],
  },
  {
    id: "4",
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis",
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=300&fit=crop",
    description:
      "Succulent plant with gel-filled leaves, perfect for skin healing and burns.",
    benefits: [
      "Skin healing",
      "Anti-inflammatory",
      "Moisturizing",
      "Antimicrobial",
      "Digestive",
    ],
    uses: [
      "Burns",
      "Cuts and wounds",
      "Skin irritation",
      "Sunburn",
      "Dry skin",
    ],
    preparation: [
      "Fresh gel application",
      "Aloe juice",
      "Gel extraction",
      "Topical creams",
    ],
    precautions: [
      "Internal use may cause digestive upset",
      "Test for skin sensitivity",
    ],
    cost: {
      fresh: "₹120-300/plant",
      dried: "₹500-800/kg",
      supplement: "₹250-500/bottle",
    },
    availability: "common",
    difficulty: "easy",
    category: ["Skin", "Healing", "Moisturizing"],
    season: ["Year-round"],
    region: ["Arid", "Mediterranean", "Indoor"],
  },
  {
    id: "5",
    name: "Chamomile",
    scientificName: "Matricaria chamomilla",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    description:
      "Gentle daisy-like flower known for its calming and sleep-promoting properties.",
    benefits: [
      "Calming",
      "Sleep aid",
      "Anti-inflammatory",
      "Digestive",
      "Skin soothing",
    ],
    uses: [
      "Insomnia",
      "Anxiety",
      "Digestive upset",
      "Skin irritation",
      "Menstrual cramps",
    ],
    preparation: [
      "Flower tea",
      "Essential oil",
      "Topical compress",
      "Bath soak",
    ],
    precautions: [
      "May cause allergic reactions in ragweed-sensitive people",
      "May interact with blood thinners",
    ],
    cost: {
      fresh: "₹400-600/kg",
      dried: "₹300-450/kg",
      supplement: "₹300-400/bottle",
    },
    availability: "common",
    difficulty: "easy",
    category: ["Calming", "Sleep", "Digestive"],
    season: ["Spring", "Summer"],
    region: ["Temperate", "Mediterranean"],
  },
  {
    id: "6",
    name: "Lavender",
    scientificName: "Lavandula angustifolia",
    image:
      "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?w=400&h=300&fit=crop",
    description:
      "Aromatic purple flowers renowned for relaxation and stress relief.",
    benefits: [
      "Relaxation",
      "Sleep improvement",
      "Anxiety relief",
      "Pain relief",
      "Antimicrobial",
    ],
    uses: [
      "Stress",
      "Insomnia",
      "Headaches",
      "Skin conditions",
      "Wound healing",
    ],
    preparation: [
      "Essential oil",
      "Dried flower tea",
      "Bath salts",
      "Topical oil",
    ],
    precautions: [
      "May cause drowsiness",
      "Possible skin irritation",
      "Avoid during pregnancy",
    ],
    cost: {
      fresh: "₹500-800/kg",
      dried: "₹350-550/kg",
      supplement: "₹350-500/bottle",
    },
    availability: "common",
    difficulty: "easy",
    category: ["Calming", "Sleep", "Aromatherapy"],
    season: ["Summer"],
    region: ["Mediterranean", "Temperate"],
  },
  {
    id: "7",
    name: "Peppermint",
    scientificName: "Mentha piperita",
    image:
      "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400&h=300&fit=crop",
    description: "Refreshing mint with cooling and digestive properties.",
    benefits: [
      "Digestive aid",
      "Respiratory support",
      "Pain relief",
      "Mental clarity",
      "Antimicrobial",
    ],
    uses: ["Indigestion", "IBS", "Headaches", "Congestion", "Bad breath"],
    preparation: [
      "Fresh leaf tea",
      "Essential oil",
      "Tincture",
      "Steam inhalation",
    ],
    precautions: [
      "May worsen acid reflux",
      "Avoid in small children",
      "May interact with medications",
    ],
    cost: {
      fresh: "₹160-300/kg",
      dried: "₹250-400/kg",
      supplement: "₹250-350/bottle",
    },
    availability: "common",
    difficulty: "easy",
    category: ["Digestive", "Respiratory", "Mental clarity"],
    season: ["Spring", "Summer", "Fall"],
    region: ["Temperate", "Cool climates"],
  },
  {
    id: "8",
    name: "Garlic",
    scientificName: "Allium sativum",
    image:
      "https://images.unsplash.com/photo-1553199193-fd38e6fa4c91?w=400&h=300&fit=crop",
    description:
      "Pungent bulb with powerful antimicrobial and cardiovascular benefits.",
    benefits: [
      "Antimicrobial",
      "Heart health",
      "Immune support",
      "Blood pressure",
      "Cholesterol",
    ],
    uses: [
      "Infections",
      "High blood pressure",
      "High cholesterol",
      "Cold and flu",
      "Fungal infections",
    ],
    preparation: [
      "Raw consumption",
      "Garlic oil",
      "Roasted garlic",
      "Supplements",
    ],
    precautions: [
      "May cause digestive upset",
      "Blood thinning effects",
      "Strong odor",
    ],
    cost: {
      fresh: "₹160-300/kg",
      dried: "₹400-600/kg",
      supplement: "₹300-400/bottle",
    },
    availability: "common",
    difficulty: "easy",
    category: ["Antimicrobial", "Cardiovascular", "Immune"],
    season: ["Year-round"],
    region: ["Temperate", "Mediterranean"],
  },
  {
    id: "9",
    name: "Ginkgo",
    scientificName: "Ginkgo biloba",
    image:
      "https://images.unsplash.com/photo-1582581431304-4f6e44d9f473?w=400&h=300&fit=crop",
    description:
      "Ancient tree leaves known for cognitive enhancement and circulation.",
    benefits: [
      "Cognitive function",
      "Memory",
      "Circulation",
      "Antioxidant",
      "Eye health",
    ],
    uses: [
      "Memory problems",
      "Poor circulation",
      "Dementia",
      "Tinnitus",
      "Vision problems",
    ],
    preparation: [
      "Standardized extract",
      "Tea from leaves",
      "Capsules",
      "Tincture",
    ],
    precautions: [
      "May increase bleeding risk",
      "Possible seizures in rare cases",
      "Drug interactions",
    ],
    cost: {
      fresh: "₹600-1000/kg",
      dried: "₹500-800/kg",
      supplement: "₹400-700/bottle",
    },
    availability: "moderate",
    difficulty: "moderate",
    category: ["Cognitive", "Circulation", "Antioxidant"],
    season: ["Fall"],
    region: ["Temperate", "Urban tolerant"],
  },
  {
    id: "10",
    name: "Green Tea",
    scientificName: "Camellia sinensis",
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
    description:
      "Antioxidant-rich leaves with metabolism and brain-boosting properties.",
    benefits: [
      "Antioxidant",
      "Metabolism",
      "Brain function",
      "Heart health",
      "Cancer prevention",
    ],
    uses: [
      "Weight management",
      "Mental alertness",
      "Heart disease prevention",
      "Diabetes",
      "Cancer prevention",
    ],
    preparation: ["Hot tea", "Cold brew", "Matcha powder", "Extract capsules"],
    precautions: [
      "Contains caffeine",
      "May interfere with iron absorption",
      "Possible stomach upset",
    ],
    cost: {
      fresh: "₹800-1600/kg",
      dried: "₹300-1000/kg",
      supplement: "₹350-600/bottle",
    },
    availability: "common",
    difficulty: "easy",
    category: ["Antioxidant", "Metabolism", "Cognitive"],
    season: ["Spring", "Summer"],
    region: ["Subtropical", "Mountains"],
  },
];

// Add 90+ more plants for a total of 100+
export const additionalPlants: MedicinalPlant[] = [
  {
    id: "11",
    name: "Ashwagandha",
    scientificName: "Withania somnifera",
    image:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop",
    description:
      "Adaptogenic herb that helps the body manage stress and anxiety.",
    benefits: [
      "Stress relief",
      "Anxiety reduction",
      "Energy boost",
      "Sleep quality",
      "Immune support",
    ],
    uses: ["Chronic stress", "Anxiety", "Fatigue", "Insomnia", "Low immunity"],
    preparation: ["Root powder", "Capsules", "Tea", "Tincture"],
    precautions: [
      "May interact with medications",
      "Avoid during pregnancy",
      "May cause drowsiness",
    ],
    cost: {
      fresh: "₹500-800/kg",
      dried: "₹400-700/kg",
      supplement: "₹400-600/bottle",
    },
    availability: "moderate",
    difficulty: "moderate",
    category: ["Adaptogen", "Stress", "Sleep"],
    season: ["Fall"],
    region: ["Arid", "India", "Mediterranean"],
  },
  {
    id: "12",
    name: "Holy Basil",
    scientificName: "Ocimum tenuiflorum",
    image:
      "https://images.unsplash.com/photo-1618180072062-a18b73582a4b?w=400&h=300&fit=crop",
    description:
      "Sacred herb in Ayurveda, known for stress relief and respiratory health.",
    benefits: [
      "Stress relief",
      "Respiratory health",
      "Blood sugar",
      "Immune support",
      "Mental clarity",
    ],
    uses: ["Stress", "Respiratory infections", "Diabetes", "Cough", "Fever"],
    preparation: [
      "Fresh leaf tea",
      "Dried leaf powder",
      "Essential oil",
      "Capsules",
    ],
    precautions: [
      "May affect blood clotting",
      "Possible hypoglycemia",
      "Avoid before surgery",
    ],
    cost: {
      fresh: "₹300-500/kg",
      dried: "₹350-600/kg",
      supplement: "₹350-500/bottle",
    },
    availability: "moderate",
    difficulty: "easy",
    category: ["Adaptogen", "Respiratory", "Blood sugar"],
    season: ["Summer", "Fall"],
    region: ["Tropical", "Subtropical"],
  },
  // Note: In a real app, we would include all 100+ plants here
  // For demo purposes, showing the structure with representative examples
];

// Import extended plants
import { extendedPlants, generateAdditionalPlants } from "./extendedPlants";

export const allPlants = [
  ...medicinalPlants,
  ...additionalPlants,
  ...extendedPlants,
  ...generateAdditionalPlants(),
];

export const plantCategories = [
  "Anti-inflammatory",
  "Digestive",
  "Respiratory",
  "Cardiovascular",
  "Immune",
  "Skin",
  "Calming",
  "Sleep",
  "Cognitive",
  "Adaptogen",
  "Antimicrobial",
  "Antioxidant",
];

export const searchPlants = (
  query: string,
  category?: string,
): MedicinalPlant[] => {
  let filtered = allPlants;

  if (category && category !== "all") {
    filtered = filtered.filter((plant) =>
      plant.category.some(
        (cat) => cat.toLowerCase() === category.toLowerCase(),
      ),
    );
  }

  if (query) {
    const lowercaseQuery = query.toLowerCase();
    filtered = filtered.filter(
      (plant) =>
        plant.name.toLowerCase().includes(lowercaseQuery) ||
        plant.scientificName.toLowerCase().includes(lowercaseQuery) ||
        plant.benefits.some((benefit) =>
          benefit.toLowerCase().includes(lowercaseQuery),
        ) ||
        plant.uses.some((use) => use.toLowerCase().includes(lowercaseQuery)),
    );
  }

  return filtered;
};
