"use client"

import { useParams, Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock } from "lucide-react"

export default function LessonPage() {
  const { courseId, lessonId } = useParams()
  const navigate = useNavigate()

  // Get course data from localStorage
  const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]')
  const course = storedCourses.find(c => c.id === courseId)
  
  // Get lesson content
  const lessonContent = course?.lessons?.[lessonId]

  if (!course || !lessonContent) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button onClick={() => navigate(`/courses/${courseId}`)} variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2" /> Back to Course
        </Button>
        <div>Lesson content not found</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button onClick={() => navigate(`/courses/${courseId}`)} variant="ghost" className="mb-4">
        <ArrowLeft className="mr-2" /> Back to Course
      </Button>
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{lessonContent.title}</h1>
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-1" />
          <span>{lessonContent.duration}</span>
        </div>
      </div>

      <div className="prose max-w-none">
        {lessonContent.content.sections?.map((section, index) => {
          switch (section.type) {
            case 'heading':
              return <h2 key={index} className="text-2xl font-bold mt-6 mb-4">{section.content}</h2>
            case 'paragraph':
              return <p key={index} className="mb-4">{section.content}</p>
            case 'list':
              return (
                <ul key={index} className="list-disc pl-6 mb-4 space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i}>
                      <strong>{item.title}</strong> - {item.description}
                    </li>
                  ))}
                </ul>
              )
            case 'code':
              return (
                <pre key={index} className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
                  <code className={`language-${section.language}`}>{section.content}</code>
                </pre>
              )
            default:
              return null
          }
        })}
      </div>
    </div>
  )
}
