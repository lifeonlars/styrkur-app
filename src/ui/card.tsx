import * as React from "react"
import { Card as HeroUICard, CardHeader as HeroUICardHeader, CardBody, CardFooter as HeroUICardFooter } from "@heroui/card"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<HTMLDivElement, any>(({ className, ...props }, ref) => (
  <HeroUICard
    ref={ref}
    className={cn(className)}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, any>(({ className, ...props }, ref) => (
  <HeroUICardHeader className={cn("flex flex-col space-y-1.5", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-default-500", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, any>(({ className, ...props }, ref) => (
  <CardBody className={cn(className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, any>(({ className, ...props }, ref) => (
  <HeroUICardFooter
    className={cn("flex items-center", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }