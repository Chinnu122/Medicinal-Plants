import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  X,
  Eye,
  Download,
  RefreshCw,
  Filter,
  Search,
  MapPin,
  Calendar,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart, Order } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

export default function Orders() {
  const { orders } = useCart();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
      case "shipped":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300";
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "confirmed":
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "processing":
        return <Package className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "cancelled":
        return <X className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) =>
        item.plant.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Group orders by status for tabs
  const ordersByStatus = {
    all: filteredOrders,
    active: filteredOrders.filter((order) =>
      ["pending", "confirmed", "processing", "shipped"].includes(order.status),
    ),
    delivered: filteredOrders.filter((order) => order.status === "delivered"),
    cancelled: filteredOrders.filter((order) => order.status === "cancelled"),
  };

  const getTrackingProgress = (status: string) => {
    const steps = ["confirmed", "processing", "shipped", "delivered"];
    const currentIndex = steps.indexOf(status);
    return currentIndex >= 0 ? currentIndex + 1 : 0;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
          <p className="text-muted-foreground mb-8">
            You need to be signed in to view your orders
          </p>
          <Button
            asChild
            size="lg"
            className="bg-herbal-600 hover:bg-herbal-700"
          >
            <Link to="/signin">Sign In</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  const OrderCard = ({ order }: { order: Order }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="font-semibold text-lg">Order #{order.id}</h3>
              <Badge className={`${getStatusColor(order.status)} border-0`}>
                {getStatusIcon(order.status)}
                <span className="ml-1 capitalize">{order.status}</span>
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <div className="flex items-center mb-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Ordered: {order.createdAt.toLocaleDateString()}</span>
                </div>
                {order.estimatedDelivery && (
                  <div className="flex items-center">
                    <Truck className="w-4 h-4 mr-2" />
                    <span>
                      Estimated: {order.estimatedDelivery.toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center mb-1">
                  <Package className="w-4 h-4 mr-2" />
                  <span>
                    {order.items.length}{" "}
                    {order.items.length === 1 ? "item" : "items"}
                  </span>
                </div>
                {order.trackingNumber && (
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Tracking: {order.trackingNumber}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3">
              <div className="flex flex-wrap gap-2">
                {order.items.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 bg-muted/50 rounded px-2 py-1"
                  >
                    <img
                      src={item.plant.image}
                      alt={item.plant.name}
                      className="w-6 h-6 object-cover rounded"
                    />
                    <span className="text-sm">{item.plant.name}</span>
                  </div>
                ))}
                {order.items.length > 3 && (
                  <div className="flex items-center px-2 py-1 text-sm text-muted-foreground">
                    +{order.items.length - 3} more
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:items-end gap-3">
            <div className="text-right">
              <p className="text-2xl font-bold">${order.total.toFixed(2)}</p>
              {order.discountAmount && order.discountAmount > 0 && (
                <p className="text-sm text-green-600">
                  Saved ${order.discountAmount.toFixed(2)}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to={`/orders/${order.id}`}>
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Link>
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                Receipt
              </Button>
            </div>
          </div>
        </div>

        {/* Progress Bar for Active Orders */}
        {["confirmed", "processing", "shipped"].includes(order.status) && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Order Progress</span>
              <span className="text-sm text-muted-foreground">
                {getTrackingProgress(order.status)}/4 steps
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-herbal-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(getTrackingProgress(order.status) / 4) * 100}%`,
                }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

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
          <h1 className="text-3xl font-bold mb-2">My Orders</h1>
          <p className="text-muted-foreground">
            Track and manage your HerbWise orders
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders by ID or product name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Orders Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">
                All ({ordersByStatus.all.length})
              </TabsTrigger>
              <TabsTrigger value="active">
                Active ({ordersByStatus.active.length})
              </TabsTrigger>
              <TabsTrigger value="delivered">
                Delivered ({ordersByStatus.delivered.length})
              </TabsTrigger>
              <TabsTrigger value="cancelled">
                Cancelled ({ordersByStatus.cancelled.length})
              </TabsTrigger>
            </TabsList>

            {Object.entries(ordersByStatus).map(([tab, tabOrders]) => (
              <TabsContent key={tab} value={tab} className="mt-6">
                {tabOrders.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16">
                      <Package className="w-16 h-16 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">
                        No orders found
                      </h3>
                      <p className="text-muted-foreground text-center mb-6">
                        {tab === "all"
                          ? "You haven't placed any orders yet."
                          : `No ${tab} orders found.`}
                      </p>
                      <Button
                        asChild
                        className="bg-herbal-600 hover:bg-herbal-700"
                      >
                        <Link to="/plants">Start Shopping</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {tabOrders.map((order, index) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <OrderCard order={order} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
