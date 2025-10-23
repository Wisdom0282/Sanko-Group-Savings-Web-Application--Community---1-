# Deployment Guide

This guide will help you deploy Sanko to various platforms.

## Prerequisites

- Node.js 16+ installed
- Git installed
- A hosting account (Vercel, Netlify, etc.)

## Building for Production

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

This creates a `dist` folder with optimized production files.

## Deployment Options

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to complete deployment

### Option 2: Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build the project:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy --prod --dir=dist
```

### Option 3: GitHub Pages

1. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/sanko"
}
```

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Add deploy scripts to `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

4. Deploy:
```bash
npm run deploy
```

### Option 4: Traditional Web Server

1. Build the project:
```bash
npm run build
```

2. Upload the contents of the `dist` folder to your web server

3. Configure your server to:
   - Serve `index.html` for all routes (for client-side routing)
   - Set proper MIME types for JavaScript and CSS files
   - Enable gzip compression

#### Nginx Configuration Example:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

#### Apache Configuration (.htaccess):
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

## Environment Variables

This app doesn't require any environment variables as it runs entirely client-side with localStorage.

## Post-Deployment Checklist

- [ ] Test all features in production
- [ ] Verify localStorage works correctly
- [ ] Check responsive design on mobile devices
- [ ] Test browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] Verify all routes work correctly
- [ ] Test data persistence across page reloads
- [ ] Ensure proper error handling

## Performance Optimization

The build is already optimized, but you can further improve performance by:

1. **Enable CDN**: Use a CDN for static assets
2. **Enable Caching**: Set appropriate cache headers
3. **Enable Compression**: Use gzip or brotli compression
4. **Monitor Performance**: Use tools like Lighthouse to check performance

## Troubleshooting

### Issue: Blank page after deployment
- Check browser console for errors
- Verify base URL is set correctly in vite.config.ts
- Ensure all assets are loading correctly

### Issue: Routes return 404
- Configure server to serve index.html for all routes
- Check .htaccess or nginx configuration

### Issue: Data not persisting
- Ensure localStorage is enabled in browser
- Check browser privacy settings
- Verify app is served over HTTPS (for some browsers)

## Support

For issues or questions, please open an issue on the GitHub repository.
