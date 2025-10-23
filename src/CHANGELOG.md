# Changelog

All notable changes to Sanko will be documented in this file.

## [1.0.0] - 2025-01-22

### Initial Release

#### Features
- **Group Management**
  - Create savings groups with custom targets and timelines
  - Set contribution amounts and frequencies (weekly, monthly, quarterly)
  - Track group progress with visual progress bars
  - View detailed group metrics and statistics

- **Member Management**
  - Add members to groups with name and phone number
  - Track individual member contributions
  - Monitor member payment status (active, inactive, overdue)
  - View member contribution history

- **Payment Tracking**
  - Record contributions, penalties, and withdrawals
  - Add optional descriptions to payments
  - View payment history with filters
  - Real-time balance updates

- **Dashboard**
  - Overview of all savings groups
  - Total balance across all groups
  - Active group count
  - Expected monthly contributions
  - Quick access to groups
  - Visual indicators for overdue payments

- **Payments View**
  - Comprehensive payment history
  - Filter by group
  - Statistics (total contributions, payment count, averages)
  - Detailed payment breakdown with member names

- **Settings**
  - App information and version
  - Feature list
  - Data management
  - Clear all data functionality
  - Best practices guide

#### Technical Features
- **Local Storage Persistence**
  - All data stored locally in browser
  - No backend required
  - Privacy-first approach
  - Automatic state synchronization

- **Responsive Design**
  - Mobile-first approach
  - Works on all screen sizes
  - Touch-friendly interface
  - Optimized for Nigerian users

- **Design System**
  - Subtle, minimal design
  - Muted gray color scheme
  - Clean white backgrounds
  - Consistent spacing and typography

#### Developer Features
- TypeScript for type safety
- React hooks for state management
- Custom hooks for business logic
- shadcn/ui component library
- Tailwind CSS for styling
- ESLint for code quality
- Vite for fast builds

### Known Limitations
- Data is device-specific (not synced across devices)
- No cloud backup
- No authentication/authorization
- Single-user focused
- Requires modern browser with localStorage support

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

### Future Considerations
- Data export/import functionality
- PDF report generation
- Push notifications for due payments
- Multi-currency support
- Cloud sync option
- Mobile app version
