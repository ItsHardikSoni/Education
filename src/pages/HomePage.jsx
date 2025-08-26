import { Button } from "@/components/ui/button"
import { Check, Rocket, Code, BookOpen, Users, Quote, Star } from "lucide-react"
import { Link } from "react-router-dom"
import AdvancedSEO from "../components/AdvancedSEO"

export default function HomePage() {
  const features = [
    "No Credit Card Required",
    "Beginner to Advanced",
    "Real-World Projects",
    "Certificate of Completion",
  ]

  const testimonials = [
    {
      name: "Aarav Sharma",
      role: "Full-Stack Developer",
      text: "Developer’s Library helped me land my first internship. The projects are hands-on and industry-relevant.",
    },
    {
      name: "Emily Johnson",
      role: "Software Engineer",
      text: "I was struggling to learn React, but their courses and projects made it so easy to understand and practice!",
    },
    {
      name: "Rahul Verma",
      role: "Computer Science Student",
      text: "This platform gave me the confidence to crack coding interviews. Highly recommended for beginners.",
    },
  ]

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Developer's Library",
    description:
      "Learn JavaScript, Python, React, Node.js and more with our comprehensive interactive courses and hands-on projects.",
    url: "https://developers-library.com",
    logo: "https://developers-library.com/logo.png",
    sameAs: ["https://twitter.com/developerslib", "https://github.com/developerslib"],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free programming courses and projects",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "15000",
    },
  }

  return (
    <>
      <AdvancedSEO
        title="Master Programming with 100+ Free Courses & 500+ Projects"
        description="Learn JavaScript, Python, React, Node.js and more with our comprehensive interactive courses and hands-on projects. Join 50,000+ developers worldwide - completely FREE!"
        keywords="programming courses, free coding tutorials, JavaScript, Python, React, Node.js, web development, software engineering"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-24 md:py-30 px-4 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] bg-[size:75px_75px]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-3xl" />
          </div>

          <div className="max-w-6xl mx-auto text-center relative z-10">
            <div className="space-y-6 mb-12">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-slate-900">
                Master Programming with <span className="text-blue-600">100+</span>
                <br />
                <span className="text-blue-600">Free Courses</span> <span className="text-purple-600">&</span>{" "}
                <span className="text-pink-600">500+</span> <span className="text-pink-600">Projects</span>
              </h1>

              <div className="max-w-4xl mx-auto">
                <p className="text-xl md:text-2xl text-slate-700 leading-relaxed">
                  <Rocket className="inline h-6 w-6 text-orange-500 mr-2" />
                  Learn <strong>JavaScript, Python, React, Node.js</strong> and more with{" "}
                  <span className="text-blue-600 font-semibold">Interactive Courses</span> +{" "}
                  <span className="text-purple-600 font-semibold">Hands-on Projects</span>. Join{" "}
                  <strong>50,000+ developers</strong> worldwide - <strong>FREE!</strong>
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center justify-center gap-3 text-slate-700">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium text-lg">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-full font-semibold"
              >
                <Link to="/courses">Start Learning Free →</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Link to="/projects">Browse Projects →</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white border-t">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-blue-600">100+</div>
                <div className="text-slate-600 font-medium">Free Courses</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-purple-600">500+</div>
                <div className="text-slate-600 font-medium">Hands-on Projects</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-pink-600">50,000+</div>
                <div className="text-slate-600 font-medium">Active Developers</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Why Choose Developer's Library?</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Everything you need to master programming and build amazing projects
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Interactive Learning</h3>
                <p className="text-slate-600">Hands-on coding exercises and real-world projects</p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Comprehensive Curriculum</h3>
                <p className="text-slate-600">From basics to advanced topics in modern technologies</p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Community Support</h3>
                <p className="text-slate-600">Join a community of passionate developers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white border-t">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-12">What Our Learners Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-xl shadow-sm hover:shadow-md transition">
                  <Quote className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                  <p className="text-slate-700 mb-4 italic">"{t.text}"</p>
                  <div className="font-bold text-slate-900">{t.name}</div>
                  <div className="text-slate-500 text-sm">{t.role}</div>
                  <div className="flex justify-center mt-3">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Coding Journey?</h2>
          <p className="text-lg md:text-xl mb-8">
            Join thousands of developers and access 100+ free courses & 500+ projects today.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-blue-700 font-semibold px-8 py-4 rounded-full hover:bg-slate-100"
          >
            <Link to="/courses">Get Started Free →</Link>
          </Button>
        </section>
      </div>
    </>
  )
}
