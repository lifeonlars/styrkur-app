"use client"

import React from "react"
import { Textarea as HeroTextarea, TextAreaProps } from "@heroui/input"
import { extendVariants } from "@heroui/system"

const NeumorphicTextarea = extendVariants(HeroTextarea, {
  variants: {
    variant: {
      neumorphic: {
        inputWrapper: [
          "shadow-neu-inset",
          "border-none",
          "bg-gradient-to-br from-content1 to-content2",
          "data-[hover=true]:shadow-neu-inset",
          "data-[focus=true]:shadow-neu-pressed",
          "data-[focus=true]:bg-gradient-to-br data-[focus=true]:from-content2 data-[focus=true]:to-content1",
          "transition-all duration-200 ease-out"
        ],
        input: [
          "bg-transparent",
          "text-foreground",
          "placeholder:text-default-500"
        ]
      },
      "neumorphic-flat": {
        inputWrapper: [
          "shadow-neu-subtle",
          "border-none", 
          "bg-content1",
          "data-[hover=true]:shadow-neu-inset",
          "data-[focus=true]:shadow-neu-pressed",
          "data-[focus=true]:bg-content2",
          "transition-all duration-200 ease-out"
        ],
        input: [
          "bg-transparent",
          "text-foreground",
          "placeholder:text-default-500"
        ]
      }
    }
  },
  defaultVariants: {
    variant: "neumorphic"
  }
})

export type NeumorphicTextareaProps = TextAreaProps & {
  variant?: "neumorphic" | "neumorphic-flat" | "flat" | "bordered" | "faded" | "underlined"
}

export { NeumorphicTextarea as Textarea }