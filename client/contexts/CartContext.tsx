import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { MedicinalPlant } from "@/data/plants";

export interface CartItem {
  id: string;
  plant: MedicinalPlant;
  form: "fresh" | "dried" | "supplement";
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  createdAt: Date;
  estimatedDelivery?: Date;
  trackingNumber?: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  discountAmount?: number;
  offerCode?: string;
}

interface CartContextType {
  items: CartItem[];
  orders: Order[];
  addToCart: (
    plant: MedicinalPlant,
    form: "fresh" | "dried" | "supplement",
    quantity?: number,
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  createOrder: (
    orderData: Omit<Order, "id" | "items" | "total" | "createdAt" | "status">,
  ) => Order;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  getOrder: (orderId: string) => Order | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load cart and orders from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("herbwise-cart");
    const savedOrders = localStorage.getItem("herbwise-orders");

    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    }

    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders);
        // Convert date strings back to Date objects
        const ordersWithDates = parsedOrders.map((order: any) => ({
          ...order,
          createdAt: new Date(order.createdAt),
          estimatedDelivery: order.estimatedDelivery
            ? new Date(order.estimatedDelivery)
            : undefined,
        }));
        setOrders(ordersWithDates);
      } catch (error) {
        console.error("Error loading orders:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("herbwise-cart", JSON.stringify(items));
  }, [items]);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("herbwise-orders", JSON.stringify(orders));
  }, [orders]);

  const extractPrice = (priceString: string): number => {
    // Extract price from strings like "$8-15/lb", "$10-25/bottle"
    const match = priceString.match(/\$(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const addToCart = (
    plant: MedicinalPlant,
    form: "fresh" | "dried" | "supplement",
    quantity = 1,
  ) => {
    const price = extractPrice(plant.cost[form]);
    const existingItemIndex = items.findIndex(
      (item) => item.plant.id === plant.id && item.form === form,
    );

    if (existingItemIndex >= 0) {
      // Update quantity of existing item
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += quantity;
      setItems(updatedItems);
    } else {
      // Add new item
      const newItem: CartItem = {
        id: `${plant.id}-${form}-${Date.now()}`,
        plant,
        form,
        quantity,
        price,
      };
      setItems([...items, newItem]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setItems(
      items.map((item) => (item.id === itemId ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartTotal = (): number => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemsCount = (): number => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const createOrder = (
    orderData: Omit<Order, "id" | "items" | "total" | "createdAt" | "status">,
  ): Order => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      items: [...items],
      total: getCartTotal() - (orderData.discountAmount || 0),
      status: "pending",
      createdAt: new Date(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      trackingNumber: `HW${Date.now().toString().slice(-8)}`,
      ...orderData,
    };

    setOrders([newOrder, ...orders]);
    clearCart();

    // Simulate order processing
    setTimeout(() => {
      updateOrderStatus(newOrder.id, "confirmed");
    }, 2000);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status } : order,
      ),
    );
  };

  const getOrder = (orderId: string): Order | undefined => {
    return orders.find((order) => order.id === orderId);
  };

  const value: CartContextType = {
    items,
    orders,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    createOrder,
    updateOrderStatus,
    getOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
