import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Users, Lightbulb, Award } from "lucide-react"
// Updated import path to use relative import instead of alias
import AdvancedSEO from "../components/AdvancedSEO"

export default function AboutPage() {
  const values = [
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: "Mission-Driven",
      description: "We're committed to making quality programming education accessible to everyone, everywhere.",
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Community-First",
      description:
        "Learning is better together. We foster a supportive community of developers helping each other grow.",
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-purple-600" />,
      title: "Innovation-Focused",
      description: "We stay ahead of the curve, teaching the latest technologies and best practices in the industry.",
    },
    {
      icon: <Award className="h-8 w-8 text-orange-600" />,
      title: "Quality-Assured",
      description: "Every course and project is carefully crafted by experienced developers and industry experts.",
    },
  ]

  const stats = [
    { number: "10,000+", label: "Students Taught" },
    { number: "50+", label: "Courses Available" },
    { number: "200+", label: "Projects Built" },
    { number: "95%", label: "Success Rate" },
  ]

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "EducationalOrganization",
      name: "Developer's Library",
      description:
        "We're on a mission to democratize programming education and empower the next generation of developers with practical skills, real-world projects, and a supportive learning community.",
      foundingDate: "2020",
      numberOfEmployees: "10-50",
      address: {
        "@type": "PostalAddress",
        addressCountry: "US",
      },
      sameAs: ["https://twitter.com/developerslib", "https://github.com/developerslib"],
    },
  }

  return (
    <>
      <AdvancedSEO
        title="About Us - Our Mission & Story"
        description="Learn about Developer's Library's mission to democratize programming education. Founded in 2020, we've helped 10,000+ students with 50+ courses and 200+ projects."
        keywords="about developer's library, programming education mission, coding bootcamp story, developer training company"
        canonicalUrl="https://developers-library.com/about"
        structuredData={structuredData}
      />

      <div className="min-h-screen py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Developer's Library</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to democratize programming education and empower the next generation of developers with
              practical skills, real-world projects, and a supportive learning community.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Story Section */}
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Developer's Library was born from a simple observation: traditional programming education often
                    leaves a gap between theory and practice. Students learn syntax and concepts but struggle to build
                    real applications.
                  </p>
                  <p>
                    Founded in 2020 by a team of experienced developers and educators, we set out to bridge this gap by
                    creating a learning platform that emphasizes hands-on experience, practical projects, and real-world
                    application development.
                  </p>
                  <p>
                    Today, we're proud to have helped thousands of developers launch their careers, switch to tech, and
                    level up their skills with our comprehensive curriculum and supportive community.
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8">
                <img
                  src="/developers-modern-office.png"
                  alt="Developer's Library team"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                These core principles guide everything we do and shape the learning experience we provide.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      {value.icon}
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">{value.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* What Makes Us Different */}
          <div className="bg-gray-50 rounded-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Makes Us Different</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Badge variant="secondary" className="mb-4 text-sm px-3 py-1">
                  Project-Based Learning
                </Badge>
                <p className="text-gray-600">
                  Every course includes real-world projects that you can add to your portfolio and showcase to
                  employers.
                </p>
              </div>
              <div className="text-center">
                <Badge variant="secondary" className="mb-4 text-sm px-3 py-1">
                  Industry-Relevant
                </Badge>
                <p className="text-gray-600">
                  Our curriculum is constantly updated to reflect current industry practices and emerging technologies.
                </p>
              </div>
              <div className="text-center">
                <Badge variant="secondary" className="mb-4 text-sm px-3 py-1">
                  Lifetime Access
                </Badge>
                <p className="text-gray-600">
                  Once you enroll, you have lifetime access to course materials and all future updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
