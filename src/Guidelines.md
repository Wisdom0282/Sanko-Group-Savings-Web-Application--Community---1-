# Sanko Development Guidelines

## Core Principles

### Currency
- **Always use Nigerian Naira (₦)** for all currency formatting
- Format: `₦1,000,000` (with thousand separators)
- Use the `formatNaira()` utility from `/utils/currency.ts`

### Design Philosophy
- Keep components simple and minimal
- Use subtle, muted gray color scheme
- White backgrounds with clean borders
- Avoid bold or vibrant colors except for status indicators
- Focus on functionality over decoration

### Component Structure
- Create reusable components in the `/components` directory
- Use TypeScript for all components
- Follow React best practices and hooks patterns
- Keep business logic in custom hooks (`/hooks`)

### Styling Guidelines
- Use Tailwind CSS for styling
- Rely on CSS variables defined in `/styles/globals.css`
- **Do NOT use** hardcoded Tailwind classes for:
  - Font sizes (let default typography handle it)
  - Font weights (use defaults)
  - Line heights (use defaults)
- Use these CSS variables for consistency:
  - `--background`: Main background color
  - `--foreground`: Primary text color
  - `--primary`: Primary accent color
  - `--secondary`: Secondary/muted backgrounds
  - `--muted`: Muted text color
  - `--border`: Border color
  - `--card`: Card background

### Color Scheme
- **Gray scale**: Primary color scheme
  - Gray-50 to Gray-900 for backgrounds and text
  - White for cards and main backgrounds
- **Accent colors** (use sparingly):
  - Green: For success states and positive metrics
  - Red: For errors, warnings, and overdue statuses
  - Blue: For informational elements
  - Yellow: For warnings and time-sensitive alerts

### Data Management
- All data stored in localStorage
- No backend or external API calls
- Use the storage utilities in `/utils/storage.ts`
- Sample data provided for new users

### State Management
- Use React hooks (useState, useEffect, etc.)
- Custom hook `useAppState` for app-wide state
- No external state management libraries

### Functionality Focus
- Group savings management
- Member tracking
- Payment recording
- Progress visualization
- Complete audit trail

## File Organization

```
/
├── components/          # React components
│   ├── ui/             # shadcn/ui components (do not modify)
│   ├── Dashboard.tsx
│   ├── GroupsView.tsx
│   ├── PaymentsView.tsx
│   ├── SettingsView.tsx
│   └── ...
├── hooks/              # Custom React hooks
├── types/              # TypeScript definitions
├── utils/              # Utility functions
├── styles/             # Global styles
└── App.tsx            # Main app component
```

## Best Practices

### TypeScript
- Define all types in `/types/index.ts`
- Use interfaces for component props
- Avoid `any` type
- Use proper type annotations

### Components
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use meaningful component and prop names
- Add JSDoc comments for complex functions

### Styling
- Mobile-first responsive design
- Use consistent spacing (Tailwind's spacing scale)
- Maintain visual hierarchy
- Ensure good contrast ratios for accessibility

### Performance
- Minimize re-renders with proper React patterns
- Use proper key props for lists
- Optimize expensive calculations with useMemo/useCallback

## Testing

- Test all user flows manually
- Verify localStorage persistence
- Check responsive behavior on different screen sizes
- Test with sample data and empty states

## Common Patterns

### Creating a new component:
```tsx
import { ComponentProps } from '../types';

export const MyComponent = ({ prop1, prop2 }: ComponentProps) => {
  return (
    <div className="bg-white border border-gray-200 p-6">
      {/* Component content */}
    </div>
  );
};
```

### Using currency formatting:
```tsx
import { formatNaira } from '../utils/currency';

const amount = 1000000;
const formatted = formatNaira(amount); // ₦1,000,000
```

### State updates with localStorage:
```tsx
// State is automatically persisted via useAppState hook
const { state, createGroup, addMember } = useAppState();
```

## Maintenance

- Keep dependencies up to date
- Remove unused code and imports
- Follow consistent naming conventions
- Document complex logic with comments
- Maintain type safety throughout

## Nigerian Context

- Design for Nigerian users and currency
- Support common contribution patterns (ajo, esusu)
- Use local date formats (en-NG)
- Consider Nigerian phone number formats
- Use culturally appropriate terminology
