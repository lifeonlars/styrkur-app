"use client"

import React from "react"
import { Button as HeroButton, ButtonProps } from "@heroui/button"
import { extendVariants } from "@heroui/system"

const NeumorphicButton = extendVariants(HeroButton, {
  variants: {
    variant: {
      neumorphic: {
        base: [
          "shadow-neu-raised",
          "border-none",
          "bg-gradient-to-br from-content2 to-content1",
          "data-[hover=true]:shadow-neu-raised-hover",
          "data-[hover=true]:scale-[1.02]",
          "data-[pressed=true]:shadow-neu-pressed",
          "data-[pressed=true]:scale-[0.98]",
          "data-[pressed=true]:bg-gradient-to-br data-[pressed=true]:from-content1 data-[pressed=true]:to-content2",
          "transition-all duration-200 ease-out"
        ]
      },
      "neumorphic-primary": {
        base: [
          "shadow-neu-raised", 
          "border-none",
          "bg-gradient-to-br from-primary-400 to-primary-600",
          "text-primary-foreground",
          "data-[hover=true]:shadow-neu-raised-hover",
          "data-[hover=true]:scale-[1.02]",
          "data-[hover=true]:from-primary-300 data-[hover=true]:to-primary-500",
          "data-[pressed=true]:shadow-neu-pressed",
          "data-[pressed=true]:scale-[0.98]", 
          "data-[pressed=true]:from-primary-600 data-[pressed=true]:to-primary-400",
          "transition-all duration-200 ease-out"
        ]
      },
      "neumorphic-secondary": {
        base: [
          "shadow-neu-raised",
          "border-none", 
          "bg-gradient-to-br from-content3 to-content2",
          "text-foreground",
          "data-[hover=true]:shadow-neu-raised-hover",
          "data-[hover=true]:scale-[1.02]",
          "data-[pressed=true]:shadow-neu-pressed",
          "data-[pressed=true]:scale-[0.98]",
          "data-[pressed=true]:bg-gradient-to-br data-[pressed=true]:from-content2 data-[pressed=true]:to-content3",
          "transition-all duration-200 ease-out"
        ]
      },
      "neumorphic-flat": {
        base: [
          "shadow-neu-subtle",
          "border-none",
          "bg-content1",
          "data-[hover=true]:shadow-neu-raised",
          "data-[hover=true]:bg-gradient-to-br data-[hover=true]:from-content2 data-[hover=true]:to-content1",
          "data-[pressed=true]:shadow-neu-pressed",
          "data-[pressed=true]:scale-[0.98]",
          "transition-all duration-200 ease-out"
        ]
      }
    }
  },
  defaultVariants: {
    variant: "neumorphic"
  }
})

export type NeumorphicButtonProps = ButtonProps & {
  variant?: "neumorphic" | "neumorphic-primary" | "neumorphic-secondary" | "neumorphic-flat" | "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "ghost"
}

export { NeumorphicButton as Button }