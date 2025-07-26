import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  DollarSign,
  Clock,
  MapPin,
  AlertTriangle,
  Leaf,
  Heart,
  Share2,
  BookmarkPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { allPlants } from "@/data/plants";

export default function PlantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const plant = allPlants.find((p) => p.id === id);

  if (!plant) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Plant Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8">
          The plant you're looking for doesn't exist in our database.
        </p>
        <Button onClick={() => navigate("/plants")}>Back to Plants</Button>
      </div>
    );
  }

  const difficultyColors = {
    easy: "bg-green-100 text-green-800",
    moderate: "bg-yellow-100 text-yellow-800",
    difficult: "bg-red-100 text-red-800",
  };

  const availabilityColors = {
    common: "bg-green-100 text-green-800",
    moderate: "bg-yellow-100 text-yellow-800",
    rare: "bg-red-100 text-red-800",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-herbal-500 to-nature-600 text-white">
        <div className="container mx-auto px-6 py-8">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="flex flex-col lg:flex-row gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex-shrink-0"
            >
              <img
                src={plant.image}
                alt={plant.name}
                className="w-full lg:w-80 h-64 lg:h-80 object-cover rounded-xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1"
            >
              <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                {plant.name}
              </h1>
              <p className="text-xl opacity-90 italic mb-4">
                {plant.scientificName}
              </p>
              <p className="text-lg opacity-80 mb-6 leading-relaxed">
                {plant.description}
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <Badge
                  className={`${availabilityColors[plant.availability]} border-0`}
                >
                  {plant.availability}
                </Badge>
                <Badge
                  className={`${difficultyColors[plant.difficulty]} border-0`}
                >
                  {plant.difficulty}
                </Badge>
                {plant.category.slice(0, 3).map((cat) => (
                  <Badge
                    key={cat}
                    variant="secondary"
                    className="bg-white/20 text-white"
                  >
                    {cat}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-white text-herbal-600 hover:bg-gray-100"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Save to Favorites
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/20"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="benefits" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
                <TabsTrigger value="uses">Uses</TabsTrigger>
                <TabsTrigger value="preparation">How to Use</TabsTrigger>
                <TabsTrigger value="precautions">Safety</TabsTrigger>
              </TabsList>

              <TabsContent value="benefits" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Leaf className="w-5 h-5 mr-2 text-herbal-600" />
                      Health Benefits
                    </CardTitle>
                    <CardDescription>
                      Discover the natural healing properties of {plant.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {plant.benefits.map((benefit, index) => (
                        <motion.div
                          key={benefit}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="flex items-center p-3 bg-herbal-50 dark:bg-herbal-900/20 rounded-lg"
                        >
                          <Star className="w-4 h-4 text-herbal-600 mr-3 flex-shrink-0" />
                          <span>{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="uses" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Common Uses</CardTitle>
                    <CardDescription>
                      Traditional and modern applications of {plant.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {plant.uses.map((use, index) => (
                        <motion.div
                          key={use}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="flex items-center p-3 bg-nature-50 dark:bg-nature-900/20 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-nature-600 rounded-full mr-3 flex-shrink-0" />
                          <span>{use}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preparation" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Preparation Methods</CardTitle>
                    <CardDescription>
                      How to prepare and use {plant.name} safely
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {plant.preparation.map((method, index) => (
                        <motion.div
                          key={method}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="p-4 border border-border rounded-lg"
                        >
                          <div className="flex items-start">
                            <div className="w-6 h-6 bg-earth-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                              {index + 1}
                            </div>
                            <span>{method}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="precautions" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-orange-600">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Safety & Precautions
                    </CardTitle>
                    <CardDescription>
                      Important safety information for using {plant.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {plant.precautions.map((precaution, index) => (
                        <motion.div
                          key={precaution}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="flex items-start p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500"
                        >
                          <AlertTriangle className="w-4 h-4 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{precaution}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                  Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="font-medium">Fresh</span>
                  <span className="text-green-600 font-bold">
                    {plant.cost.fresh}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <span className="font-medium">Dried</span>
                  <span className="text-yellow-600 font-bold">
                    {plant.cost.dried}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="font-medium">Supplement</span>
                  <span className="text-blue-600 font-bold">
                    {plant.cost.supplement}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Growing Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-earth-600" />
                  Growing Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Season
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {plant.season.map((season) => (
                      <Badge key={season} variant="outline">
                        {season}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Region
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {plant.region.map((region) => (
                      <Badge key={region} variant="outline">
                        {region}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add to Cart */}
            <Card>
              <CardHeader>
                <CardTitle>Add to Cart</CardTitle>
                <CardDescription>
                  Choose your preferred form and quantity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="form">Form</Label>
                  <Select value={selectedForm} onValueChange={(value: 'fresh' | 'dried' | 'supplement') => setSelectedForm(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fresh">Fresh - {plant.cost.fresh}</SelectItem>
                      <SelectItem value="dried">Dried - {plant.cost.dried}</SelectItem>
                      <SelectItem value="supplement">Supplement - {plant.cost.supplement}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 p-0"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 p-0"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Total:</span>
                    <span className="text-xl font-bold text-herbal-600">
                      ${(currentPrice * quantity).toFixed(2)}
                    </span>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    disabled={isAdding || showSuccess}
                    className="w-full bg-herbal-600 hover:bg-herbal-700"
                  >
                    {showSuccess ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Added to Cart!
                      </>
                    ) : isAdding ? (
                      'Adding...'
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <BookmarkPlus className="w-4 h-4 mr-2" />
                  Add to My Garden
                </Button>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/assistant">
                    Ask AI Assistant
                  </Link>
                </Button>
                {user && (
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/cart">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      View Cart ({getCartItemsCount()})
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
