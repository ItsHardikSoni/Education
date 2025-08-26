"use client"

import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, BookOpen, Play, ChevronDown, ChevronRight, ArrowLeft } from "lucide-react"

export default function CourseDetailPage() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [expandedChapters, setExpandedChapters] = useState({})
  const [isEnrolled, setIsEnrolled] = useState(false)

  // Get course data from localStorage
  const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]')
  const defaultCourses = {
    1: {
      id: "1",
      title: "JavaScript Fundamentals",
      description:
        "Master the basics of JavaScript programming with hands-on exercises and real-world projects. Learn variables, functions, objects, arrays, and modern ES6+ features.",
      instructor: "Sarah Johnson",
      duration: "8 hours",
      students: 15234,
      rating: 4.9,
      level: "Beginner",
      chapters: 5,
      image: "/web-development-coding-screen.png",
      content: [
        {
          id: 1,
          title: "Introduction to JavaScript",
          topics: [
            { id: "1.1", title: "What is JavaScript?", duration: "10 min" },
            { id: "1.2", title: "Setting up Development Environment", duration: "15 min" },
            { id: "1.3", title: "Your First JavaScript Program", duration: "20 min" },
          ],
        },
        {
          id: 2,
          title: "Variables and Data Types",
          topics: [
            { id: "2.1", title: "Understanding Variables", duration: "12 min" },
            { id: "2.2", title: "Primitive Data Types", duration: "18 min" },
            { id: "2.3", title: "Type Conversion", duration: "14 min" },
          ],
        },
        {
          id: 3,
          title: "Functions and Scope",
          topics: [
            { id: "3.1", title: "Function Declaration vs Expression", duration: "16 min" },
            { id: "3.2", title: "Arrow Functions", duration: "12 min" },
            { id: "3.3", title: "Scope and Closures", duration: "22 min" },
          ],
        },
        {
          id: 4,
          title: "Objects and Arrays",
          topics: [
            { id: "4.1", title: "Working with Objects", duration: "18 min" },
            { id: "4.2", title: "Array Methods", duration: "25 min" },
            { id: "4.3", title: "Destructuring", duration: "15 min" },
          ],
        },
        {
          id: 5,
          title: "Modern JavaScript Features",
          topics: [
            { id: "5.1", title: "Template Literals", duration: "10 min" },
            { id: "5.2", title: "Async/Await", duration: "20 min" },
            { id: "5.3", title: "Modules", duration: "18 min" },
          ],
        },
      ],
    },
    // Add more courses as needed
    2: {
      id: "2",
      title: "Advanced React & TypeScript",
      description: "Master React with TypeScript, advanced patterns, performance optimization, and testing.",
      instructor: "Mike Chen",
      duration: "12 hours",
      students: 1523,
      rating: 4.8,
      level: "Advanced",
      chapters: 4,
      image: "/react-typescript-code-editor.png",
      content: [
        {
          id: 1,
          title: "TypeScript Fundamentals",
          topics: [
            { id: "1.1", title: "TypeScript Setup", duration: "15 min" },
            { id: "1.2", title: "Type Annotations", duration: "20 min" },
            { id: "1.3", title: "Interfaces and Types", duration: "25 min" },
          ],
        },
      ],
    },
  }

  // Combine stored courses with default courses
  const allCourses = [...storedCourses, ...Object.values(defaultCourses)]
  const course = allCourses.find(c => c.id === courseId)

  const toggleChapter = (chapterId) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }))
  }

  const startCourse = () => {
    setIsEnrolled(true)
  }

  if (!course) {
    return <div>Course not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Course Header */}
      <div className="mb-8">
        <Button
          onClick={() => navigate('/courses')}
          variant="ghost"
          className="mb-4"
        >
          <ArrowLeft className="mr-2" /> Back to Courses
        </Button>
        <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
        <p className="text-xl text-gray-600 mb-6">{course.description}</p>
        <div className="flex flex-wrap gap-4 mb-6">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {course.duration}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="w-4 h-4" /> {course.students} students
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="w-4 h-4" /> {course.rating}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" /> {course.level}
          </Badge>
        </div>
        {!isEnrolled && (
          <Button onClick={startCourse} className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
            Start Course
          </Button>
        )}
      </div>

      {/* Course Content */}
      {isEnrolled && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Course Content</h2>
          {course.content?.map((chapter) => (
            <Card key={chapter.id} className="overflow-hidden">
              <CardHeader className="cursor-pointer" onClick={() => toggleChapter(chapter.id)}>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    Chapter {chapter.id}: {chapter.title}
                  </CardTitle>
                  {expandedChapters[chapter.id] ? (
                    <ChevronDown className="w-6 h-6" />
                  ) : (
                    <ChevronRight className="w-6 h-6" />
                  )}
                </div>
              </CardHeader>
              {expandedChapters[chapter.id] && (
                <CardContent>
                  <div className="space-y-2">
                    {chapter.topics.map((topic) => (
                      <div
                        key={topic.id}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                      >
                        <Link
                          to={`/courses/${courseId}/lesson/${topic.id}`}
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                        >
                          <Play className="w-4 h-4" />
                          <span>{topic.title}</span>
                        </Link>
                        <span className="text-gray-500">{topic.duration}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
