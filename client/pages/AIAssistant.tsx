import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mic,
  MicOff,
  Bot,
  User,
  Loader,
  Volume2,
  VolumeX,
  Leaf,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: `Hello! I'm your AI-powered medicinal plants assistant. I can help you with:

• Finding the right plants for specific health conditions
• Understanding preparation methods and dosages
• Learning about plant safety and interactions
• Discovering affordable alternatives
• Getting personalized wellness recommendations

What would you like to know about medicinal plants today?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const MIN_REQUEST_INTERVAL = 5000; // 5 seconds between requests to prevent rate limiting

  // Speech recognition
  const recognition = useRef<SpeechRecognition | null>(null);
  const synthesis = window.speechSynthesis;

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = "en-US";

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognition.current.onerror = () => {
        setIsListening(false);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fallback responses for common questions when AI is unavailable
  const getFallbackResponse = (prompt: string): string | null => {
    const lowercasePrompt = prompt.toLowerCase();

    if (
      lowercasePrompt.includes("turmeric") &&
      lowercasePrompt.includes("inflammation")
    ) {
      return `🌿 **Turmeric for Inflammation**

**Preparation Methods:**
1. **Golden Milk**: Mix 1 tsp turmeric powder + pinch of black pepper + warm milk
2. **Fresh Root Tea**: Slice fresh turmeric root, boil for 10 minutes
3. **Turmeric Paste**: Mix turmeric powder with water, apply topically

**Dosage**: 1-3 grams daily (about 1/2 to 1 teaspoon)

**Benefits**: Anti-inflammatory, antioxidant, pain relief

**Safety**: May interact with blood thinners. Consult your doctor if taking medications.

💡 *Find more details in our Plants Database → Turmeric section*`;
    }

    if (
      lowercasePrompt.includes("ginger") &&
      (lowercasePrompt.includes("nausea") ||
        lowercasePrompt.includes("digestive"))
    ) {
      return `🌿 **Ginger for Digestive Health**

**Preparation Methods:**
1. **Fresh Ginger Tea**: Slice 1-inch fresh ginger, steep in hot water 10 mins
2. **Ginger Juice**: Grate fresh ginger, strain juice, mix with honey
3. **Dried Ginger**: 1/4 to 1/2 teaspoon powder in warm water

**Benefits**: Anti-nausea, digestive aid, anti-inflammatory

**Uses**: Motion sickness, morning sickness, indigestion

**Safety**: Avoid large amounts during pregnancy. May interact with blood thinners.

💡 *Explore our complete Ginger guide in the Plants section*`;
    }

    if (
      lowercasePrompt.includes("chamomile") ||
      (lowercasePrompt.includes("sleep") && lowercasePrompt.includes("tea"))
    ) {
      return `🌿 **Chamomile for Sleep & Relaxation**

**Preparation**:
• **Tea**: 1 tsp dried flowers in 1 cup hot water, steep 5-10 minutes
• **Evening dose**: Drink 30 minutes before bedtime

**Benefits**: Calming, sleep aid, anti-inflammatory, digestive support

**Safety**: Generally safe. May cause allergic reactions in people sensitive to ragweed.

💡 *Visit our Plants Database for more calming herbs like Lavender and Valerian Root*`;
    }

    if (
      lowercasePrompt.includes("echinacea") ||
      (lowercasePrompt.includes("immune") && lowercasePrompt.includes("system"))
    ) {
      return `🌿 **Echinacea for Immune Support**

**Preparation**:
• **Tea**: 1-2 tsp dried herb, steep 10 minutes
• **Tincture**: 2-3 mL, 3 times daily
• **Best taken**: At first sign of cold symptoms

**Benefits**: Immune support, antiviral, reduces cold duration

**Safety**: Avoid with autoimmune conditions. Don't use for more than 8 weeks continuously.

💡 *Check our Plants section for more immune-boosting herbs*`;
    }

    if (
      lowercasePrompt.includes("stress") ||
      lowercasePrompt.includes("anxiety")
    ) {
      return `🌿 **Natural Herbs for Stress & Anxiety**

**Top Recommendations**:
1. **Chamomile**: Gentle, safe for daily use
2. **Lavender**: Aromatherapy or tea
3. **Ashwagandha**: Adaptogenic herb for chronic stress
4. **Lemon Balm**: Calming, good for nervous tension

**Quick Stress Relief Tea**: Mix chamomile + lemon balm, steep 10 minutes

**Safety**: Always consult healthcare provider for severe anxiety. Start with small amounts.

💡 *Browse our Plants Database for detailed preparation guides*`;
    }

    return null;
  };

  const callGoogleAI = async (
    prompt: string,
    retryCount = 0,
  ): Promise<string> => {
    const maxRetries = 3;
    const baseDelay = 1000; // 1 second

    // Try fallback response first if AI is unavailable
    const fallback = getFallbackResponse(prompt);

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=AIzaSyBPqA6KHQi9cIczRKtoO86WCkdhmf0t6TU",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a knowledgeable medicinal plants expert and wellness assistant. Your responses should be:
- Accurate and evidence-based
- Focused on medicinal plants and natural remedies
- Include safety warnings when appropriate
- Mention consulting healthcare providers for serious conditions
- Provide affordable, accessible alternatives when possible

User question: ${prompt}`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
          }),
        },
      );

      // Handle rate limiting (429) and quota exceeded
      if (response.status === 429) {
        const errorData = await response.json().catch(() => ({}));

        // Check if it's a quota exceeded error
        if (
          errorData.error &&
          errorData.error.message &&
          errorData.error.message.includes("quota")
        ) {
          // Try to provide a fallback response for common questions
          if (fallback) {
            return (
              fallback +
              `\n\n*Note: AI service is temporarily limited, but I can still help with common plant questions!*`
            );
          }

          return `🚫 **AI Service Temporarily Unavailable**

The Google AI service has reached its daily usage limit. Here's what you can do:

🌿 **Browse Our Plant Database**: Visit the **Plants** section to explore 100+ medicinal herbs with detailed information about benefits, preparation methods, and costs.

📚 **Search Specific Plants**: Use our search feature to find plants for specific health conditions like:
• Turmeric for inflammation
• Chamomile for sleep and anxiety
• Ginger for digestive issues
• Echinacea for immune support

💡 **Plant Preparation Guide**: Each plant page includes step-by-step preparation instructions and safety precautions.

The AI service will be restored within 24 hours. Thank you for your patience! 🙏`;
        }

        // Regular rate limiting - try retry logic
        if (retryCount < maxRetries) {
          const delay = baseDelay * Math.pow(2, retryCount);
          console.log(
            `Rate limited. Retrying in ${delay}ms (attempt ${retryCount + 1}/${maxRetries})`,
          );
          await new Promise((resolve) => setTimeout(resolve, delay));
          return callGoogleAI(prompt, retryCount + 1);
        } else {
          return "I'm currently experiencing high demand! 🌿 Please wait a few minutes before asking another question. In the meantime, feel free to browse our medicinal plants database for information about specific herbs and remedies.";
        }
      }

      // Check if response is ok before parsing
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Only call .json() once and store the result
      const data = await response.json();

      if (
        data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts[0]
      ) {
        return data.candidates[0].content.parts[0].text;
      } else if (data.error) {
        throw new Error(`API Error: ${data.error.message || "Unknown error"}`);
      } else {
        throw new Error("Invalid response structure from AI");
      }
    } catch (error) {
      console.error("AI API Error:", error);
      if (error instanceof Error) {
        if (
          error.message.includes("fetch") ||
          error.message.includes("network")
        ) {
          return "I'm having trouble connecting to the AI service. Please check your internet connection and try again.";
        } else if (
          error.message.includes("HTTP error! status: 4") ||
          error.message.includes("HTTP error! status: 5")
        ) {
          return "The AI service is temporarily unavailable. Please try again in a moment.";
        }
      }
      return "I apologize, but I'm having trouble processing your request right now. Please try again in a moment, or feel free to browse our medicinal plants database for information.";
    }
  };

  const speakText = (text: string) => {
    if (speechEnabled && synthesis) {
      synthesis.cancel(); // Cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      synthesis.speak(utterance);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    // Check if we're sending requests too quickly
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;

    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      const waitTime = Math.ceil(
        (MIN_REQUEST_INTERVAL - timeSinceLastRequest) / 1000,
      );
      const warningMessage: Message = {
        id: Date.now().toString(),
        type: "assistant",
        content: `Please wait ${waitTime} more second${waitTime > 1 ? "s" : ""} before asking another question. This helps me provide better responses and prevents rate limiting! 🌿

While you wait, you can:
• Browse our Plants Database for detailed herb information
• Review previous responses in our chat history
• Prepare your next question about medicinal plants`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, warningMessage]);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input.trim();
    setInput("");
    setIsLoading(true);
    setLastRequestTime(now);

    try {
      const aiResponse = await callGoogleAI(currentInput);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Speak the response if speech is enabled
      if (speechEnabled) {
        speakText(aiResponse);
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "Sorry, I encountered an error. Please try again in a moment.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (!recognition.current) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    if (isListening) {
      recognition.current.stop();
      setIsListening(false);
    } else {
      recognition.current.start();
      setIsListening(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestionQuestions = [
    "What herbs are good for stress and anxiety?",
    "How do I prepare turmeric for inflammation?",
    "Which plants help with digestive issues?",
    "What are affordable alternatives to expensive supplements?",
    "How to grow medicinal herbs at home?",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-herbal-50 via-nature-100 to-earth-50 dark:from-herbal-900 dark:via-nature-800 dark:to-earth-800">
      <div className="container mx-auto px-4 py-8 h-screen flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-herbal-500 to-nature-600 rounded-2xl flex items-center justify-center mr-4">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                AI Plant Assistant
              </h1>
              <p className="text-muted-foreground">
                Your personal medicinal plants expert
              </p>
            </div>
          </div>

          {user && (
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Welcome back, {user.name}!
            </Badge>
          )}
        </motion.div>

        {/* Chat Container */}
        <Card className="flex-1 flex flex-col shadow-2xl border-0">
          {/* Messages */}
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-full p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      {/* Avatar */}
                      <div
                        className={`flex-shrink-0 ${message.type === "user" ? "ml-2" : "mr-2"}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            message.type === "user"
                              ? "bg-herbal-600 text-white"
                              : "bg-gradient-to-br from-nature-500 to-earth-600 text-white"
                          }`}
                        >
                          {message.type === "user" ? (
                            <User className="w-4 h-4" />
                          ) : (
                            <Bot className="w-4 h-4" />
                          )}
                        </div>
                      </div>

                      {/* Message */}
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          message.type === "user"
                            ? "bg-herbal-600 text-white rounded-br-md"
                            : "bg-muted text-foreground rounded-bl-md"
                        }`}
                      >
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {message.content}
                        </div>
                        <div
                          className={`text-xs mt-2 ${
                            message.type === "user"
                              ? "text-white/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center space-x-2 bg-muted rounded-2xl px-4 py-3 rounded-bl-md">
                      <Loader className="w-4 h-4 animate-spin" />
                      <span className="text-sm">AI is thinking...</span>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>

          {/* Suggestions (show when no user messages) */}
          {messages.length === 1 && (
            <div className="border-t p-4">
              <p className="text-sm text-muted-foreground mb-3">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {suggestionQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInput(question)}
                    className="text-xs"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about medicinal plants, remedies, or health concerns..."
                  disabled={isLoading}
                  className="pr-12"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleVoiceInput}
                  disabled={isLoading}
                  className={`absolute right-1 top-1 h-8 w-8 p-0 ${
                    isListening ? "text-red-500" : "text-muted-foreground"
                  }`}
                >
                  {isListening ? (
                    <MicOff className="w-4 h-4" />
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                </Button>
              </div>

              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="bg-herbal-600 hover:bg-herbal-700"
              >
                <Send className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setSpeechEnabled(!speechEnabled)}
                className={
                  speechEnabled ? "text-herbal-600" : "text-muted-foreground"
                }
              >
                {speechEnabled ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </Button>
            </div>

            <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
              <span>Press Enter to send • Powered by Google AI</span>
              {isListening && (
                <span className="text-red-500 animate-pulse">
                  🎤 Listening...
                </span>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
