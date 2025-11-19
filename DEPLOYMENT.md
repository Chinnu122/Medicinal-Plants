# 🚀 HerbWise Deployment Guide

This guide provides detailed instructions for deploying HerbWise to production.

## Table of Contents
- [Netlify Deployment (Recommended)](#netlify-deployment-recommended)
- [Alternative Deployment Options](#alternative-deployment-options)
- [Environment Variables](#environment-variables)
- [Post-Deployment Checklist](#post-deployment-checklist)
- [Troubleshooting](#troubleshooting)

## Netlify Deployment (Recommended)

HerbWise is optimized for deployment on Netlify with pre-configured settings.

### Prerequisites
- GitHub account with repository access
- Netlify account (free tier available at [netlify.com](https://www.netlify.com))

### Step-by-Step Deployment

#### 1. Prepare Your Repository

Ensure your code is pushed to GitHub:
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

#### 2. Connect to Netlify

**Option A: Deploy via Netlify Dashboard**

1. Log in to [Netlify](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"GitHub"** as your Git provider
4. Authorize Netlify to access your GitHub account
5. Select the `Medicinal-Plants` repository
6. Netlify will auto-detect the configuration from `netlify.toml`

**Option B: Deploy via Netlify CLI**

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Follow the prompts to connect your repository
```

#### 3. Verify Build Settings

Netlify should auto-configure these settings from `netlify.toml`:

- **Build command**: `npm run build:client`
- **Publish directory**: `dist/spa`
- **Functions directory**: `netlify/functions`

If not auto-detected, configure manually in the Netlify dashboard:
1. Go to **Site settings** → **Build & deploy**
2. Under **Build settings**, click **Edit settings**
3. Set the values as shown above

#### 4. Configure Environment Variables (Optional)

If your application uses environment variables:

1. In Netlify dashboard, go to **Site settings** → **Environment variables**
2. Click **Add a variable**
3. Add any required variables (e.g., API keys)

Common environment variables:
```
VITE_APP_NAME=HerbWise
VITE_API_URL=https://your-site.netlify.app
```

#### 5. Deploy

**First Deployment:**
- Click **Deploy site** in Netlify dashboard
- Netlify will build and deploy your site
- You'll receive a temporary URL like `random-name-123456.netlify.app`

**Subsequent Deployments:**
- Automatically triggered on every push to main branch
- Pull requests get preview deployments

#### 6. Custom Domain (Optional)

To use a custom domain:

1. In Netlify dashboard, go to **Domain settings**
2. Click **Add custom domain**
3. Follow instructions to configure DNS
4. Netlify provides free HTTPS certificates

### Netlify Configuration Explained

The `netlify.toml` file in the repository contains:

```toml
[build]
  command = "npm run build:client"
  functions = "netlify/functions"
  publish = "dist/spa"

[functions]
  external_node_modules = ["express"]
  node_bundler = "esbuild"
  
[[redirects]]
  force = true
  from = "/api/*"
  status = 200
  to = "/.netlify/functions/api/:splat"
```

**What this does:**
- Builds the React frontend
- Sets up serverless functions for API routes
- Redirects `/api/*` requests to serverless functions
- Ensures SPA routing works correctly

### Continuous Deployment

Once connected, Netlify automatically:
- ✅ Builds on every commit to main branch
- ✅ Creates preview deployments for pull requests
- ✅ Runs build checks before deployment
- ✅ Provides deploy logs for debugging

### Monitoring Deployment

**Check Build Status:**
1. Go to **Deploys** tab in Netlify dashboard
2. View build logs by clicking on a deployment
3. See success/failure status

**View Live Site:**
- Click **"Open production deploy"** or
- Visit your site URL

## Alternative Deployment Options

### Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Configure**
   - Framework Preset: Vite
   - Build Command: `npm run build:client`
   - Output Directory: `dist/spa`

### Traditional VPS/Server

For deployment on your own server:

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set up server**
   ```bash
   # Install Node.js on your server
   # Transfer built files to server
   scp -r dist/ user@server:/path/to/app/
   ```

3. **Run production server**
   ```bash
   cd /path/to/app
   npm install --production
   node dist/server/node-build.mjs
   ```

4. **Set up process manager (PM2)**
   ```bash
   npm install -g pm2
   pm2 start dist/server/node-build.mjs --name herbwise
   pm2 save
   pm2 startup
   ```

5. **Configure reverse proxy (Nginx)**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   
   COPY package*.json ./
   RUN npm ci --only=production
   
   COPY dist ./dist
   
   EXPOSE 3000
   
   CMD ["node", "dist/server/node-build.mjs"]
   ```

2. **Build and run**
   ```bash
   docker build -t herbwise .
   docker run -p 3000:3000 herbwise
   ```

## Environment Variables

### Required Variables

None required for basic deployment.

### Optional Variables

Create a `.env` file (not committed to git):

```env
# Application Settings
VITE_APP_NAME=HerbWise
VITE_APP_VERSION=1.0.0

# API Configuration
VITE_API_URL=https://your-api.com

# Feature Flags
VITE_ENABLE_AI_ASSISTANT=true
VITE_ENABLE_SHOPPING_CART=true

# Analytics (if using)
VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X

# Server Settings (for VPS deployment)
PORT=3000
NODE_ENV=production
```

### Setting in Netlify

1. Navigate to **Site settings** → **Environment variables**
2. Add each variable with its value
3. Variables starting with `VITE_` are accessible in frontend code

## Post-Deployment Checklist

After deploying, verify:

- [ ] **Homepage loads correctly**
  - Visit your site URL
  - Check for any errors in browser console

- [ ] **Navigation works**
  - Test all menu items
  - Verify routing (Plants, AI Assistant, etc.)

- [ ] **Search functionality**
  - Try searching for plants
  - Test filters

- [ ] **API endpoints**
  - Check `/api/ping` endpoint
  - Verify API responses

- [ ] **Responsive design**
  - Test on mobile device
  - Try different screen sizes

- [ ] **Performance**
  - Run Lighthouse audit
  - Check page load times

- [ ] **SSL Certificate**
  - Verify HTTPS is working
  - Check for security warnings

- [ ] **Error handling**
  - Try accessing non-existent routes
  - Verify 404 page shows

## Performance Optimization

### Build Optimization

The application is already optimized with:
- Code splitting
- Tree shaking
- Minification
- Asset optimization

### Additional Optimizations

1. **Enable Caching**
   - Netlify automatically sets cache headers
   - CDN caching for static assets

2. **Image Optimization**
   - Images are loaded from Unsplash CDN
   - Consider adding lazy loading for more images

3. **Bundle Analysis**
   ```bash
   npm run build -- --mode analyze
   ```

## Troubleshooting

### Build Failures

**Issue**: Build fails with module errors
```
Solution:
1. Clear node_modules: rm -rf node_modules
2. Clear npm cache: npm cache clean --force
3. Reinstall: npm install
4. Try building locally: npm run build
```

**Issue**: TypeScript errors during build
```
Solution:
1. Run type check: npm run typecheck
2. Fix reported errors
3. Commit and push fixes
```

### Deployment Issues

**Issue**: Site deploys but shows blank page
```
Solution:
1. Check browser console for errors
2. Verify build output in dist/spa/
3. Check Netlify function logs
4. Ensure all routes are configured in netlify.toml
```

**Issue**: API routes return 404
```
Solution:
1. Verify redirects in netlify.toml
2. Check function deployment in Netlify dashboard
3. Review function logs for errors
4. Test API endpoint: curl https://your-site.netlify.app/api/ping
```

**Issue**: Environment variables not working
```
Solution:
1. Ensure variables start with VITE_ for frontend access
2. Redeploy after adding variables
3. Check variable names match exactly
```

### Performance Issues

**Issue**: Slow page loads
```
Solution:
1. Enable Netlify's CDN features
2. Optimize images (use WebP format)
3. Enable compression
4. Consider lazy loading routes
```

**Issue**: Large bundle size
```
Solution:
1. Analyze bundle: npm run build -- --mode analyze
2. Use dynamic imports for large components
3. Remove unused dependencies
```

## Monitoring and Maintenance

### Analytics

Set up monitoring with:
- **Netlify Analytics**: Built-in traffic monitoring
- **Google Analytics**: User behavior tracking
- **Sentry**: Error tracking
- **Lighthouse CI**: Performance monitoring

### Regular Updates

```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

### Backup Strategy

1. **Code**: Backed up in Git repository
2. **Database**: If added, set up automated backups
3. **Environment Variables**: Document in secure location

## Support

For deployment issues:
- 📧 Email: support@herbwise.com
- 💬 GitHub Issues: [Report an issue](https://github.com/Chinnu122/Medicinal-Plants/issues)
- 📚 Netlify Docs: [docs.netlify.com](https://docs.netlify.com)

---

**Deployment made easy! 🚀**

*Your HerbWise application is now accessible to users worldwide, bringing natural healing knowledge to everyone.*
