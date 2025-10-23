# Sanko - Nigerian Group Savings Application

A modern web application for managing group savings and contributions, designed specifically for Nigerian users.

## Features

- **Group Management**: Create and manage multiple savings groups
- **Member Tracking**: Add members and track their contributions
- **Payment Recording**: Record contributions, penalties, and withdrawals
- **Progress Monitoring**: Visual progress tracking with completion percentages
- **Flexible Schedules**: Support for weekly, monthly, and quarterly contributions
- **Complete Audit Trail**: Full transaction history for transparency
- **Local Storage**: All data stored securely in your browser

## Technology Stack

- **React** - UI framework
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **localStorage** - Data persistence

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd sanko
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

### Creating a Group

1. Navigate to the Groups tab
2. Click "Create Group"
3. Fill in the group details:
   - Group name and description
   - Target amount and contribution amount
   - Contribution frequency (weekly/monthly/quarterly)
   - Start and end dates
4. Click "Create Group"

### Adding Members

1. Select a group from the Groups view
2. Click "Add Member"
3. Enter member name and phone number
4. Click "Add Member"

### Recording Payments

1. Select a group from the Groups view
2. Click "Record Payment"
3. Select the member and payment type
4. Enter the amount and optional description
5. Click "Record Payment"

## Project Structure

```
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── Dashboard.tsx    # Dashboard view
│   ├── GroupsView.tsx   # Groups management
│   ├── PaymentsView.tsx # Payment history
│   ├── SettingsView.tsx # App settings
│   └── ...              # Other components
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── styles/              # Global styles
└── App.tsx             # Main application component
```

## Key Components

- **Dashboard**: Overview of all savings groups and key metrics
- **GroupsView**: List and detailed views of savings groups
- **PaymentsView**: Complete payment history across all groups
- **SettingsView**: Application information and data management

## Data Management

All application data is stored locally in your browser using localStorage. This means:

- ✅ Complete privacy - no data sent to external servers
- ✅ Instant access - no login required
- ✅ Full control over your data
- ⚠️ Data is device-specific - not synced across devices
- ⚠️ Clearing browser data will delete all information

### Backing Up Data

To backup your data:
1. Use browser developer tools to export localStorage
2. Or use the app's data export feature (if implemented)

### Clearing Data

To clear all application data:
1. Go to Settings
2. Scroll to "Danger Zone"
3. Click "Clear All Data"
4. Confirm the action

## Design System

Sanko uses a minimal, subtle design with:
- Muted gray color scheme
- Clean white backgrounds
- Simple, functional styling
- Consistent spacing and typography

## Currency Format

All amounts are displayed in Nigerian Naira (₦) using the format:
```
₦1,000,000 (One million Naira)
```

## Contributing

Contributions are welcome! Please follow these guidelines:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues or questions, please open an issue on the GitHub repository.

## Acknowledgments

- Built with React and TypeScript
- UI components from shadcn/ui
- Icons from Lucide React
