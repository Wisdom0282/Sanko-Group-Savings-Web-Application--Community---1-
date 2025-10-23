# Contributing to Sanko

Thank you for considering contributing to Sanko! This document provides guidelines for contributing to the project.

## Getting Started

1. **Fork the repository**
   - Click the "Fork" button on GitHub
   - Clone your fork locally

2. **Set up your development environment**
   ```bash
   git clone https://github.com/yourusername/sanko.git
   cd sanko
   npm install
   ```

3. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running the App

```bash
npm run dev
```

This starts the development server at `http://localhost:3000`

### Building the App

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## Code Guidelines

### General Principles

1. **Follow the existing code style**
   - Use TypeScript for all new code
   - Follow the project structure
   - Use meaningful variable and function names

2. **Keep it simple**
   - Sanko is designed to be minimal and focused
   - Avoid adding unnecessary complexity
   - Keep components small and focused

3. **Maintain the design system**
   - Use the subtle gray color scheme
   - Follow the spacing and typography guidelines
   - Use shadcn/ui components where possible

### TypeScript

- Define types in `/types/index.ts`
- Avoid using `any`
- Use interfaces for component props
- Add proper type annotations

### React Components

- Use functional components with hooks
- Extract reusable logic into custom hooks
- Keep components focused on single responsibility
- Use meaningful prop names

### Styling

- Use Tailwind CSS classes
- Follow mobile-first responsive design
- Use CSS variables from globals.css
- Avoid hardcoding colors or sizes

### Currency

- Always use the `formatNaira()` utility
- Display amounts in Nigerian Naira (₦)
- Use thousand separators

## Pull Request Process

1. **Update documentation**
   - Update README.md if needed
   - Add comments to complex code
   - Update CHANGELOG.md

2. **Test your changes**
   - Test all user flows
   - Check responsive behavior
   - Verify localStorage persistence
   - Test on multiple browsers

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

   Use conventional commit messages:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation
   - `style:` for formatting changes
   - `refactor:` for code refactoring
   - `test:` for adding tests
   - `chore:` for maintenance tasks

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Provide a clear description of your changes
   - Link any related issues

## What to Contribute

### Good First Issues

- Bug fixes
- Documentation improvements
- UI/UX enhancements
- Accessibility improvements
- Performance optimizations

### Feature Requests

Before working on a major feature:
1. Open an issue to discuss it
2. Wait for feedback from maintainers
3. Ensure it aligns with project goals

### Bug Reports

When reporting bugs, include:
- Description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser and version
- Screenshots if applicable

## Code Review

All submissions require code review. We'll review:
- Code quality and style
- Functionality
- Test coverage
- Documentation
- Performance impact

## Community Guidelines

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow the code of conduct

## Questions?

If you have questions:
- Open an issue for discussion
- Check existing issues and PRs
- Review the documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to Sanko! 🎉
