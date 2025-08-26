import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Mail, Phone } from "lucide-react"
import { Link } from "react-router-dom"
import AdvancedSEO from "../components/AdvancedSEO"
import StructuredData from "../components/StructuredData"

export default function FAQPage() {
  const faqCategories = [
    {
      title: "Getting Started",
      faqs: [
        {
          question: "Do I need any prior programming experience?",
          answer:
            "Not at all! Our courses are designed for complete beginners. We start with the fundamentals and gradually build up to more advanced concepts. If you can use a computer and browse the web, you're ready to start learning.",
        },
        {
          question: "What equipment do I need?",
          answer:
            "All you need is a computer (Windows, Mac, or Linux) with an internet connection. We'll guide you through setting up all the necessary development tools and software as part of the course curriculum.",
        },
        {
          question: "How long does it take to complete a course?",
          answer:
            "Course duration varies depending on the topic and your pace. Most courses take 4-12 weeks to complete if you dedicate 5-10 hours per week. You can learn at your own pace since you have lifetime access to all materials.",
        },
      ],
    },
    {
      title: "Courses & Content",
      faqs: [
        {
          question: "What programming languages do you teach?",
          answer:
            "We cover a wide range of technologies including JavaScript, Python, React, Node.js, HTML/CSS, TypeScript, and more. Our curriculum focuses on the most in-demand skills in the current job market.",
        },
        {
          question: "Are the courses updated regularly?",
          answer:
            "Yes! We continuously update our courses to reflect the latest industry practices and technologies. When you enroll, you get lifetime access to all updates and new content added to your courses.",
        },
        {
          question: "Do you provide certificates?",
          answer:
            "Yes, you'll receive a certificate of completion for each course you finish. These certificates can be shared on LinkedIn and included in your resume to showcase your skills to potential employers.",
        },
      ],
    },
    {
      title: "Projects & Portfolio",
      faqs: [
        {
          question: "Will I build real projects?",
          answer:
            "Every course includes hands-on projects that simulate real-world development scenarios. You'll build applications that you can showcase in your portfolio and demonstrate to potential employers.",
        },
        {
          question: "Can I get help with my projects?",
          answer:
            "Yes! We have an active community forum where you can ask questions, get feedback on your code, and connect with other students. Our instructors also provide guidance and support throughout your learning journey.",
        },
        {
          question: "Do you help with job placement?",
          answer:
            "While we don't guarantee job placement, we provide extensive career guidance including resume reviews, portfolio optimization, interview preparation, and job search strategies to help you land your first developer role.",
        },
      ],
    },
    {
      title: "Technical Support",
      faqs: [
        {
          question: "What if I get stuck on a technical problem?",
          answer:
            "We have multiple support channels available. You can post questions in our community forum, join our Discord server for real-time help, or contact our support team directly. We're committed to helping you succeed.",
        },
        {
          question: "Can I access courses on mobile devices?",
          answer:
            "Yes! Our platform is fully responsive and works on all devices. While we recommend using a computer for coding exercises, you can watch video lessons and read materials on your phone or tablet.",
        },
        {
          question: "What if I need to take a break from learning?",
          answer:
            "No problem! Since you have lifetime access to your courses, you can pause and resume your learning whenever you need to. Your progress is automatically saved, so you can pick up right where you left off.",
        },
      ],
    },
  ]

  const faqData = faqCategories.flatMap((category) =>
    category.faqs.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    })),
  )

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "FAQ", url: "/faq" },
  ]

  return (
    <>
      <AdvancedSEO
        title="Frequently Asked Questions - Developer's Library"
        description="Find answers to common questions about our programming courses, platform, and learning experience. Get help with getting started, courses, projects, and technical support."
        keywords="FAQ, programming questions, course help, developer support, learning assistance"
        url={`${window.location.origin}/faq`}
        type="article"
        breadcrumbs={breadcrumbs}
      />

      <StructuredData
        pageType="faq"
        title="Frequently Asked Questions - Developer's Library"
        description="Find answers to common questions about our programming courses, platform, and learning experience."
        url={`${window.location.origin}/faq`}
        faqData={faqData}
        breadcrumbs={breadcrumbs}
      />

      <div className="min-h-screen py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our courses, platform, and learning experience.
            </p>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-8 mb-16">
            {faqCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">{category.title}</CardTitle>
                  <CardDescription>Common questions about {category.title.toLowerCase()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                        <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-gray-600 leading-relaxed">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Section */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900">Still Have Questions?</CardTitle>
              <CardDescription className="text-lg">
                Can't find what you're looking for? We're here to help!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Community Forum</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Join our active community and get help from fellow students
                  </p>
                  <Button variant="outline" size="sm">
                    Visit Forum
                  </Button>
                </div>
                <div className="text-center">
                  <Mail className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Email Support</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Send us an email and we'll get back to you within 24 hours
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>
                <div className="text-center">
                  <Phone className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Live Chat</h3>
                  <p className="text-sm text-gray-600 mb-4">Chat with our support team during business hours</p>
                  <Button variant="outline" size="sm">
                    Start Chat
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
