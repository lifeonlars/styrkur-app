'use client'

import React, { useState } from 'react'
import { Button } from '@heroui/button'
import { Input, Textarea } from '@heroui/input'
import { Select, SelectItem } from '@heroui/select'
import { Card, CardBody, CardHeader } from '@heroui/card'

export default function NeumorphicTest() {
  const [inputValue, setInputValue] = useState('')
  const [textareaValue, setTextareaValue] = useState('')
  const [selectValue, setSelectValue] = useState('')

  return (
    <div className="p-8 space-y-8 min-h-screen bg-background">
      <h1 className="text-3xl font-heading font-bold text-foreground mb-8">
        Neumorphic Design System Test
      </h1>

      {/* Button Variants */}
      <Card className="shadow-neu-card-raised bg-gradient-to-br from-content1 to-content2 border-none p-6">
        <CardHeader>
          <h2 className="text-xl font-semibold text-foreground">Button Variants</h2>
        </CardHeader>
        <CardBody>
          <div className="flex flex-wrap gap-4">
            <Button className="shadow-neu-raised bg-gradient-to-br from-content2 to-content1 border-none hover:shadow-neu-raised-hover hover:scale-105 active:shadow-neu-pressed active:scale-95 transition-all duration-200">
              Neumorphic
            </Button>
            <Button className="shadow-neu-raised bg-gradient-to-br from-primary-400 to-primary-600 text-primary-foreground border-none hover:shadow-neu-raised-hover hover:scale-105 active:shadow-neu-pressed active:scale-95 transition-all duration-200">
              Primary
            </Button>
            <Button className="shadow-neu-raised bg-gradient-to-br from-content3 to-content2 border-none hover:shadow-neu-raised-hover hover:scale-105 active:shadow-neu-pressed active:scale-95 transition-all duration-200">
              Secondary
            </Button>
            <Button className="shadow-neu-subtle bg-content1 border-none hover:shadow-neu-raised hover:bg-gradient-to-br hover:from-content2 hover:to-content1 active:shadow-neu-pressed active:scale-95 transition-all duration-200">
              Flat
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Input Variants */}
      <Card className="shadow-neu-card-raised bg-gradient-to-br from-content1 to-content2 border-none p-6">
        <CardHeader>
          <h2 className="text-xl font-semibold text-foreground">Input Variants</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4 max-w-md">
            <Input 
              classNames={{
                inputWrapper: "shadow-neu-inset border-none bg-gradient-to-br from-content1 to-content2 data-[hover=true]:shadow-neu-inset data-[focus=true]:shadow-neu-pressed data-[focus=true]:bg-gradient-to-br data-[focus=true]:from-content2 data-[focus=true]:to-content1",
                input: "bg-transparent text-foreground placeholder:text-default-500"
              }}
              placeholder="Neumorphic Input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Input 
              classNames={{
                inputWrapper: "shadow-neu-subtle border-none bg-content1 data-[hover=true]:shadow-neu-inset data-[focus=true]:shadow-neu-pressed data-[focus=true]:bg-content2",
                input: "bg-transparent text-foreground placeholder:text-default-500"
              }}
              placeholder="Neumorphic Flat Input"
            />
            <Textarea
              classNames={{
                inputWrapper: "shadow-neu-inset border-none bg-gradient-to-br from-content1 to-content2 data-[hover=true]:shadow-neu-inset data-[focus=true]:shadow-neu-pressed data-[focus=true]:bg-gradient-to-br data-[focus=true]:from-content2 data-[focus=true]:to-content1",
                input: "bg-transparent text-foreground placeholder:text-default-500"
              }}
              placeholder="Neumorphic Textarea"
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              minRows={3}
            />
          </div>
        </CardBody>
      </Card>

      {/* Select Variants */}
      <Card className="shadow-neu-card-raised bg-gradient-to-br from-content1 to-content2 border-none p-6">
        <CardHeader>
          <h2 className="text-xl font-semibold text-foreground">Select Variants</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4 max-w-md">
            <Select 
              classNames={{
                trigger: "shadow-neu-inset border-none bg-gradient-to-br from-content1 to-content2 data-[hover=true]:shadow-neu-inset data-[open=true]:shadow-neu-pressed data-[focus=true]:shadow-neu-pressed",
                value: "text-foreground placeholder:text-default-500",
                popoverContent: "shadow-neu-card-raised border-none bg-gradient-to-br from-content1 to-content2"
              }}
              placeholder="Select an option"
              selectedKeys={selectValue ? [selectValue] : []}
              onSelectionChange={(keys) => setSelectValue(Array.from(keys)[0] as string)}
            >
              <SelectItem key="option1">Option 1</SelectItem>
              <SelectItem key="option2">Option 2</SelectItem>
              <SelectItem key="option3">Option 3</SelectItem>
            </Select>
            <Select 
              classNames={{
                trigger: "shadow-neu-subtle border-none bg-content1 data-[hover=true]:shadow-neu-inset data-[open=true]:shadow-neu-pressed data-[focus=true]:shadow-neu-pressed",
                value: "text-foreground placeholder:text-default-500",
                popoverContent: "shadow-neu-card-raised border-none bg-content1"
              }}
              placeholder="Flat Select"
            >
              <SelectItem key="flat1">Flat Option 1</SelectItem>
              <SelectItem key="flat2">Flat Option 2</SelectItem>
            </Select>
          </div>
        </CardBody>
      </Card>

      {/* Card Variants */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-neu-card-raised bg-gradient-to-br from-content1 to-content2 border-none p-4 hover:shadow-neu-raised-hover hover:scale-101 transition-all duration-300">
          <CardHeader>
            <h3 className="font-semibold">Raised Card</h3>
          </CardHeader>
          <CardBody>
            <p className="text-sm text-default-600">This card appears elevated from the surface.</p>
          </CardBody>
        </Card>

        <Card className="shadow-neu-card-sunken bg-gradient-to-br from-content2 to-content1 border-none p-4 hover:shadow-neu-inset transition-all duration-300">
          <CardHeader>
            <h3 className="font-semibold">Sunken Card</h3>
          </CardHeader>
          <CardBody>
            <p className="text-sm text-default-600">This card appears pressed into the surface.</p>
          </CardBody>
        </Card>

        <Card className="shadow-neu-subtle bg-content1 border-none p-4 hover:shadow-neu-raised hover:bg-gradient-to-br hover:from-content1 hover:to-content2 transition-all duration-300">
          <CardHeader>
            <h3 className="font-semibold">Flat Card</h3>
          </CardHeader>
          <CardBody>
            <p className="text-sm text-default-600">This card has subtle elevation.</p>
          </CardBody>
        </Card>

        <Card className="shadow-neu-card-raised bg-gradient-to-br from-content2 to-content3 border-none p-4 hover:shadow-neu-raised-hover hover:scale-102 hover:from-content1 hover:to-content2 transition-all duration-300">
          <CardHeader>
            <h3 className="font-semibold">Elevated Card</h3>
          </CardHeader>
          <CardBody>
            <p className="text-sm text-default-600">This card has maximum elevation.</p>
          </CardBody>
        </Card>
      </div>

      {/* Interactive Example */}
      <Card className="shadow-neu-card-raised bg-gradient-to-br from-content2 to-content3 border-none p-6 hover:shadow-neu-raised-hover hover:scale-101 transition-all duration-300">
        <CardHeader>
          <h2 className="text-xl font-semibold text-foreground">Interactive Form</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4 max-w-md">
            <Input 
              classNames={{
                inputWrapper: "shadow-neu-inset border-none bg-gradient-to-br from-content1 to-content2 data-[hover=true]:shadow-neu-inset data-[focus=true]:shadow-neu-pressed",
                input: "bg-transparent text-foreground placeholder:text-default-500"
              }}
              label="Name"
              placeholder="Enter your name"
            />
            <Input 
              classNames={{
                inputWrapper: "shadow-neu-inset border-none bg-gradient-to-br from-content1 to-content2 data-[hover=true]:shadow-neu-inset data-[focus=true]:shadow-neu-pressed",
                input: "bg-transparent text-foreground placeholder:text-default-500"
              }}
              label="Email"
              type="email"
              placeholder="Enter your email"
            />
            <Select 
              classNames={{
                trigger: "shadow-neu-inset border-none bg-gradient-to-br from-content1 to-content2 data-[hover=true]:shadow-neu-inset data-[open=true]:shadow-neu-pressed",
                value: "text-foreground placeholder:text-default-500",
                popoverContent: "shadow-neu-card-raised border-none bg-gradient-to-br from-content1 to-content2"
              }}
              label="Role"
              placeholder="Select your role"
            >
              <SelectItem key="user">User</SelectItem>
              <SelectItem key="admin">Admin</SelectItem>
              <SelectItem key="moderator">Moderator</SelectItem>
            </Select>
            <Textarea
              classNames={{
                inputWrapper: "shadow-neu-inset border-none bg-gradient-to-br from-content1 to-content2 data-[hover=true]:shadow-neu-inset data-[focus=true]:shadow-neu-pressed",
                input: "bg-transparent text-foreground placeholder:text-default-500"
              }}
              label="Message"
              placeholder="Enter your message"
              minRows={3}
            />
            <div className="flex gap-3">
              <Button className="shadow-neu-raised bg-gradient-to-br from-primary-400 to-primary-600 text-primary-foreground border-none hover:shadow-neu-raised-hover hover:scale-105 active:shadow-neu-pressed active:scale-95 transition-all duration-200">
                Submit
              </Button>
              <Button className="shadow-neu-raised bg-gradient-to-br from-content3 to-content2 border-none hover:shadow-neu-raised-hover hover:scale-105 active:shadow-neu-pressed active:scale-95 transition-all duration-200">
                Cancel
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}