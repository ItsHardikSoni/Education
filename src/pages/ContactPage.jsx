"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, BookOpen } from "lucide-react"
import AdvancedSEO from "../components/AdvancedSEO"
import StructuredData from "../components/StructuredData"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)

    // Show success message (in a real app, you'd handle this properly)
    alert("Thank you for your message! We'll get back to you soon.")
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      description: "Send us an email anytime",
      value: "hello@devlibrary.com",
      action: "mailto:hello@devlibrary.com",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      description: "Mon-Fri from 9am to 6pm",
      value: "+1 (555) 123-4567",
      action: "tel:+15551234567",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Us",
      description: "Come say hello at our office",
      value: "123 Tech Street, San Francisco, CA 94105",
      action: "https://maps.google.com",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Office Hours",
      description: "Our team is available",
      value: "Monday - Friday: 9:00 AM - 6:00 PM PST",
      action: null,
    },
  ]

  const supportOptions = [
    {
      icon: <MessageSquare className="h-6 w-6 text-blue-600" />,
      title: "General Inquiries",
      description: "Questions about our courses, pricing, or platform",
      recommended: "Email or Contact Form",
    },
    {
      icon: <Users className="h-6 w-6 text-green-600" />,
      title: "Student Support",
      description: "Help with assignments, technical issues, or course content",
      recommended: "Student Portal or Email",
    },
    {
      icon: <BookOpen className="h-6 w-6 text-purple-600" />,
      title: "Partnership Opportunities",
      description: "Collaborate with us or become an instructor",
      recommended: "Email with detailed proposal",
    },
  ]

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ]

  return (
    <>
      <AdvancedSEO
        title="Contact Us - Developer's Library | Get Help & Support"
        description="Get in touch with Developer's Library team. Contact us for course inquiries, student support, partnerships, or general questions. We respond within 24 hours."
        keywords="contact developer library, programming course support, student help, technical support, course inquiries"
        url={`${window.location.origin}/contact`}
        type="website"
        breadcrumbs={breadcrumbs}
      />

      <StructuredData
        pageType="contact"
        title="Contact Us - Developer's Library"
        description="Get in touch with Developer's Library team for course inquiries, student support, and partnerships."
        url={`${window.location.origin}/contact`}
        breadcrumbs={breadcrumbs}
        customSchema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          mainEntity: {
            "@type": "Organization",
            name: "Developer's Library",
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+1-555-123-4567",
                contactType: "customer service",
                email: "hello@devlibrary.com",
                availableLanguage: ["English"],
                hoursAvailable: {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "09:00",
                  closes: "18:00",
                },
              },
            ],
            address: {
              "@type": "PostalAddress",
              streetAddress: "123 Tech Street",
              addressLocality: "San Francisco",
              addressRegion: "CA",
              postalCode: "94105",
              addressCountry: "US",
            },
          },
        }}
      />

      <div className="min-h-screen py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about our courses or need help with your learning journey? We're here to help! Reach out to
              us and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  <CardDescription>Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="What is this regarding?"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us more about your inquiry..."
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full resize-none"
                      />
                    </div>
                    <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                  <CardDescription>Multiple ways to reach our team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                        {info.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900">{info.title}</h3>
                        <p className="text-sm text-gray-600 mb-1">{info.description}</p>
                        {info.action ? (
                          <a
                            href={info.action}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm break-all"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-gray-900 font-medium text-sm">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Response Times */}
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Clock className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-green-900 mb-2">Quick Response</h3>
                    <p className="text-sm text-green-700">
                      We typically respond to all inquiries within 24 hours during business days.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Support Options */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How Can We Help?</h2>
              <p className="text-lg text-gray-600">Choose the best way to get in touch based on your needs</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {supportOptions.map((option, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      {option.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{option.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xs font-medium text-blue-800">Recommended: {option.recommended}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Looking for Quick Answers?</h2>
            <p className="text-xl mb-6 opacity-90">
              Check out our FAQ section for instant answers to common questions about courses, pricing, and more.
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8">
              View FAQ
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
