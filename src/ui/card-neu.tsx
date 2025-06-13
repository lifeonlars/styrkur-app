"use client"

import React from "react"
import { Card as HeroCard, CardProps, CardBody, CardHeader, CardFooter } from "@heroui/card"
import { extendVariants } from "@heroui/system"

const NeumorphicCard = extendVariants(HeroCard, {
  variants: {
    variant: {
      neumorphic: {
        base: [
          "shadow-neu-card-raised",
          "border-none",
          "bg-gradient-to-br from-content1 to-content2",
          "data-[hover=true]:shadow-neu-raised-hover",
          "data-[hover=true]:scale-[1.01]",
          "transition-all duration-300 ease-out"
        ]
      },
      "neumorphic-sunken": {
        base: [
          "shadow-neu-card-sunken", 
          "border-none",
          "bg-gradient-to-br from-content2 to-content1",
          "data-[hover=true]:shadow-neu-inset",
          "transition-all duration-300 ease-out"
        ]
      },
      "neumorphic-flat": {
        base: [
          "shadow-neu-subtle",
          "border-none",
          "bg-content1",
          "data-[hover=true]:shadow-neu-raised",
          "data-[hover=true]:bg-gradient-to-br data-[hover=true]:from-content1 data-[hover=true]:to-content2",
          "transition-all duration-300 ease-out"
        ]
      },
      "neumorphic-elevated": {
        base: [
          "shadow-neu-card-raised",
          "border-none",
          "bg-gradient-to-br from-content2 to-content3",
          "data-[hover=true]:shadow-neu-raised-hover",
          "data-[hover=true]:scale-[1.02]",
          "data-[hover=true]:from-content1 data-[hover=true]:to-content2",
          "transition-all duration-300 ease-out"
        ]
      }
    }
  },
  defaultVariants: {
    variant: "neumorphic"
  }
})

export type NeumorphicCardProps = CardProps & {
  variant?: "neumorphic" | "neumorphic-sunken" | "neumorphic-flat" | "neumorphic-elevated" | "shadow" | "bordered" | "flat"
}

export { NeumorphicCard as Card, CardBody, CardHeader, CardFooter }