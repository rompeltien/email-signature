'use client'

import * as React from 'react'
import { useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"

export function EmailSignatureForm() {
  const [formData, setFormData] = React.useState({
    name: '',
    position: '',
    email: ''
  })
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [isCopied, setIsCopied] = useState(false)
  const [includeReel, setIncludeReel] = useState(false)
  const [reelUrl, setReelUrl] = useState('')

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

    const reelSection = includeReel && reelUrl ? `
      <div style="margin-top: 24px;">
        <a href="${reelUrl}" target="_blank" style="text-decoration: none; display: block;">
          <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 534px;">
            <tbody>
              <tr style="@media screen and (max-width: 480px) { display: block; }">
                <td width="160" style="vertical-align: top; @media screen and (max-width: 480px) { display: block; width: 100%; }">
                  <img style="width: 160px; height: 90px; display: block; object-fit: cover; @media screen and (max-width: 480px) { width: 100%; height: auto; }" 
                       src="https://projects.rompeltien.com/mailing/cover-reel.png" 
                       alt="20 años Redbility" />
                </td>
                <td width="374" style="vertical-align: top; background-color: #F9F9F9; padding: 22px 20px; @media screen and (max-width: 480px) { display: block; width: 100%; }">
                  <div style="font-family: Verdana; font-size: 12px; font-weight: 700; color: #2F272A; line-height: 24px; text-transform: lowercase;">
                    20 años creando experiencias memorables
                  </div>
                  <div style="font-family: Verdana; font-size: 12px; color: #2F272A; line-height: 24px;">
                    ¡Gracias por ser parte en nuestro camino!
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </a>
      </div>
    ` : '';

    return `
      <div style="font-family: Verdana, Arial, sans-serif; margin-top: 14px;">
        <div style="color: rgb(0, 0, 0); font-size: 10px; font-weight: 400; line-height: 18px;">
          --
        </div>
        
        <div style="color: rgb(0, 0, 0); font-size: 14px; font-weight: 700; line-height: 24px; margin-top: 5px;">
          ${name}
        </div>
        
        <div style="color: rgb(0, 0, 0); font-size: 12px; font-weight: 700; line-height: 24px;">
          ${position}
        </div>
        
        <div style="margin-top: 10px;">
          <a href="tel:+34${phoneNumber.replace(/\s/g, '')}" 
             style="color: rgb(0, 0, 0); font-size: 12px; font-weight: 400; line-height: 24px; text-decoration: none;">
            ${phone}
          </a>
        </div>
        
        <div>
          <a href="mailto:${email}" 
             style="color: rgb(0, 0, 0); font-size: 12px; font-weight: 400; line-height: 24px; text-decoration: none;">
            ${email}
          </a>
        </div>
        
        <div>
          <a href="http://www.redbility.com/" 
             target="_blank" 
             style="color: rgb(255, 0, 78); font-size: 12px; font-weight: 400; line-height: 24px; text-decoration: none;">
            www.redbility.com
          </a>
        </div>
        
        <div style="color: rgb(0, 0, 0); font-size: 12px; font-weight: 400; line-height: 24px;">
          <a href="https://www.google.es/maps/place/Redbility/@40.429085,-3.675137,15z" 
             target="_blank" 
             style="color: rgb(0, 0, 0); text-decoration: none;">Madrid</a>
          <span> · </span>
          <a href="https://www.google.com/maps/place/Jungle+Barcelona/@41.398794,2.1906384,15z" 
             target="_blank" 
             style="color: rgb(0, 0, 0); text-decoration: none;">Barcelona</a>
        </div>
        ${reelSection}
      </div>
    `.trim();
  };

  const handleCopySignature = () => {
    const signatureHTML = generateSignatureHTML();
    
    // Crear un elemento div temporal
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = signatureHTML;
    
    // Crear un blob con el contenido HTML
    const blob = new Blob([tempDiv.innerHTML], { type: 'text/html' });
    
    // Crear un objeto de datos para el portapapeles
    const clipboardData = new ClipboardItem({
      'text/html': blob,
      'text/plain': new Blob([tempDiv.innerText], { type: 'text/plain' })
    });
    
    // Copiar al portapapeles usando la API moderna
    navigator.clipboard.write([clipboardData])
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      })
      .catch((err) => {
        console.error('Error al copiar la firma:', err);
        // Fallback al método antiguo
        const textarea = document.createElement('textarea');
        textarea.innerHTML = signatureHTML;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      });
  };

  return (
    <>
      <div className="min-h-screen bg-background w-full">
        {/* Header */}
        <header className="border-b">
          <div className="mx-5 md:mx-20 flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-[#ff0046]">R</div>
              <div className="text-xs font-semibold tracking-widest uppercase">Firma de correo</div>
            </div>
            <div className="flex items-center">
              <Avatar>
                <AvatarImage src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar-ierycApZ3Gc5h6zAmtI6v4Ptu3Y6cy.png" />
                <AvatarFallback>NA</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex justify-center mx-5 md:mx-20 pt-20 pb-8 font-effra">
          <div className="max-w-[1400px] w-full">
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
                    <Input
                      id="position"
                      placeholder="Introduce tu cargo"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="text-[16px] font-normal"
                    />
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

                  <div className="rounded-lg border p-4 space-y-4">
                    <div className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <Label htmlFor="reel" className="text-base">
                          Incluir reel
                        </Label>
                        <div className="text-[14px] text-muted-foreground">
                          Añade un enlace al reel de proyectos en tu firma
                        </div>
                      </div>
                      <Switch
                        id="reel"
                        checked={includeReel}
                        onCheckedChange={setIncludeReel}
                        className="data-[state=checked]:bg-[#FF004E]"
                      />
                    </div>

                    {includeReel && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="reelUrl" className="text-[14px] font-medium">
                            URL del vídeo
                          </Label>
                          <Input
                            id="reelUrl"
                            type="url"
                            placeholder="Pega aquí la url del vídeo"
                            value={reelUrl}
                            onChange={(e) => setReelUrl(e.target.value)}
                            className="text-[16px] font-normal"
                          />
                        </div>
                      </div>
                    )}
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

                      <div ref={signatureRef} style={{ fontFamily: 'Verdana, Arial, sans-serif', marginTop: '14px' }}>
                        <div style={{ fontSize: '10px', lineHeight: '18px' }}>--</div>
                        
                        <div style={{ fontSize: '14px', fontWeight: 700, lineHeight: '24px', marginTop: '5px' }}>
                          {formData.name || 'Nombre Apellido'}
                        </div>
                        
                        <div style={{ fontSize: '12px', fontWeight: 700, lineHeight: '24px' }}>
                          {formData.position || 'UX Consultant'}
                        </div>
                        
                        <div style={{ marginTop: '10px' }}>
                          <a href={`tel:+34${phoneNumber.replace(/\s/g, '')}`}
                             style={{ fontSize: '12px', lineHeight: '24px', textDecoration: 'none', color: 'black' }}>
                            {phoneNumber ? `+34 ${phoneNumber}` : '+34 666 777 888'}
                          </a>
                        </div>
                        
                        <div>
                          <a href={`mailto:${formData.email}`}
                             style={{ fontSize: '12px', lineHeight: '24px', textDecoration: 'none', color: 'black' }}>
                            {formData.email || 'hello@redbility.com'}
                          </a>
                        </div>
                        
                        <div>
                          <a href="http://www.redbility.com/"
                             target="_blank"
                             style={{ fontSize: '12px', lineHeight: '24px', textDecoration: 'none', color: '#FF004E' }}>
                            www.redbility.com
                          </a>
                        </div>
                        
                        <div style={{ fontSize: '12px', lineHeight: '24px' }}>
                          <a href="https://www.google.es/maps/place/Redbility/@40.429085,-3.675137,15z"
                             target="_blank"
                             style={{ textDecoration: 'none', color: 'black' }}>
                            Madrid
                          </a>
                          <span> · </span>
                          <a href="https://www.google.com/maps/place/Jungle+Barcelona/@41.398794,2.1906384,15z"
                             target="_blank"
                             style={{ textDecoration: 'none', color: 'black' }}>
                            Barcelona
                          </a>
                        </div>
                        {includeReel && reelUrl && (
                          <div style={{ marginTop: '24px' }}>
                            <a href={reelUrl} target="_blank" style={{ textDecoration: 'none', display: 'block' }}>
                              <table cellPadding={0} cellSpacing={0} border={0} style={{ width: '100%', maxWidth: '534px' }}>
                                <tbody>
                                  <tr className="md:table-row block">
                                    <td 
                                      width={160} 
                                      className="md:table-cell block w-full md:w-[160px]" 
                                      style={{ verticalAlign: 'top' }}
                                    >
                                      <img 
                                        className="w-full md:w-[160px] h-auto md:h-[90px] object-cover"
                                        src="https://projects.rompeltien.com/mailing/cover-reel.png"
                                        alt="20 años Redbility" 
                                      />
                                    </td>
                                    <td 
                                      width={374} 
                                      className="md:table-cell block w-full md:w-[374px] bg-[#F9F9F9] p-5"
                                      style={{ verticalAlign: 'top' }}
                                    >
                                      <div className="font-['Verdana'] text-xs font-bold text-[#2F272A] leading-6 lowercase">
                                        20 años creando experiencias memorables
                                      </div>
                                      <div className="font-['Verdana'] text-xs text-[#2F272A] leading-6">
                                        ¡Gracias por ser parte en nuestro camino!
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </a>
                          </div>
                        )}
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
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    Configura tu firma en Gmail utilizando Safari para que se visualice correctamente
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}