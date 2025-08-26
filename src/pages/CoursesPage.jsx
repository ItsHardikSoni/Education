"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, BookOpen, Filter } from "lucide-react"
import { Link } from "react-router-dom"
import AdvancedSEO from "../components/AdvancedSEO"

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All")

  // Combine default courses with courses from localStorage
  const defaultCourses = [
    {
      id: "1",
      title: "Complete Web Development Bootcamp",
      description: "Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB to become a full-stack developer.",
      duration: "12 weeks",
      students: 2847,
      rating: 4.9,
      level: "Beginner",
      category: "Web Development",
      image: "/web-development-coding-screen.png",
    },
    {
      id: "2",
      title: "Advanced React & TypeScript",
      description: "Master React with TypeScript, advanced patterns, performance optimization, and testing.",
      duration: "8 weeks",
      students: 1523,
      rating: 4.8,
      level: "Advanced",
      category: "Frontend",
      image: "/react-typescript-code-editor.png",
    },
    {
      id: "3",
      title: "Python for Data Science",
      description: "Learn Python programming with focus on data analysis, visualization, and machine learning basics.",
      duration: "10 weeks",
      students: 3241,
      rating: 4.7,
      level: "Intermediate",
      category: "Data Science",
      image: "/python-data-science-charts-graphs.png",
    },
  ]

  // Get courses from localStorage
  const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]')
  
  // Combine both arrays
  const courses = [...defaultCourses, ...storedCourses]

  const categories = ["All", "Web Development", "Frontend", "Backend", "Mobile Development", "Data Science", "DevOps"]
  const levels = ["All", "Beginner", "Intermediate", "Advanced"]

  const filteredCourses = courses.filter((course) => {
    const categoryMatch = selectedCategory === "All" || course.category === selectedCategory
    const levelMatch = selectedLevel === "All" || course.level === selectedLevel
    return categoryMatch && levelMatch
  })

  const getLevelColor = (level) => {
    switch (level) {
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Programming Courses",
    description: "Comprehensive programming courses designed to take you from beginner to professional developer",
    numberOfItems: courses.length,
    itemListElement: courses.map((course, index) => ({
      "@type": "Course",
      position: index + 1,
      name: course.title,
      description: course.description,
      provider: {
        "@type": "Organization",
        name: "Developer's Library",
      },
      instructor: {
        "@type": "Person",
        name: "Ayush",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: course.rating,
        reviewCount: Math.floor(course.students * 0.3),
      },
      // offers: {
      //   "@type": "Offer",
      //   price: course.price === "Free" ? "0" : course.price.replace("$", ""),
      //   priceCurrency: "USD",
      // },
    })),
  }

  return (
    <>
      <AdvancedSEO
        title="Programming Courses - Learn Web Development, Python, React & More"
        description="Comprehensive programming courses designed to take you from beginner to professional developer. Learn at your own pace with hands-on projects and expert guidance."
        keywords="programming courses, web development bootcamp, react course, python course, javascript training, coding classes online"
        canonicalUrl="https://developers-library.com/courses"
        structuredData={structuredData}
      />

      <div className="min-h-screen py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Courses</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive programming courses designed to take you from beginner to professional developer. Learn at
              your own pace with hands-on projects and expert guidance.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Courses Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">10,000+</div>
              <div className="text-gray-600">Students Enrolled</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">4.8</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-600">Completion Rate</div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="font-semibold text-gray-900">Filter Courses</span>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                <div className="flex flex-wrap gap-2">
                  {levels.map((level) => (
                    <Button
                      key={level}
                      variant={selectedLevel === level ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedLevel(level)}
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                  </div>
                  <CardTitle className="text-xl leading-tight">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {course.students.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {course.rating}
                    </div>
                  </div>

                  {/* <div className="flex flex-wrap gap-1 mb-4">
                    {course.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {course.technologies.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{course.technologies.length - 3} more
                      </Badge>
                    )}
                  </div> */}

                  <Link to={`/courses/${course.id}`}>
                    <Button className="w-full">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Start Course
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of students who have transformed their careers with our comprehensive courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Browse All Courses
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
              >
                <Link to="/contact">Get Help Choosing</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
