# 🚀 Quick Start Guide - HerbWise

Get HerbWise up and running in 5 minutes!

## 📋 Prerequisites

Before you start, make sure you have:
- Node.js (v18 or higher) - [Download here](https://nodejs.org/)
- npm (comes with Node.js)
- Git - [Download here](https://git-scm.com/)

Check your installations:
```bash
node --version  # Should show v18.x.x or higher
npm --version   # Should show 8.x.x or higher
git --version   # Should show 2.x.x or higher
```

## ⚡ 3-Step Setup

### Step 1: Clone and Install
```bash
# Clone the repository
git clone https://github.com/Chinnu122/Medicinal-Plants.git

# Navigate to the project
cd Medicinal-Plants

# Install dependencies
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Visit: **http://localhost:8080**

That's it! 🎉 You're now running HerbWise locally.

## 🎯 What You Can Do Now

### Explore the App
- **Homepage**: See the welcome screen and featured plants
- **Plants Page**: Browse the medicinal plants database
- **AI Assistant**: Chat with the intelligent plant advisor
- **Search**: Find plants by name, benefits, or uses

### Try These Features
1. **Search for a Plant**
   - Go to Plants page
   - Type "turmeric" in the search bar
   - Click on a plant to see full details

2. **Use Filters**
   - Click "Filters" button
   - Select "Anti-inflammatory" category
   - Sort by availability

3. **Ask the AI**
   - Navigate to AI Assistant
   - Type: "What helps with joint pain?"
   - Get personalized recommendations

4. **Shopping**
   - Add a plant to cart
   - View cart
   - Proceed to checkout

## 🛠️ Development Commands

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Type checking
npm run typecheck

# Format code
npm run format.fix
```

## 📁 Key Files to Know

```
Medicinal-Plants/
├── client/               # Frontend code
│   ├── pages/           # Page components
│   ├── components/      # Reusable components
│   └── data/plants.ts   # Plant database
├── server/              # Backend API
├── README.md            # Full documentation
├── USAGE.md             # User guide
└── package.json         # Dependencies
```

## 🚀 Deploy to Netlify (5 minutes)

1. **Push to GitHub** (if you made changes)
   ```bash
   git add .
   git commit -m "My changes"
   git push
   ```

2. **Deploy**
   - Go to [netlify.com](https://www.netlify.com)
   - Click "Add new site"
   - Import from GitHub
   - Select your repository
   - Click "Deploy"

3. **Done!** Your site is live 🎉

## 🔧 Common Issues

### Port Already in Use
```bash
# If port 8080 is busy, Vite will automatically use 8081
# Or kill the process:
lsof -ti:8080 | xargs kill
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Check for TypeScript errors
npm run typecheck

# Clear dist folder
rm -rf dist
npm run build
```

## 📚 Next Steps

Ready to dive deeper?

1. **Read Full Documentation**
   - [README.md](./README.md) - Complete project overview
   - [USAGE.md](./USAGE.md) - Detailed user guide
   - [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment instructions
   - [PROJECT_INFO.md](./PROJECT_INFO.md) - Project vision and use cases

2. **Customize the App**
   - Add new plants to `client/data/plants.ts`
   - Modify theme in `client/global.css`
   - Create new pages in `client/pages/`

3. **Contribute**
   - Check [Contributing Guidelines](./README.md#contributing)
   - Browse [GitHub Issues](https://github.com/Chinnu122/Medicinal-Plants/issues)
   - Join discussions

## 💡 Pro Tips

- **Hot Reload**: Changes auto-refresh in dev mode
- **Dark Mode**: Toggle in Settings page
- **Responsive**: Test on mobile by resizing browser
- **Type Safety**: Let TypeScript catch errors early
- **Console**: Check browser console for errors

## 🆘 Need Help?

- **Documentation**: Check the README files
- **Issues**: [Report a bug](https://github.com/Chinnu122/Medicinal-Plants/issues)
- **Discussions**: [Ask questions](https://github.com/Chinnu122/Medicinal-Plants/discussions)

## ✅ You're Ready!

You now have HerbWise running locally. Start exploring, learning about medicinal plants, and contributing to make natural healing accessible for everyone!

**Happy Coding! 🌿**

---

*For detailed information, refer to [README.md](./README.md)*
