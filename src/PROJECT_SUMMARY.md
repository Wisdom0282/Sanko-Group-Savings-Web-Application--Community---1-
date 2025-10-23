# Sanko - Project Summary

## Quick Reference

**Project Name:** Sanko  
**Version:** 1.0.0  
**Type:** Nigerian Group Savings Web Application  
**Tech Stack:** React, TypeScript, Tailwind CSS  
**Data Storage:** localStorage (client-side only)  

## Project Status

✅ **Production Ready** - Clean codebase ready for deployment to VS Code or any environment

## Key Files & Directories

### Core Application
- `/App.tsx` - Main application component
- `/main.tsx` - Application entry point
- `/index.html` - HTML entry point

### Components (`/components`)
- `Dashboard.tsx` - Overview of all savings groups
- `GroupsView.tsx` - Group list and detailed views
- `PaymentsView.tsx` - Payment history across groups
- `SettingsView.tsx` - App settings and information
- `Navigation.tsx` - Main navigation component
- `CreateGroupDialog.tsx` - Group creation form
- `AddMemberDialog.tsx` - Member addition form
- `AddPaymentDialog.tsx` - Payment recording form

### State Management (`/hooks`)
- `useAppState.ts` - Main application state hook

### Type Definitions (`/types`)
- `index.ts` - TypeScript interfaces and types

### Utilities (`/utils`)
- `currency.ts` - Naira formatting utilities
- `storage.ts` - localStorage persistence
- `sampleData.ts` - Sample data for new users

### Styling (`/styles`)
- `globals.css` - Global styles and CSS variables

### UI Components (`/components/ui`)
- 47+ shadcn/ui components (do not modify)

## Configuration Files

- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite bundler configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `.eslintrc.cjs` - ESLint configuration
- `.gitignore` - Git ignore rules

## Documentation

- `README.md` - Main project documentation
- `Guidelines.md` - Development guidelines
- `DEPLOYMENT.md` - Deployment instructions
- `CHANGELOG.md` - Version history
- `CONTRIBUTING.md` - Contribution guidelines
- `Attributions.md` - Third-party attributions

## Design System

### Colors
- **Primary:** Muted gray (#6b7280)
- **Background:** White (#ffffff)
- **Text:** Dark gray (#374151)
- **Borders:** Light gray (#e5e7eb)
- **Accent:** Blue (#3b82f6)
- **Success:** Green (#10b981)
- **Error:** Red (#ef4444)

### Typography
- **Font:** System UI
- **Headings:** Semibold, 600 weight
- **Body:** Normal, 400 weight

## Features Checklist

✅ Group creation and management  
✅ Member tracking  
✅ Payment recording (contributions, penalties, withdrawals)  
✅ Dashboard with metrics  
✅ Payment history view  
✅ Settings and information  
✅ localStorage persistence  
✅ Sample data for new users  
✅ Responsive design  
✅ Nigerian Naira (₦) currency  
✅ Weekly/Monthly/Quarterly frequencies  
✅ Progress tracking  
✅ Status indicators  
✅ Overdue payment alerts  

## Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Known Files (System/Unused)

These files exist but are not used in the main application:
- `/supabase/functions/server/*` - Legacy Supabase files (can be ignored)
- `/utils/supabase/*` - Legacy Supabase utilities (can be ignored)
- `/guidelines/Guidelines.md` - Duplicate of root Guidelines.md

## Code Quality

✅ TypeScript strict mode enabled  
✅ ESLint configured  
✅ Consistent code style  
✅ Proper type definitions  
✅ Clean component structure  
✅ Reusable utilities  
✅ Responsive design  
✅ Accessibility considered  

## Performance

- Vite for fast builds
- Code splitting enabled
- Optimized production builds
- Minimal bundle size
- localStorage for instant access

## Security

- No backend API calls
- No authentication required
- Data stored locally only
- No PII sent to servers
- Privacy-first approach

## Next Steps for Developers

1. **Clone/Download** the project
2. **Install dependencies**: `npm install`
3. **Start development**: `npm run dev`
4. **Read documentation**: Check README.md and Guidelines.md
5. **Make changes**: Follow CONTRIBUTING.md
6. **Build**: `npm run build` when ready
7. **Deploy**: Follow DEPLOYMENT.md

## Support

For issues or questions:
- Review README.md
- Check Guidelines.md
- See CONTRIBUTING.md
- Open an issue on GitHub

## License

MIT License - See LICENSE file for details

---

**Last Updated:** January 22, 2025  
**Status:** ✅ Production Ready
