# Styleguide AI Guidelines

## Purpose

Visual consistency tool and regression prevention system for Styrkurheim's neumorphic design system.

## Update Triggers

- **New component created** → Add to `/styleguide/components` first
- **Design pattern changed** → Update styleguide example, then implementation
- **Visual regression found** → Fix styleguide first, then fix code
- **Interaction behavior changed** → Update state demonstrations

## Component Documentation Standards

- **Visual examples only** - No code examples needed
- **All interactive states** - hover, focus, active, disabled, loading
- **Responsive behavior** - Mobile/desktop variations
- **Combination examples** - How depth/surface/border utilities work together
- **Status tracking** - ✅ Ready, 🔄 In Progress, 🔬 Experimental

## Design System Rules

- **Depth utilities**: `depth-sunken`, `depth-flat`, `depth-subtle`, `depth-elevated`
- **Surface gradients**: `surface-concave`, `surface-flat`, `surface-convex`, `surface-gold`
- **Border treatments**: `border-transparent`, `border-neu-subtle`, `border-neu-crisp`, `border-neu-glow`
- **Norse gold only**: For primary actions and brand elements
- **Neumorphic physics**: Concave for sunken, convex for raised

## Organization Rules

- **Components by function**: Forms, Navigation, Display, Feedback
- **Patterns section**: Reserved for workout-specific interfaces only
- **Brand section**: Only for assets existing in `/public` folder
- **No code examples**: Focus on visual demonstrations

## Visual Verification Process

1. **Compare against examples** - Does new component match established patterns?
2. **Test all states** - Are all interactive states properly demonstrated?
3. **Check combinations** - Do utility combinations work as expected?
4. **Verify physics** - Do shadows follow neumorphic physics rules?

## Anti-Patterns to Avoid

- **Don't create new shadows** - Use existing depth utilities
- **Don't mix gradient directions** - Follow concave/convex rules
- **Don't add code examples** - Keep visual-only
- **Don't duplicate components** - Check existing library first

## Documentation Updates

**Update this file when:**

- New component patterns are established
- Design system rules are refined
- Visual regression patterns are discovered
- Styleguide organization improves

**Ask permission before:**

- Changing core design system rules
- Modifying component organization structure
- Adding new sections to styleguide
