import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  Search, 
  MessageCircle, 
  Star, 
  TrendingUp, 
  ShieldCheck,
  Users,
  ArrowRight,
  Sparkles,
  Heart,
  Brain,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { medicinalPlants } from '@/data/plants';

export default function Index() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const featuredPlants = medicinalPlants.slice(0, 6);
  
  const stats = [
    { label: 'Medicinal Plants', value: '100+', icon: Leaf },
    { label: 'Happy Users', value: '10K+', icon: Users },
    { label: 'Success Rate', value: '95%', icon: TrendingUp },
    { label: 'Expert Verified', value: '100%', icon: ShieldCheck },
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Natural Healing',
      description: 'Discover the power of nature with time-tested medicinal plants and herbs.',
      color: 'text-red-500'
    },
    {
      icon: Brain,
      title: 'AI-Powered Guidance',
      description: 'Get personalized recommendations from our intelligent plant assistant.',
      color: 'text-blue-500'
    },
    {
      icon: Activity,
      title: 'Affordable Wellness',
      description: 'Access premium natural remedies at minimal costs for everyone.',
      color: 'text-green-500'
    },
    {
      icon: ShieldCheck,
      title: 'Expert Verified',
      description: 'All information is verified by herbalists and medical professionals.',
      color: 'text-purple-500'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Wellness Enthusiast',
      content: 'HerbWise helped me find affordable natural remedies for my chronic pain. The AI assistant is incredibly helpful!',
      rating: 5
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Herbalist',
      content: 'The most comprehensive medicinal plant database I\'ve ever used. Perfect for both beginners and professionals.',
      rating: 5
    },
    {
      name: 'Emma Rodriguez',
      role: 'Naturopath',
      content: 'Amazing resource! The cost-effective recommendations have helped many of my patients access natural healing.',
      rating: 5
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-herbal-50 via-nature-100 to-earth-50 dark:from-herbal-900 dark:via-nature-800 dark:to-earth-800">
        <div className="absolute inset-0">
          <div className={"absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23059669\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"}></div>
        </div>
        
        <div className="relative container mx-auto px-6 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start space-x-2 mb-6">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <span className="text-herbal-600 dark:text-herbal-400 font-medium">
                  AI-Powered Natural Healing
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-herbal-600 via-nature-700 to-earth-600 bg-clip-text text-transparent">
                  Discover Nature's
                </span>
                <br />
                <span className="text-foreground">Medicine Cabinet</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Access 100+ medicinal plants with detailed guides, affordable sourcing, and AI-powered recommendations for natural wellness solutions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="bg-herbal-600 hover:bg-herbal-700">
                  <Link to="/plants">
                    <Leaf className="w-5 h-5 mr-2" />
                    Explore Plants
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg">
                  <Link to="/assistant">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    AI Assistant
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {featuredPlants.slice(0, 4).map((plant, index) => (
                  <motion.div
                    key={plant.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="w-full h-24 object-cover rounded-lg mb-2"
                    />
                    <h3 className="font-semibold text-sm">{plant.name}</h3>
                    <p className="text-xs text-muted-foreground">{plant.category[0]}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-herbal-100 dark:bg-herbal-800 rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-herbal-600 dark:text-herbal-400" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-herbal-600">HerbWise</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Combining ancient wisdom with modern technology for accessible natural healing.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-background mx-auto mb-4 ${benefit.color}`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {benefit.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Plants */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Popular Medicinal Plants
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover some of our most effective and affordable natural remedies.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPlants.map((plant, index) => (
              <motion.div
                key={plant.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="relative">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-herbal-600 hover:bg-herbal-600">
                      {plant.availability}
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{plant.name}</CardTitle>
                        <CardDescription className="italic">
                          {plant.scientificName}
                        </CardDescription>
                      </div>
                      <span className="text-sm font-semibold text-herbal-600">
                        {plant.cost.dried}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {plant.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {plant.benefits.slice(0, 3).map((benefit) => (
                        <Badge key={benefit} variant="secondary" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="ghost" className="w-full group">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link to="/plants">
                View All Plants
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands who've transformed their health naturally.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Card className="border-0 shadow-lg">
                <CardContent className="pt-8">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-xl italic mb-6">
                    "{testimonials[currentTestimonial].content}"
                  </blockquote>
                  <div>
                    <div className="font-semibold">{testimonials[currentTestimonial].name}</div>
                    <div className="text-muted-foreground">{testimonials[currentTestimonial].role}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-herbal-600' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-herbal-600 to-nature-700">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start Your Natural Healing Journey
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get instant access to our AI assistant and comprehensive plant database. 
              Begin your path to affordable, natural wellness today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/search">
                  <Search className="w-5 h-5 mr-2" />
                  Find Your Plant
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-herbal-600">
                <Link to="/assistant">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Ask AI Assistant
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
