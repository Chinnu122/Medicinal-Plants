import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  SlidersHorizontal,
  Star,
  Heart,
  Leaf,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { allPlants, plantCategories } from "@/data/plants";

export default function Plants() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedAvailability, setSelectedAvailability] =
    useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort plants
  const filteredPlants = useMemo(() => {
    let filtered = allPlants.filter((plant) => {
      const matchesSearch =
        plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.scientificName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        plant.benefits.some((benefit) =>
          benefit.toLowerCase().includes(searchQuery.toLowerCase()),
        ) ||
        plant.uses.some((use) =>
          use.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      const matchesCategory =
        selectedCategory === "all" ||
        plant.category.some(
          (cat) => cat.toLowerCase() === selectedCategory.toLowerCase(),
        );

      const matchesAvailability =
        selectedAvailability === "all" ||
        plant.availability === selectedAvailability;

      const matchesDifficulty =
        selectedDifficulty === "all" || plant.difficulty === selectedDifficulty;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesAvailability &&
        matchesDifficulty
      );
    });

    // Sort plants
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "scientific":
          return a.scientificName.localeCompare(b.scientificName);
        case "availability":
          const availabilityOrder = { common: 0, moderate: 1, rare: 2 };
          return (
            availabilityOrder[a.availability] -
            availabilityOrder[b.availability]
          );
        case "difficulty":
          const difficultyOrder = { easy: 0, moderate: 1, difficult: 2 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        default:
          return 0;
      }
    });

    return filtered;
  }, [
    searchQuery,
    selectedCategory,
    selectedAvailability,
    selectedDifficulty,
    sortBy,
  ]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedAvailability("all");
    setSelectedDifficulty("all");
    setSortBy("name");
  };

  const PlantCard = ({
    plant,
    index,
  }: {
    plant: (typeof allPlants)[0];
    index: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="relative">
          <img
            src={plant.image}
            alt={plant.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <Badge
              className={`
              ${
                plant.availability === "common"
                  ? "bg-green-500"
                  : plant.availability === "moderate"
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }
            `}
            >
              {plant.availability}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20"
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg group-hover:text-herbal-600 transition-colors">
                {plant.name}
              </CardTitle>
              <CardDescription className="italic text-sm">
                {plant.scientificName}
              </CardDescription>
            </div>
            <span className="text-sm font-semibold text-herbal-600">
              {plant.cost.dried}
            </span>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {plant.description}
          </p>

          <div className="flex flex-wrap gap-1 mb-4">
            {plant.benefits.slice(0, 3).map((benefit) => (
              <Badge key={benefit} variant="secondary" className="text-xs">
                {benefit}
              </Badge>
            ))}
            {plant.benefits.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{plant.benefits.length - 3} more
              </Badge>
            )}
          </div>

          <Link to={`/plants/${plant.id}`}>
            <Button className="w-full bg-herbal-600 hover:bg-herbal-700">
              Learn More
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );

  const PlantListItem = ({
    plant,
    index,
  }: {
    plant: (typeof allPlants)[0];
    index: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <img
              src={plant.image}
              alt={plant.name}
              className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg hover:text-herbal-600">
                    {plant.name}
                  </h3>
                  <p className="text-sm text-muted-foreground italic">
                    {plant.scientificName}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-herbal-600">
                    {plant.cost.dried}
                  </span>
                  <Button size="sm" variant="ghost">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                {plant.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  <Badge
                    className={`
                    ${
                      plant.availability === "common"
                        ? "bg-green-100 text-green-800"
                        : plant.availability === "moderate"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }
                  `}
                  >
                    {plant.availability}
                  </Badge>
                  {plant.benefits.slice(0, 2).map((benefit) => (
                    <Badge key={benefit} variant="outline" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>

                <Link to={`/plants/${plant.id}`}>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-herbal-500 to-nature-600 text-white">
        <div className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Medicinal Plants Database
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Discover 100+ healing plants with detailed information,
              preparation methods, and affordable sourcing options.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 -mt-8 relative z-10">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search plants by name, benefits, or uses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="h-12"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>

              <Tabs
                value={viewMode}
                onValueChange={(value) => setViewMode(value as "grid" | "list")}
              >
                <TabsList className="h-12">
                  <TabsTrigger value="grid" className="h-10">
                    <Grid3X3 className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger value="list" className="h-10">
                    <List className="w-4 h-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 bg-muted/50 rounded-lg"
            >
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {plantCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedAvailability}
                onValueChange={setSelectedAvailability}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Availability</SelectItem>
                  <SelectItem value="common">Common</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="rare">Rare</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={selectedDifficulty}
                onValueChange={setSelectedDifficulty}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulty</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="difficult">Difficult</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="scientific">Scientific Name</SelectItem>
                  <SelectItem value="availability">Availability</SelectItem>
                  <SelectItem value="difficulty">Difficulty</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}

          {/* Results Summary */}
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>
              Showing {filteredPlants.length} of {allPlants.length} plants
            </span>
            {(searchQuery ||
              selectedCategory !== "all" ||
              selectedAvailability !== "all" ||
              selectedDifficulty !== "all") && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all filters
              </Button>
            )}
          </div>
        </div>

        {/* Plants Grid/List */}
        <div className="mt-8">
          {filteredPlants.length === 0 ? (
            <div className="text-center py-20">
              <Leaf className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No plants found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or clear the filters.
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredPlants.map((plant, index) =>
                viewMode === "grid" ? (
                  <PlantCard key={plant.id} plant={plant} index={index} />
                ) : (
                  <PlantListItem key={plant.id} plant={plant} index={index} />
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
