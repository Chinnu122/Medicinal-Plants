# 🌿 HerbWise - Medicinal Plants Database

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Netlify Status](https://img.shields.io/badge/Netlify-Ready-00C7B7?logo=netlify)](https://www.netlify.com/)

A comprehensive, AI-powered web application for exploring and learning about medicinal plants. HerbWise combines ancient herbal wisdom with modern technology to make natural healing accessible and affordable for everyone.

## 🌐 Live Demo

🔗 **[View Live Website](https://your-site-name.netlify.app)** *(Update this URL after deploying to Netlify)*

> **Note**: After deploying to Netlify, update the URL above with your actual Netlify site URL.

![HerbWise Banner](https://images.unsplash.com/photo-1628260412297-a3377e45006f?w=1200&h=300&fit=crop)

## 🌟 Features

### 📚 Comprehensive Plant Database
- **100+ Medicinal Plants**: Detailed information about herbs and medicinal plants
- **Rich Plant Profiles**: Scientific names, benefits, uses, preparation methods, and precautions
- **Cost Information**: Pricing for fresh, dried, and supplement forms
- **Availability Status**: Common, moderate, or rare availability indicators
- **Growing Difficulty**: Easy-to-understand difficulty ratings for cultivation

### 🔍 Advanced Search & Filtering
- **Intelligent Search**: Search by plant name, scientific name, benefits, or uses
- **Multi-Filter System**: Filter by category, availability, difficulty, and more
- **Sort Options**: Sort by name, scientific name, availability, or difficulty
- **Grid/List Views**: Toggle between grid and list display modes

### 🤖 AI-Powered Assistant
- **Personalized Recommendations**: Get plant suggestions based on your health needs
- **Interactive Chat**: Ask questions and receive expert-verified information
- **Natural Language**: Communicate naturally with the AI assistant
- **Voice Support**: Speech recognition and text-to-speech capabilities

### 🛒 E-Commerce Features
- **Shopping Cart**: Add plants to cart for purchase
- **Checkout System**: Streamlined ordering process
- **Order Tracking**: View order history and status
- **Multiple Product Forms**: Choose from fresh, dried, or supplement options

### 🎨 Modern User Interface
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark Mode**: Eye-friendly dark theme option
- **Smooth Animations**: Framer Motion-powered transitions
- **Beautiful UI Components**: Built with Radix UI and Tailwind CSS
- **Accessibility**: WCAG compliant with keyboard navigation support

### 👤 User Management
- **Authentication**: Secure sign-up and sign-in functionality
- **User Settings**: Customize your experience
- **Profile Management**: Manage personal information and preferences

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern UI library with hooks
- **TypeScript**: Type-safe development
- **React Router 6**: SPA routing with browser history
- **Vite**: Lightning-fast build tool and dev server
- **Tailwind CSS 3**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library

### Backend
- **Express**: Fast, minimalist web framework
- **Node.js**: JavaScript runtime
- **Zod**: TypeScript-first schema validation

### Development Tools
- **Vitest**: Fast unit testing framework
- **Prettier**: Code formatting
- **TypeScript Compiler**: Type checking
- **SWC**: Super-fast JavaScript/TypeScript compiler

### Deployment
- **Netlify**: Serverless deployment platform
- **Netlify Functions**: Serverless API endpoints

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Quick Start

See [QUICK_START.md](./QUICK_START.md) for a 5-minute setup guide!

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Chinnu122/Medicinal-Plants.git
   cd Medicinal-Plants
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file (if needed for API keys)
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will open at `http://localhost:8080`

## 🚀 Usage

### Development Commands

```bash
# Start development server (hot reload enabled)
npm run dev

# Build for production
npm run build

# Build client only
npm run build:client

# Build server only
npm run build:server

# Start production server
npm start

# Run tests
npm test

# Type checking
npm run typecheck

# Format code
npm run format.fix
```

### Project Structure

```
Medicinal-Plants/
├── client/                    # Frontend React application
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # Radix UI components
│   │   ├── Layout.tsx       # Main layout wrapper
│   │   └── IntroScreen.tsx  # Welcome screen
│   ├── contexts/            # React context providers
│   ├── data/                # Plant data and constants
│   │   ├── plants.ts        # Main plant database
│   │   └── extendedPlants.ts # Extended plant information
│   ├── pages/               # Route components
│   │   ├── Index.tsx        # Home page
│   │   ├── Plants.tsx       # Plant catalog
│   │   ├── PlantDetail.tsx  # Individual plant details
│   │   ├── AIAssistant.tsx  # AI chat interface
│   │   ├── Cart.tsx         # Shopping cart
│   │   ├── Checkout.tsx     # Checkout process
│   │   ├── Orders.tsx       # Order history
│   │   └── Settings.tsx     # User settings
│   ├── App.tsx              # App entry point and routing
│   └── global.css           # Global styles and theme
├── server/                   # Backend Express server
│   ├── routes/              # API route handlers
│   └── index.ts             # Server configuration
├── shared/                   # Shared TypeScript types
│   └── api.ts               # API interfaces
├── public/                   # Static assets
├── netlify/                  # Netlify deployment config
│   └── functions/           # Serverless functions
├── package.json             # Dependencies and scripts
├── vite.config.ts           # Vite configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## 🌐 Deployment

### Netlify Deployment (Recommended)

This project is configured for easy deployment on Netlify:

1. **Connect to Netlify**
   - Push your code to GitHub
   - Import the repository in Netlify
   - Netlify will auto-detect the configuration

2. **Build Settings** (auto-configured via `netlify.toml`)
   - Build command: `npm run build:client`
   - Publish directory: `dist/spa`
   - Functions directory: `netlify/functions`

3. **Environment Variables** (if needed)
   - Add any required environment variables in Netlify dashboard

4. **Deploy**
   - Netlify will automatically deploy on every push to main branch
   - Preview deployments for pull requests

### Manual Deployment

For other platforms:

```bash
# Build the application
npm run build

# The built files will be in:
# - dist/spa/ (frontend static files)
# - dist/server/ (backend server files)

# Deploy static files from dist/spa/ to your hosting provider
# Deploy server files and run: node dist/server/node-build.mjs
```

## 🎯 Use Cases

### For Individuals
- **Natural Health Enthusiasts**: Discover affordable, natural remedies for common ailments
- **Gardeners**: Learn which medicinal plants to grow at home
- **Students**: Research medicinal plants for educational purposes
- **Health-Conscious Users**: Find alternatives to conventional medicine

### For Professionals
- **Herbalists**: Access a comprehensive database of medicinal plants
- **Naturopaths**: Recommend appropriate plants to patients
- **Pharmacists**: Learn about herbal alternatives and interactions
- **Researchers**: Study traditional medicinal plant uses

### For Businesses
- **Health Food Stores**: Educate customers about products
- **Herbal Product Manufacturers**: Source plant information
- **Wellness Centers**: Provide resources to clients

## 🔒 Security & Privacy

- User authentication with secure password handling
- Data validation using Zod schemas
- HTTPS encryption in production
- No storage of sensitive payment information
- Privacy-first approach to user data

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed
4. **Commit your changes**
   ```bash
   git commit -m "Add: description of your changes"
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request**

### Development Guidelines
- Write clean, readable code
- Follow TypeScript best practices
- Use existing UI components from the library
- Ensure responsive design
- Add appropriate comments for complex logic
- Test your changes thoroughly

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📖 Documentation

- **[Quick Start Guide](./QUICK_START.md)** - Get started in 5 minutes
- **[Usage Guide](./USAGE.md)** - Comprehensive user manual
- **[Deployment Guide](./DEPLOYMENT.md)** - Deploy to production
- **[Project Information](./PROJECT_INFO.md)** - Vision, use cases, and roadmap

## 🙏 Acknowledgments

- **Medicinal Plant Data**: Sourced from traditional herbalism knowledge and scientific research
- **Images**: Unsplash for high-quality plant photography
- **Icons**: Lucide React icon library
- **UI Components**: Radix UI for accessible components

## 📞 Support

- **Issues**: Report bugs or request features via [GitHub Issues](https://github.com/Chinnu122/Medicinal-Plants/issues)
- **Discussions**: Join conversations in [GitHub Discussions](https://github.com/Chinnu122/Medicinal-Plants/discussions)

## 🌱 Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Offline mode (PWA)
- [ ] User-contributed plant information
- [ ] Advanced AI diagnostics
- [ ] Integration with local herbal suppliers
- [ ] Multi-language support
- [ ] Community forum
- [ ] Video tutorials and guides
- [ ] Plant identification via image recognition

## 📊 Project Status

🟢 **Active Development** - This project is actively maintained and regularly updated with new features and improvements.

---

Made with ❤️ for natural health enthusiasts worldwide

**Happy Healing! 🌿**
