import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShoppingBag,
  Tag,
  Gift,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useOffers } from "@/contexts/OffersContext";
import { useAuth } from "@/contexts/AuthContext";

export default function Cart() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartItemsCount,
  } = useCart();
  const { activeOffers, validateOffer, getDiscountAmount } = useOffers();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [offerCode, setOfferCode] = useState("");
  const [appliedOffer, setAppliedOffer] = useState<string>("");
  const [offerMessage, setOfferMessage] = useState("");

  const subtotal = getCartTotal();
  const discountAmount = appliedOffer
    ? getDiscountAmount(appliedOffer, subtotal)
    : 0;
  const total = subtotal - discountAmount;

  const handleApplyOffer = () => {
    if (!offerCode.trim()) return;

    const validation = validateOffer(offerCode, subtotal);
    setOfferMessage(validation.message);

    if (validation.valid) {
      setAppliedOffer(offerCode);
    }
  };

  const handleRemoveOffer = () => {
    setAppliedOffer("");
    setOfferCode("");
    setOfferMessage("");
  };

  const handleCheckout = () => {
    if (!user) {
      navigate("/signin");
      return;
    }
    navigate("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">
            Discover our collection of medicinal plants and natural remedies
          </p>
          <Button
            asChild
            size="lg"
            className="bg-herbal-600 hover:bg-herbal-700"
          >
            <Link to="/plants">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Start Shopping
            </Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {getCartItemsCount()} {getCartItemsCount() === 1 ? "item" : "items"}{" "}
            in your cart
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={item.plant.image}
                        alt={item.plant.name}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {item.plant.name}
                            </h3>
                            <p className="text-sm text-muted-foreground italic">
                              {item.plant.scientificName}
                            </p>
                            <Badge
                              variant="outline"
                              className="mt-1 capitalize"
                            >
                              {item.form}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-8 h-8 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-12 text-center font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-8 h-8 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <p className="font-semibold text-lg">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              ${item.price.toFixed(2)} each
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Active Offers */}
            {activeOffers.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Gift className="w-5 h-5 mr-2 text-herbal-600" />
                      Active Offers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {activeOffers.slice(0, 3).map((offer) => (
                      <div
                        key={offer.id}
                        className="p-3 bg-herbal-50 dark:bg-herbal-900/20 rounded-lg"
                      >
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-medium text-sm">{offer.title}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {offer.code}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {offer.description}
                        </p>
                        <div className="flex items-center text-xs text-orange-600">
                          <Clock className="w-3 h-3 mr-1" />
                          Expires {offer.endDate.toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Promo Code */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Tag className="w-5 h-5 mr-2 text-herbal-600" />
                    Promo Code
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {appliedOffer ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          <span className="font-medium text-green-700 dark:text-green-300">
                            {appliedOffer}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleRemoveOffer}
                          className="text-green-600 hover:text-green-700"
                        >
                          Remove
                        </Button>
                      </div>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        {offerMessage}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter promo code"
                          value={offerCode}
                          onChange={(e) =>
                            setOfferCode(e.target.value.toUpperCase())
                          }
                          className="flex-1"
                        />
                        <Button
                          onClick={handleApplyOffer}
                          variant="outline"
                          disabled={!offerCode.trim()}
                        >
                          Apply
                        </Button>
                      </div>
                      {offerMessage && (
                        <p
                          className={`text-sm ${offerMessage.includes("successfully") ? "text-green-600" : "text-red-600"}`}
                        >
                          {offerMessage}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedOffer})</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Shipping</span>
                    <span>FREE</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-herbal-600 hover:bg-herbal-700"
                    size="lg"
                  >
                    {user ? "Proceed to Checkout" : "Sign In to Checkout"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/plants">Continue Shopping</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
