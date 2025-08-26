"use client"

import { useParams, Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock } from "lucide-react"

export default function LessonPage() {
  const { courseId, lessonId } = useParams()
  const navigate = useNavigate()

  // Sample lesson content data
  const lessonData = {
    1: {
      1.1: {
        chapterNumber: 1,
        title: "What is JavaScript?",
        duration: "10 min",
        content: {
          heading: "Introduction to JavaScript",
          sections: [
            {
              type: "paragraph",
              content:
                "JavaScript is a high-level, interpreted programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. It enables interactive web pages and is an essential part of web applications.",
            },
            {
              type: "heading",
              content: "Key Features of JavaScript:",
            },
            {
              type: "list",
              items: [
                {
                  title: "Dynamic Typing:",
                  description: "Variables can hold different types of values",
                },
                {
                  title: "First-class Functions:",
                  description: "Functions can be assigned to variables, passed as arguments",
                },
                {
                  title: "Prototype-based OOP:",
                  description: "Object-oriented programming through prototypes",
                },
              ],
            },
            {
              type: "heading",
              content: "Your First JavaScript Code:",
            },
            {
              type: "code",
              language: "javascript",
              content: `// This is your first JavaScript program
console.log("Hello, World!");

// Variables in JavaScript
let message = "Welcome to JavaScript!";
const pi = 3.14159;
var isLearning = true;

// Simple function
function greetUser(name) {
    return "Hello, " + name + "!";
}

console.log(greetUser("Developer"));`,
            },
          ],
        },
      },
      1.2: {
        chapterNumber: 1,
        title: "Setting up Development Environment",
        duration: "15 min",
        content: {
          heading: "Setting up Your Development Environment",
          sections: [
            {
              type: "paragraph",
              content:
                "Before we start coding in JavaScript, we need to set up our development environment. This includes choosing a code editor, setting up a browser for testing, and understanding the basic tools.",
            },
            {
              type: "heading",
              content: "Required Tools:",
            },
            {
              type: "list",
              items: [
                {
                  title: "Code Editor:",
                  description: "Visual Studio Code, Sublime Text, or Atom",
                },
                {
                  title: "Web Browser:",
                  description: "Chrome, Firefox, or Safari with Developer Tools",
                },
                {
                  title: "Node.js:",
                  description: "For running JavaScript outside the browser",
                },
              ],
            },
            {
              type: "heading",
              content: "Basic HTML Setup:",
            },
            {
              type: "code",
              language: "html",
              content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Learning</title>
</head>
<body>
    <h1>My JavaScript Journey</h1>
    
    <script>
        // Your JavaScript code goes here
        console.log("Environment is ready!");
    </script>
</body>
</html>`,
            },
          ],
        },
      },
      1.3: {
        chapterNumber: 1,
        title: "Your First JavaScript Program",
        duration: "20 min",
        content: {
          heading: "Writing Your First JavaScript Program",
          sections: [
            {
              type: "paragraph",
              content:
                "Now that we understand what JavaScript is and have our environment set up, let's write our first JavaScript program. We'll start with simple examples and gradually build complexity.",
            },
            {
              type: "heading",
              content: "Basic Syntax and Structure:",
            },
            {
              type: "code",
              language: "javascript",
              content: `// Single line comment
/* Multi-line comment
   can span multiple lines */

// Variables
let userName = "John Doe";
const age = 25;
var isStudent = true;

// Output to console
console.log("Name:", userName);
console.log("Age:", age);
console.log("Is Student:", isStudent);`,
            },
            {
              type: "heading",
              content: "Interactive Example:",
            },
            {
              type: "code",
              language: "javascript",
              content: `// Interactive program
function calculateArea(length, width) {
    return length * width;
}

// Get user input (in browser)
let length = prompt("Enter length:");
let width = prompt("Enter width:");

// Calculate and display result
let area = calculateArea(length, width);
alert("The area is: " + area);

// Alternative using template literals
console.log(\`The area of \${length} x \${width} is \${area}\`);`,
            },
          ],
        },
      },
    },
  }

  const lesson = lessonData[courseId]?.[lessonId]

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
          <Link to={`/courses/${courseId}`}>
            <Button>Back to Course</Button>
          </Link>
        </div>
      </div>
    )
  }

  const renderContent = (section) => {
    switch (section.type) {
      case "paragraph":
        return <p className="text-gray-700 leading-relaxed mb-6">{section.content}</p>

      case "heading":
        return <h3 className="text-xl font-semibold text-gray-900 mb-4">{section.content}</h3>

      case "list":
        return (
          <ul className="space-y-3 mb-6">
            {section.items.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-gray-900">{item.title}</span>{" "}
                  <span className="text-gray-700">{item.description}</span>
                </div>
              </li>
            ))}
          </ul>
        )

      case "code":
        return (
          <div className="mb-6">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <code className={`language-${section.language}`}>{section.content}</code>
            </pre>
          </div>
        )

      default:
        return null
    }
  }

  const lessonSequence = ["1.1", "1.2", "1.3", "2.1"]
  const currentIndex = lessonSequence.indexOf(lessonId)
  const previousLesson = currentIndex > 0 ? lessonSequence[currentIndex - 1] : null
  const nextLesson = currentIndex < lessonSequence.length - 1 ? lessonSequence[currentIndex + 1] : null

  const handlePreviousLesson = () => {
    if (previousLesson) {
      navigate(`/courses/${courseId}/lesson/${previousLesson}`)
    }
  }

  const handleNextLesson = () => {
    if (nextLesson) {
      navigate(`/courses/${courseId}/lesson/${nextLesson}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Back Button */}
        <div className="mb-6">
          <Link to={`/courses/${courseId}`}>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Course
            </Button>
          </Link>
        </div>

        {/* Lesson Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="mb-4">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Chapter {lesson.chapterNumber}
            </span>
          </div>

          <div className="flex items-start justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
            <div className="flex items-center gap-2 text-gray-500">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{lesson.duration}</span>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{lesson.content.heading}</h2>

          {/* Lesson Content */}
          <div className="prose prose-lg max-w-none">
            {lesson.content.sections.map((section, index) => (
              <div key={index}>{renderContent(section)}</div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={handlePreviousLesson} disabled={!previousLesson}>
            Previous Lesson
          </Button>
          <Button onClick={handleNextLesson} disabled={!nextLesson}>
            Next Lesson
          </Button>
        </div>
      </div>
    </div>
  )
}
