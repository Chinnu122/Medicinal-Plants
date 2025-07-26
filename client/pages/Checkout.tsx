import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CreditCard,
  MapPin,
  Lock,
  CheckCircle,
  ArrowLeft,
  Package,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/contexts/CartContext";
import { useOffers } from "@/contexts/OffersContext";
import { useAuth } from "@/contexts/AuthContext";

export default function Checkout() {
  const { items, getCartTotal, createOrder } = useCart();
  const { applyOffer, getDiscountAmount } = useOffers();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [isProcessing, setIsProcessing] = useState(false);

  // Form data
  const [shippingData, setShippingData] = useState({
    name: user?.name || "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const [paymentData, setPaymentData] = useState({
    method: "credit_card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: user?.name || "",
  });

  const [appliedOfferCode, setAppliedOfferCode] = useState("");

  const subtotal = getCartTotal();
  const discountAmount = appliedOfferCode
    ? getDiscountAmount(appliedOfferCode, subtotal)
    : 0;
  const shipping = 0; // Free shipping
  const tax = Math.round((subtotal - discountAmount) * 0.08 * 100) / 100; // 8% tax
  const total = subtotal - discountAmount + shipping + tax;

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Apply the offer if used
      if (appliedOfferCode) {
        applyOffer(appliedOfferCode);
      }

      // Create the order
      const order = createOrder({
        shippingAddress: shippingData,
        paymentMethod: paymentData.method,
        discountAmount,
        offerCode: appliedOfferCode,
      });

      // Redirect to order confirmation
      navigate(`/order-confirmation/${order.id}`);
    } catch (error) {
      console.error("Order creation failed:", error);
      setIsProcessing(false);
    }
  };

  if (!user || items.length === 0) {
    navigate("/cart");
    return null;
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
          <Button
            variant="ghost"
            onClick={() => navigate("/cart")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Button>
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          <div className="flex items-center space-x-4 text-sm">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber
                      ? "bg-herbal-600 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > stepNumber ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span
                  className={`ml-2 ${step >= stepNumber ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {stepNumber === 1
                    ? "Shipping"
                    : stepNumber === 2
                      ? "Payment"
                      : "Review"}
                </span>
                {stepNumber < 3 && <div className="w-8 h-px bg-border ml-4" />}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Shipping Information
                    </CardTitle>
                    <CardDescription>
                      Where should we deliver your herbal remedies?
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={shippingData.name}
                        onChange={(e) =>
                          setShippingData({
                            ...shippingData,
                            name: e.target.value,
                          })
                        }
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="street">Street Address</Label>
                      <Input
                        id="street"
                        value={shippingData.street}
                        onChange={(e) =>
                          setShippingData({
                            ...shippingData,
                            street: e.target.value,
                          })
                        }
                        placeholder="123 Main Street"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={shippingData.city}
                          onChange={(e) =>
                            setShippingData({
                              ...shippingData,
                              city: e.target.value,
                            })
                          }
                          placeholder="New York"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={shippingData.state}
                          onChange={(e) =>
                            setShippingData({
                              ...shippingData,
                              state: e.target.value,
                            })
                          }
                          placeholder="NY"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          value={shippingData.zipCode}
                          onChange={(e) =>
                            setShippingData({
                              ...shippingData,
                              zipCode: e.target.value,
                            })
                          }
                          placeholder="10001"
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Select
                          value={shippingData.country}
                          onValueChange={(value) =>
                            setShippingData({ ...shippingData, country: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="United States">
                              United States
                            </SelectItem>
                            <SelectItem value="Canada">Canada</SelectItem>
                            <SelectItem value="United Kingdom">
                              United Kingdom
                            </SelectItem>
                            <SelectItem value="Australia">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button
                      onClick={handleNextStep}
                      className="w-full bg-herbal-600 hover:bg-herbal-700"
                      disabled={
                        !shippingData.name ||
                        !shippingData.street ||
                        !shippingData.city ||
                        !shippingData.state ||
                        !shippingData.zipCode
                      }
                    >
                      Continue to Payment
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 2: Payment Information */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Payment Information
                    </CardTitle>
                    <CardDescription>
                      Your payment information is secure and encrypted
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup
                      value={paymentData.method}
                      onValueChange={(value) =>
                        setPaymentData({ ...paymentData, method: value })
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="credit_card" id="credit_card" />
                        <Label htmlFor="credit_card">Credit Card</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal">PayPal</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="apple_pay" id="apple_pay" />
                        <Label htmlFor="apple_pay">Apple Pay</Label>
                      </div>
                    </RadioGroup>

                    {paymentData.method === "credit_card" && (
                      <>
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            value={paymentData.cardNumber}
                            onChange={(e) =>
                              setPaymentData({
                                ...paymentData,
                                cardNumber: e.target.value,
                              })
                            }
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                              id="expiryDate"
                              value={paymentData.expiryDate}
                              onChange={(e) =>
                                setPaymentData({
                                  ...paymentData,
                                  expiryDate: e.target.value,
                                })
                              }
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              value={paymentData.cvv}
                              onChange={(e) =>
                                setPaymentData({
                                  ...paymentData,
                                  cvv: e.target.value,
                                })
                              }
                              placeholder="123"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="cardholderName">
                            Cardholder Name
                          </Label>
                          <Input
                            id="cardholderName"
                            value={paymentData.cardholderName}
                            onChange={(e) =>
                              setPaymentData({
                                ...paymentData,
                                cardholderName: e.target.value,
                              })
                            }
                            placeholder="John Doe"
                          />
                        </div>
                      </>
                    )}

                    <div className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <Lock className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-700 dark:text-green-300">
                        Your payment information is encrypted and secure
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={handlePrevStep}
                        className="flex-1"
                      >
                        Back to Shipping
                      </Button>
                      <Button
                        onClick={handleNextStep}
                        className="flex-1 bg-herbal-600 hover:bg-herbal-700"
                        disabled={
                          paymentData.method === "credit_card" &&
                          (!paymentData.cardNumber ||
                            !paymentData.expiryDate ||
                            !paymentData.cvv)
                        }
                      >
                        Review Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 3: Order Review */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Review Your Order</CardTitle>
                    <CardDescription>
                      Please review your order details before placing your order
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Order Items */}
                    <div>
                      <h4 className="font-medium mb-3">Order Items</h4>
                      <div className="space-y-2">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between items-center p-2 bg-muted/50 rounded"
                          >
                            <div>
                              <span className="font-medium">
                                {item.plant.name}
                              </span>
                              <span className="text-sm text-muted-foreground ml-2">
                                ({item.form}) × {item.quantity}
                              </span>
                            </div>
                            <span>
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Shipping Address */}
                    <div>
                      <h4 className="font-medium mb-2">Shipping Address</h4>
                      <div className="text-sm text-muted-foreground">
                        <p>{shippingData.name}</p>
                        <p>{shippingData.street}</p>
                        <p>
                          {shippingData.city}, {shippingData.state}{" "}
                          {shippingData.zipCode}
                        </p>
                        <p>{shippingData.country}</p>
                      </div>
                    </div>

                    <Separator />

                    {/* Payment Method */}
                    <div>
                      <h4 className="font-medium mb-2">Payment Method</h4>
                      <p className="text-sm text-muted-foreground capitalize">
                        {paymentData.method.replace("_", " ")}
                        {paymentData.method === "credit_card" &&
                          paymentData.cardNumber &&
                          ` ending in ${paymentData.cardNumber.slice(-4)}`}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={handlePrevStep}
                        className="flex-1"
                      >
                        Back to Payment
                      </Button>
                      <Button
                        onClick={handlePlaceOrder}
                        className="flex-1 bg-herbal-600 hover:bg-herbal-700"
                        disabled={isProcessing}
                      >
                        {isProcessing
                          ? "Processing..."
                          : `Place Order - $${total.toFixed(2)}`}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
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
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="flex items-center space-x-2 p-3 bg-herbal-50 dark:bg-herbal-900/20 rounded-lg">
                  <Truck className="w-4 h-4 text-herbal-600" />
                  <span className="text-sm">Free shipping on all orders</span>
                </div>

                <div className="flex items-center space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Package className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">
                    Estimated delivery: 5-7 business days
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
