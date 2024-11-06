'use client'

import * as React from 'react'
import { useRef, useState } from 'react'
import { Bell, Check, Copy, Settings } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from "@/components/ui/skeleton"

export function EmailSignatureForm() {
  const [formData, setFormData] = React.useState({
    name: '',
    position: '',
    email: ''
  })
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [isCopied, setIsCopied] = useState(false)

  const signatureRef = useRef<HTMLDivElement>(null)

  const formatPhoneNumber = (value: string) => {
    const number = value.replace(/\D/g, '')
    const formattedNumber = number.replace(/(\d{3})(?=\d)/g, '$1 ')
    return formattedNumber.slice(0, 11) // Limit to 9 digits (3 groups of 3)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatPhoneNumber(e.target.value)
    setPhoneNumber(formattedNumber)
  }

  const generateSignatureHTML = (): string => {
    const name = formData.name || 'Nombre Apellido';
    const position = formData.position || 'UX Consultant';
    const phone = phoneNumber ? `+34 ${phoneNumber}` : '+34 666 777 888';
    const email = formData.email || 'hello@redbility.com';

    return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Firma redbility</title>
  </head>
  <body>
    <p>
      <font style="font-family: Verdana; font-size: 12px;">--</font>
    </p>
    <p style="margin: 10px 0 0 0;">
      <font style="font-family: Verdana; font-weight: bold; font-size: 14px; color: #2f272a;">${name}</font>
    </p>
    <p style="margin: 4px 0 0 0;">
      <font style="font-family: Verdana; font-weight: bold; font-size: 12px; color: #2f272a;">${position}</font>
    </p>
    <p style="margin: 16px 0 4px 0; vertical-align: top;">
      <font style="font-family: Verdana; font-weight: normal; font-size: 12px; color: #2f272a;">
        <a href="tel:${phone}" style="color: #000001; text-decoration: none !important;">${phone}</a>
      </font>
    </p>
    <p style="margin: 4px 4px 0 0; vertical-align: top;">
      <a href="mailto:${email}" style="text-decoration: none !important;">
        <font style="font-family: Verdana; font-weight: normal; font-size: 12px; color: #2f272a;">${email}</font>
      </a>
    </p>
    <p style="margin: 4px 4px 0px 0;">
      <a target="_blank" href="http://www.redbility.com/" style="font-family: Verdana; font-weight: normal; font-size: 12px; color: #ff004e; text-decoration: none !important;">www.redbility.com</a>
    </p>
    <p style="margin: 4px 4px 24px 0;">
      <a target="_blank" href="https://www.google.es/maps/place/Redbility/@40.429085,-3.675137,15z/data=!4m6!3m5!1s0xd422977a03322ff:0x8c22c5e6c45f1170!8m2!3d40.429085!4d-3.675137!16s%2Fg%2F1tyyyf3q?entry=ttu" style="font-family: Verdana; font-weight: normal; font-size: 12px; color: #2f272a; text-decoration: none !important;">Madrid</a>
      <a target="_blank" href="https://www.google.com/maps/place/Jungle+Barcelona/@41.398794,2.1906384,15z/data=!4m6!3m5!1s0x12a4a33a00215289:0xe3ef4c6ec6b5fc38!8m2!3d41.398794!4d2.1906384!16s%2Fg%2F11v9wlgsw9?entry=ttu" style="font-family: Verdana; font-weight: normal; font-size: 12px; color: #2f272a; text-decoration: none !important;"> · Barcelona</a>
    </p>
  </body>
</html>
  `;
  };

  const handleCopySignature = () => {
    const signatureHTML = generateSignatureHTML();

    const tempElement = document.createElement('div');
    tempElement.innerHTML = signatureHTML;
    document.body.appendChild(tempElement);

    const range = document.createRange();
    range.selectNodeContents(tempElement);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);

    document.execCommand('copy');

    document.body.removeChild(tempElement);
    selection?.removeAllRanges();

    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000); // Reset after 3 seconds
  };

  return (
    <>
      <div className="min-h-screen bg-background w-full">
        {/* Header */}
        <header className="border-b">
          <div className="mx-5 md:mx-20 flex h-16 items-center justify-between">
            <div className="text-3xl font-bold text-[#ff0046]">R</div>
            <div className="flex items-center">
              <div className="flex space-x-1 mr-4">
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
              </div>
              <Avatar>
                <AvatarImage src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar-ierycApZ3Gc5h6zAmtI6v4Ptu3Y6cy.png" />
                <AvatarFallback>NA</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-5 md:mx-20 pt-20 pb-8 font-effra">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-x-24">
            {/* Form Section */}
            <div className="space-y-10">
              <div className="space-y-2">
                <h1 className="text-[30px] font-semibold leading-[38px]">Configura tu firma de correo</h1>
                <p className="text-[16px] font-normal text-[#000000]">
                  Completa tus datos para configurar la firma de correo y añadirla a tu cuenta en Gmail.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[14px] font-medium">Nombre</Label>
                  <Input
                    id="name"
                    placeholder="Nombre y apellidos"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="text-[16px] font-normal"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position" className="text-[14px] font-medium">Cargo</Label>
                  <Select
                    value={formData.position}
                    onValueChange={(value) => setFormData({ ...formData, position: value })}
                  >
                    <SelectTrigger id="position" className="text-[16px] font-normal">
                      <SelectValue placeholder="Selecciona un cargo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UX Consultant">UX Consultant</SelectItem>
                      <SelectItem value="Product Designer">Product Designer</SelectItem>
                      <SelectItem value="UI Designer">UI Designer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[14px] font-medium">Teléfono</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[16px] font-normal text-gray-500">+34</span>
                    <Input
                      id="phone"
                      placeholder="666 777 888"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      className="text-[16px] font-normal pl-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[14px] font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="hello@redbility.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="text-[16px] font-normal"
                  />
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div>
              <div className="bg-transparent">
                <Card className="w-full shadow-[0px_2px_8px_rgba(0,0,0,0.05)] border-none">
                  <CardContent className="pt-6 px-6 pb-6">
                    <div className="mb-4 space-y-3">
                      {/* Saludo */}
                      <Skeleton className="h-6 w-40 mb-3 animate-none" />

                      {/* Contenido del correo */}
                      <Skeleton className="h-4 w-full animate-none" />
                      <Skeleton className="h-4 w-11/12 animate-none" />
                      <Skeleton className="h-4 w-full animate-none" />

                      {/* Espacio */}
                      <div className="h-2" />

                      {/* Despedida */}
                      <Skeleton className="h-4 w-32 animate-none" />
                    </div>

                    <div ref={signatureRef} className="pt-2 font-sans">
                      <p className="text-xs mb-2">--</p>
                      <p className="text-sm font-bold text-[#2f272a] mb-1">{formData.name || 'Nombre Apellido'}</p>
                      <p className="text-xs font-bold text-[#2f272a] mb-4">{formData.position || 'UX Consultant'}</p>
                      <p className="text-xs text-[#2f272a] mb-1">
                        <a href={`tel:+34${phoneNumber.replace(/\s/g, '')}`} className="text-[#000001] no-underline">
                          {phoneNumber ? `+34 ${phoneNumber}` : '+34 666 777 888'}
                        </a>
                      </p>
                      <p className="text-xs text-[#2f272a] mb-1">
                        <a href={`mailto:${formData.email}`} className="text-[#2f272a] no-underline">{formData.email || 'hello@redbility.com'}</a>
                      </p>
                      <p className="text-xs mb-1">
                        <a href="http://www.redbility.com/" target="_blank" rel="noopener noreferrer" className="text-[#ff004e] no-underline">www.redbility.com</a>
                      </p>
                      <p className="text-xs text-[#2f272a]">
                        <a href="https://www.google.es/maps/place/Redbility/@40.429085,-3.675137,15z/data=!4m6!3m5!1s0xd422977a03322ff:0x8c22c5e6c45f1170!8m2!3d40.429085!4d-3.675137!16s%2Fg%2F1tyyyf3q?entry=ttu" target="_blank" rel="noopener noreferrer" className="text-[#2f272a] no-underline">Madrid</a>
                        {' · '}
                        <a href="https://www.google.com/maps/place/Jungle+Barcelona/@41.398794,2.1906384,15z/data=!4m6!3m5!1s0x12a4a33a00215289:0xe3ef4c6ec6b5fc38!8m2!3d41.398794!4d2.1906384!16s%2Fg%2F11v9wlgsw9?entry=ttu" target="_blank" rel="noopener noreferrer" className="text-[#2f272a] no-underline">Barcelona</a>
                      </p>
                    
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-4">
                <Button 
                  onClick={handleCopySignature} 
                  className="w-full bg-[#FF004E] text-white hover:bg-[#FF004E]/90 transition-all duration-300"
                >
                  {isCopied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Firma copiada
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copiar firma
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}