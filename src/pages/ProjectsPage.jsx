"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { ExternalLink, Github, Filter, Zap, Code, Smartphone, Database, Globe } from "lucide-react"
import AdvancedSEO from "../components/AdvancedSEO"

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")

  const projects = [
    {
      id: "1",
      title: "E-Commerce Store",
      description: "Full-stack e-commerce platform with shopping cart, payments, and admin dashboard.",
      longDescription:
        "A complete e-commerce solution built with React and Node.js, featuring user authentication, product catalog, shopping cart functionality, Stripe payment integration, and an admin dashboard for inventory management.",
      category: "Web Application",
      difficulty: "Advanced",
      demoUrl: "https://demo-ecommerce.dev",
      githubUrl: "https://github.com/devlibrary/ecommerce-store",
      image: "/ecommerce-store-interface.png",
      featured: true,
    },
    {
      id: "2",
      title: "Expense Tracker Mobile App",
      description: "Personal finance app with expense tracking, budgets, and spending analytics.",
      longDescription:
        "A comprehensive expense tracking mobile application with category-based spending analysis, budget management, recurring transaction support, and detailed financial reports to help users manage their finances effectively.",
      category: "Mobile App",
      difficulty: "Beginner",
      githubUrl: "https://github.com/devlibrary/expense-tracker",
      image: "/expense-tracker-mobile.png",
      featured: false,
    },
  ]

  const categories = ["All", "Web Application", "Mobile App", "Backend API", "Data Science"]
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"]

  const filteredProjects = projects.filter((project) => {
    const categoryMatch = selectedCategory === "All" || project.category === selectedCategory
    const difficultyMatch = selectedDifficulty === "All" || project.difficulty === selectedDifficulty
    return categoryMatch && difficultyMatch
  })


  const projectsStructuredData = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Developer's Library Student Projects",
      description: "Showcase of amazing projects built by our students",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareApplication",
          name: project.title,
          description: project.description,
          applicationCategory: project.category,
          url: project.demoUrl || project.githubUrl,
          codeRepository: project.githubUrl,
          screenshot: project.image,
          author: {
            "@type": "Organization",
            name: "Developer's Library Students",
          },
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: "Student Project Portfolio",
      description: "A comprehensive collection of programming projects created by Developer's Library students",
      author: {
        "@type": "Organization",
        name: "Developer's Library",
      },
      educationalLevel: "Beginner to Advanced",
      teaches: ["Web Development", "Mobile Development", "Backend Development", "Data Science"],
    },
  ]

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Web Application":
        return <Globe className="h-5 w-5" />
      case "Mobile App":
        return <Smartphone className="h-5 w-5" />
      case "Backend API":
        return <Database className="h-5 w-5" />
      case "Data Science":
        return <Zap className="h-5 w-5" />
      default:
        return <Code className="h-5 w-5" />
    }
  }

  return (
    <>
      <AdvancedSEO
        title="Student Projects - Real-World Programming Examples"
        description="Explore amazing projects built by Developer's Library students. Get inspired by real-world applications including e-commerce stores, mobile apps, APIs, and data science projects with source code and live demos."
        keywords="programming projects, student projects, web development, mobile apps, backend API, data science, React projects, Node.js, Python, portfolio examples"
        canonicalUrl="https://developers-library.com/projects"
        ogImage="https://developers-library.com/images/projects-showcase.png"
        type="website"
        structuredData={projectsStructuredData}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Projects", url: "/projects" },
        ]}
      />

      <div className="min-h-screen py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Student Projects</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore amazing projects built by our students and get inspired for your next creation. Each project
              includes source code, live demos, and detailed documentation.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="font-semibold text-gray-900">Filter Projects</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map((difficulty) => (
                    <Button
                      key={difficulty}
                      variant={selectedDifficulty === difficulty ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedDifficulty(difficulty)}
                    >
                      {difficulty}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* All Projects Grid */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">All Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(project.category)}
                        <span className="text-sm font-medium text-gray-600">{project.category}</span>
                      </div>
                      <Badge className={getDifficultyColor(project.difficulty)}>{project.difficulty}</Badge>
                    </div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription className="text-sm">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      {project.demoUrl && (
                        <Button size="sm" className="flex-1">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Demo
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Your Own Projects?</h2>
            <p className="text-xl mb-6 opacity-90">
              Start learning today and create amazing projects that showcase your skills to the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Start Learning
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-transparent border-white text-white hover:bg-white hover:text-purple-600"
              >
                View Courses
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
