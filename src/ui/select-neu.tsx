"use client"

import React from "react"
import { Select as HeroSelect, SelectProps, SelectItem } from "@heroui/select"
import { extendVariants } from "@heroui/system"

const NeumorphicSelect = extendVariants(HeroSelect, {
  variants: {
    variant: {
      neumorphic: {
        trigger: [
          "shadow-neu-inset",
          "border-none",
          "bg-gradient-to-br from-content1 to-content2",
          "data-[hover=true]:shadow-neu-inset",
          "data-[open=true]:shadow-neu-pressed",
          "data-[focus=true]:shadow-neu-pressed",
          "data-[focus=true]:bg-gradient-to-br data-[focus=true]:from-content2 data-[focus=true]:to-content1",
          "transition-all duration-200 ease-out"
        ],
        value: [
          "text-foreground",
          "placeholder:text-default-500"
        ],
        popoverContent: [
          "shadow-neu-card-raised",
          "border-none",
          "bg-gradient-to-br from-content1 to-content2"
        ]
      },
      "neumorphic-flat": {
        trigger: [
          "shadow-neu-subtle",
          "border-none",
          "bg-content1",
          "data-[hover=true]:shadow-neu-inset",
          "data-[open=true]:shadow-neu-pressed",
          "data-[focus=true]:shadow-neu-pressed",
          "data-[focus=true]:bg-content2",
          "transition-all duration-200 ease-out"
        ],
        value: [
          "text-foreground",
          "placeholder:text-default-500"
        ],
        popoverContent: [
          "shadow-neu-card-raised",
          "border-none",
          "bg-content1"
        ]
      }
    }
  },
  defaultVariants: {
    variant: "neumorphic"
  }
})

export type NeumorphicSelectProps = SelectProps & {
  variant?: "neumorphic" | "neumorphic-flat" | "flat" | "bordered" | "faded" | "underlined"
}

export { NeumorphicSelect as Select, SelectItem }