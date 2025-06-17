# Development Tools & Cache Management

This document outlines tools and commands to improve the development experience and resolve common cache/HMR issues.

## Quick Commands

### Basic Development
```bash
npm run dev          # Standard development server
npm run dev:clean    # Clean cache and start fresh
npm run dev:turbo    # Use Next.js Turbo mode (experimental)
./dev-reset.sh       # Full reset script (recommended for cache issues)
```

### Cache Management
```bash
npm run clean        # Remove all cache directories
rm -rf .next         # Remove Next.js cache only
rm -rf node_modules/.cache  # Remove Node.js cache only
```

## Common Issues & Solutions

### 1. CSS/JavaScript 404 Errors (with ?v parameter)
**Symptoms**: Files like `main-app.js?v=1234` return 404 errors after making changes

**Solutions**:
1. **Quick fix**: Use `./dev-reset.sh` to fully reset the development server
2. **Alternative**: Run `npm run dev:clean` to clear cache and restart
3. **Nuclear option**: `npm run clean && npm install && npm run dev`

### 2. Hot Module Replacement Not Working
**Symptoms**: Changes not reflected in browser, need manual refresh

**Solutions**:
1. Check if any errors in browser console or terminal
2. Try `npm run dev:turbo` for faster HMR (experimental)
3. Use `./dev-reset.sh` to clear all caches

### 3. TypeScript/CSS Module Changes Not Detected
**Symptoms**: New CSS classes or TypeScript types not recognized

**Solutions**:
1. Clear TypeScript build info: `rm tsconfig.tsbuildinfo`
2. Use `npm run dev:clean` to restart with fresh cache
3. For persistent issues, try `./dev-reset.sh`

## Configuration Changes Made

### Next.js Config Improvements
- Disabled aggressive caching in development mode
- Improved CSS hot reloading configuration
- Better chunk splitting for development

### Environment Variables
- Added `.env.local` with development optimizations
- Disabled telemetry for faster startup
- Enabled verbose cache debugging

### New Scripts
- `dev:clean` - Clean start with cache clearing
- `dev:turbo` - Use experimental Turbo mode
- `dev:debug` - Development with debugging enabled
- `clean` - Remove all cache directories

## Performance Tips

1. **Use `./dev-reset.sh`** when experiencing any cache-related issues
2. **Monitor memory usage** - if Node.js process grows too large, restart
3. **Keep .next directory small** - regular cleaning helps performance
4. **Use Turbo mode sparingly** - it's experimental and may have issues

## Troubleshooting Workflow

1. **First try**: Refresh browser and check console for errors
2. **Cache issue suspected**: Run `./dev-reset.sh`
3. **Still broken**: Check if recent changes broke something
4. **Nuclear option**: `rm -rf node_modules && npm install && ./dev-reset.sh`

---

**Note**: These improvements should significantly reduce the need for manual server restarts when making changes to CSS modules, components, or configuration files.