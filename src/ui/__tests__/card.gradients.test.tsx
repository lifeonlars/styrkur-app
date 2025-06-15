import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../card'

// Mock CSS modules to return class names
jest.mock('../card.module.css', () => ({
  'card': 'card',
  'card-default': 'card-default',
  'card-elevated': 'card-elevated',
  'card-sunken': 'card-sunken',
  'card-flat': 'card-flat',
  'card-interactive': 'card-interactive',
  'card-gradient': 'card-gradient',
  'card-accent': 'card-accent',
  'card-floating': 'card-floating',
  'card-compact': 'card-compact',
  'card-large': 'card-large',
  'card-full': 'card-full',
  'card-loading': 'card-loading',
  'card-hover-lift': 'card-hover-lift',
  'card-header': 'card-header',
  'card-title': 'card-title',
  'card-description': 'card-description',
  'card-content': 'card-content',
  'card-footer': 'card-footer',
}))

// Mock utils
jest.mock('@/lib/utils', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' ')
}))

describe('Card Gradient Variants', () => {
  describe('Card Variant Classes', () => {
    it('applies default variant class', () => {
      const { container } = render(
        <Card variant="default" data-testid="card">
          <CardContent>Test content</CardContent>
        </Card>
      )

      const card = container.querySelector('[data-testid="card"]')
      expect(card).toHaveClass('card')
      expect(card).toHaveClass('card-default')
    })

    it('applies elevated variant class with enhanced gradient', () => {
      const { container } = render(
        <Card variant="elevated" data-testid="card">
          <CardContent>Elevated content</CardContent>
        </Card>
      )

      const card = container.querySelector('[data-testid="card"]')
      expect(card).toHaveClass('card')
      expect(card).toHaveClass('card-elevated')
    })

    it('applies sunken variant class with inverted gradient', () => {
      const { container } = render(
        <Card variant="sunken" data-testid="card">
          <CardContent>Sunken content</CardContent>
        </Card>
      )

      const card = container.querySelector('[data-testid="card"]')
      expect(card).toHaveClass('card')
      expect(card).toHaveClass('card-sunken')
    })

    it('applies flat variant class with subtle gradient', () => {
      const { container } = render(
        <Card variant="flat" data-testid="card">
          <CardContent>Flat content</CardContent>
        </Card>
      )

      const card = container.querySelector('[data-testid="card"]')
      expect(card).toHaveClass('card')
      expect(card).toHaveClass('card-flat')
    })

    it('applies interactive variant class with enhanced contrast', () => {
      const { container } = render(
        <Card variant="interactive" data-testid="card">
          <CardContent>Interactive content</CardContent>
        </Card>
      )

      const card = container.querySelector('[data-testid="card"]')
      expect(card).toHaveClass('card')
      expect(card).toHaveClass('card-interactive')
    })

    it('applies gradient variant class with multi-layer gradient', () => {
      const { container } = render(
        <Card variant="gradient" data-testid="card">
          <CardContent>Gradient content</CardContent>
        </Card>
      )

      const card = container.querySelector('[data-testid="card"]')
      expect(card).toHaveClass('card')
      expect(card).toHaveClass('card-gradient')
    })

    it('applies accent variant class with Norse gold gradient', () => {
      const { container } = render(
        <Card variant="accent" data-testid="card">
          <CardContent>Accent content</CardContent>
        </Card>
      )

      const card = container.querySelector('[data-testid="card"]')
      expect(card).toHaveClass('card')
      expect(card).toHaveClass('card-accent')
    })

    it('applies floating variant class with maximum elevation', () => {
      const { container } = render(
        <Card variant="floating" data-testid="card">
          <CardContent>Floating content</CardContent>
        </Card>
      )

      const card = container.querySelector('[data-testid="card"]')
      expect(card).toHaveClass('card')
      expect(card).toHaveClass('card-floating')
    })
  })

  describe('Size Variants with Gradients', () => {
    it('applies compact size class while maintaining gradient', () => {
      const { container } = render(
        <Card variant="elevated" size="compact" data-testid="card">
          <CardHeader>
            <CardTitle>Compact Elevated</CardTitle>
            <CardDescription>Compact card with elevated gradient</CardDescription>
          </CardHeader>
          <CardContent>Content</CardContent>
        </Card>
      )

      const card = container.querySelector('[data-testid="card"]')
      expect(card).toHaveClass('card')
      expect(card).toHaveClass('card-elevated')
      expect(card).toHaveClass('card-compact')
    })

    it('applies large size class while maintaining gradient', () => {
      const { container } = render(
        <Card variant="gradient" size="large" data-testid="card">
          <CardHeader>
            <CardTitle>Large Gradient</CardTitle>
            <CardDescription>Large card with multi-layer gradient</CardDescription>
          </CardHeader>
          <CardContent>Content</CardContent>
          <CardFooter>Footer</CardFooter>
        </Card>
      )

      const card = container.querySelector('[data-testid="card"]')
      expect(card).toHaveClass('card')
      expect(card).toHaveClass('card-gradient')
      expect(card).toHaveClass('card-large')
    })
  })

  describe('Card Modifiers with Gradients', () => {
    it('applies fullWidth modifier while maintaining gradient', () => {
      const { container } = render(
        <Card variant="accent" fullWidth data-testid="card">
          <CardContent>Full width accent card</CardContent>
        </Card>
      )

      const card = container.querySelector('[data-testid="card"]')
      expect(card).toHaveClass('card')
      expect(card).toHaveClass('card-accent')
      expect(card).toHaveClass('card-full')
    })

    it('applies hoverLift modifier while maintaining gradient', () => {
      const { container } = render(
        <Card variant="interactive" hoverLift data-testid="card">
          <CardContent>Hover lift interactive card</CardContent>
        </Card>
      )

      const card = container.querySelector('[data-testid="card"]')
      expect(card).toHaveClass('card')
      expect(card).toHaveClass('card-interactive')
      expect(card).toHaveClass('card-hover-lift')
    })

    it('applies loading modifier while maintaining gradient', () => {
      const { container } = render(
        <Card variant="elevated" loading data-testid="card">
          <CardContent>Loading elevated card</CardContent>
        </Card>
      )

      const card = container.querySelector('[data-testid="card"]')
      expect(card).toHaveClass('card')
      expect(card).toHaveClass('card-elevated')
      expect(card).toHaveClass('card-loading')
    })
  })

  describe('Card Content Structure', () => {
    it('renders complete card structure with gradient variant', () => {
      render(
        <Card variant="gradient" data-testid="card">
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
            <CardDescription>Test Description</CardDescription>
          </CardHeader>
          <CardContent>
            Test content with multi-layer gradient background
          </CardContent>
          <CardFooter>
            Test footer
          </CardFooter>
        </Card>
      )

      expect(screen.getByText('Test Title')).toBeInTheDocument()
      expect(screen.getByText('Test Description')).toBeInTheDocument()
      expect(screen.getByText('Test content with multi-layer gradient background')).toBeInTheDocument()
      expect(screen.getByText('Test footer')).toBeInTheDocument()
    })

    it('applies proper classes to card content sections', () => {
      const { container } = render(
        <Card variant="accent">
          <CardHeader data-testid="header">
            <CardTitle data-testid="title">Title</CardTitle>
            <CardDescription data-testid="description">Description</CardDescription>
          </CardHeader>
          <CardContent data-testid="content">Content</CardContent>
          <CardFooter data-testid="footer">Footer</CardFooter>
        </Card>
      )

      expect(container.querySelector('[data-testid="header"]')).toHaveClass('card-header')
      expect(container.querySelector('[data-testid="title"]')).toHaveClass('card-title')
      expect(container.querySelector('[data-testid="description"]')).toHaveClass('card-description')
      expect(container.querySelector('[data-testid="content"]')).toHaveClass('card-content')
      expect(container.querySelector('[data-testid="footer"]')).toHaveClass('card-footer')
    })
  })

  describe('Custom Classes and Props', () => {
    it('accepts custom className while maintaining gradient', () => {
      const { container } = render(
        <Card variant="elevated" className="custom-class" data-testid="card">
          <CardContent>Custom class card</CardContent>
        </Card>
      )

      const card = container.querySelector('[data-testid="card"]')
      expect(card).toHaveClass('card')
      expect(card).toHaveClass('card-elevated')
      expect(card).toHaveClass('custom-class')
    })

    it('forwards additional props to the card element', () => {
      const { container } = render(
        <Card 
          variant="gradient" 
          data-testid="card" 
          data-custom="value"
          aria-label="Custom gradient card"
        >
          <CardContent>Props forwarding test</CardContent>
        </Card>
      )

      const card = container.querySelector('[data-testid="card"]')
      expect(card).toHaveAttribute('data-custom', 'value')
      expect(card).toHaveAttribute('aria-label', 'Custom gradient card')
    })
  })
})