import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function AdminDashboardPage() {
  const { logout } = useAuth()
  const [activeTab, setActiveTab] = useState('create')
  const [courses, setCourses] = useState(() => {
    return JSON.parse(localStorage.getItem('courses') || '[]')
  })

  // State for course creation sections
  const [currentSection, setCurrentSection] = useState(1)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [courseData, setCourseData] = useState({
    basicInfo: {
      id: '',
      title: '',
      description: '',
      duration: '',
      students: 0,
      rating: 0,
      level: 'Beginner',
      category: 'Web Development',
      image: ''
    },
    contentStructure: [
      {
        id: '1',
        title: '',
        topics: [{ id: '1.1', title: '', duration: '10 min' }]
      }
    ],
    lessonContent: {}
  })

  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target
    setCourseData(prev => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, [name]: value }
    }))
  }

  const addChapter = () => {
    const newChapterId = String(courseData.contentStructure.length + 1)
    setCourseData(prev => ({
      ...prev,
      contentStructure: [...prev.contentStructure, {
        id: newChapterId,
        title: '',
        topics: [{ id: `${newChapterId}.1`, title: '', duration: '10 min' }]
      }]
    }))
  }

  const addTopic = (chapterIndex) => {
    setCourseData(prev => {
      const chapter = prev.contentStructure[chapterIndex]
      const newTopicId = `${chapter.id}.${chapter.topics.length + 1}`
      const updatedChapter = {
        ...chapter,
        topics: [...chapter.topics, { id: newTopicId, title: '', duration: '10 min' }]
      }
      const updatedStructure = [...prev.contentStructure]
      updatedStructure[chapterIndex] = updatedChapter
      return { ...prev, contentStructure: updatedStructure }
    })
  }

  const handleChapterChange = (chapterIndex, value) => {
    setCourseData(prev => {
      const updatedStructure = [...prev.contentStructure]
      updatedStructure[chapterIndex] = { ...updatedStructure[chapterIndex], title: value }
      return { ...prev, contentStructure: updatedStructure }
    })
  }

  const handleTopicChange = (chapterIndex, topicIndex, field, value) => {
    setCourseData(prev => {
      const updatedStructure = [...prev.contentStructure]
      const updatedTopics = [...updatedStructure[chapterIndex].topics]
      updatedTopics[topicIndex] = { ...updatedTopics[topicIndex], [field]: value }
      updatedStructure[chapterIndex] = {
        ...updatedStructure[chapterIndex],
        topics: updatedTopics
      }
      return { ...prev, contentStructure: updatedStructure }
    })
  }

  const handleLessonContentChange = (chapterId, topicId, content) => {
    setCourseData(prev => ({
      ...prev,
      lessonContent: {
        ...prev.lessonContent,
        [topicId]: {
          chapterNumber: parseInt(chapterId),
          title: content.title,
          duration: content.duration,
          content: content.content
        }
      }
    }))
  }

  const saveCourse = () => {
    const newCourse = {
      ...courseData.basicInfo,
      content: courseData.contentStructure,
      lessons: courseData.lessonContent
    }
    const updatedCourses = [...courses, newCourse]
    localStorage.setItem('courses', JSON.stringify(updatedCourses))
    setCourses(updatedCourses)
    resetForm()
  }

  const updateCourse = () => {
    if (!selectedCourse) return
    const updatedCourses = courses.map(course =>
      course.id === selectedCourse.id ? {
        ...courseData.basicInfo,
        content: courseData.contentStructure,
        lessons: courseData.lessonContent
      } : course
    )
    localStorage.setItem('courses', JSON.stringify(updatedCourses))
    setCourses(updatedCourses)
    resetForm()
  }

  const deleteCourse = (courseId) => {
    const updatedCourses = courses.filter(course => course.id !== courseId)
    localStorage.setItem('courses', JSON.stringify(updatedCourses))
    setCourses(updatedCourses)
  }

  const resetForm = () => {
    setCurrentSection(1)
    setSelectedCourse(null)
    setCourseData({
      basicInfo: {
        id: '',
        title: '',
        description: '',
        duration: '',
        students: 0,
        rating: 0,
        level: 'Beginner',
        category: 'Web Development',
        image: ''
      },
      contentStructure: [
        {
          id: '1',
          title: '',
          topics: [{ id: '1.1', title: '', duration: '10 min' }]
        }
      ],
      lessonContent: {}
    })
  }

  const selectCourseForUpdate = (course) => {
    setSelectedCourse(course)
    setCourseData({
      basicInfo: {
        id: course.id,
        title: course.title,
        description: course.description,
        duration: course.duration,
        students: course.students,
        rating: course.rating,
        level: course.level,
        category: course.category,
        image: course.image
      },
      contentStructure: course.content || [],
      lessonContent: course.lessons || {}
    })
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with navigation */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Main navigation tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            className={`px-4 py-2 rounded ${activeTab === 'create' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => {
              setActiveTab('create')
              resetForm()
            }}
          >
            Create Course
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === 'update' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('update')}
          >
            Update Course
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === 'delete' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('delete')}
          >
            Delete Course
          </button>
        </div>

        {/* Create/Update Course Form */}
        {(activeTab === 'create' || (activeTab === 'update' && selectedCourse)) && (
          <div className="space-y-8">
            {/* Section navigation */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <button
                  className={`px-4 py-2 rounded ${currentSection === 1 ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setCurrentSection(1)}
                >
                  1. Basic Information
                </button>
                <button
                  className={`px-4 py-2 rounded ${currentSection === 2 ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setCurrentSection(2)}
                >
                  2. Course Content
                </button>
                <button
                  className={`px-4 py-2 rounded ${currentSection === 3 ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setCurrentSection(3)}
                >
                  3. Lesson Content
                </button>
              </div>
            </div>

            {/* Section 1: Basic Information */}
            {currentSection === 1 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Basic Course Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="id"
                    placeholder="Course ID"
                    value={courseData.basicInfo.id}
                    onChange={handleBasicInfoChange}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="title"
                    placeholder="Course Title"
                    value={courseData.basicInfo.title}
                    onChange={handleBasicInfoChange}
                    className="border p-2 rounded"
                  />
                  <textarea
                    name="description"
                    placeholder="Course Description"
                    value={courseData.basicInfo.description}
                    onChange={handleBasicInfoChange}
                    className="border p-2 rounded col-span-2"
                    rows="4"
                  />
                  <input
                    type="text"
                    name="duration"
                    placeholder="Duration (e.g., 8 weeks)"
                    value={courseData.basicInfo.duration}
                    onChange={handleBasicInfoChange}
                    className="border p-2 rounded"
                  />
                  <input
                    type="number"
                    name="students"
                    placeholder="Number of Students"
                    value={courseData.basicInfo.students}
                    onChange={handleBasicInfoChange}
                    className="border p-2 rounded"
                  />
                  <input
                    type="number"
                    name="rating"
                    placeholder="Rating (0-5)"
                    value={courseData.basicInfo.rating}
                    onChange={handleBasicInfoChange}
                    className="border p-2 rounded"
                    min="0"
                    max="5"
                    step="0.1"
                  />
                  <select
                    name="level"
                    value={courseData.basicInfo.level}
                    onChange={handleBasicInfoChange}
                    className="border p-2 rounded"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                  <select
                    name="category"
                    value={courseData.basicInfo.category}
                    onChange={handleBasicInfoChange}
                    className="border p-2 rounded"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Data Science">Data Science</option>
                  </select>
                  <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={courseData.basicInfo.image}
                    onChange={handleBasicInfoChange}
                    className="border p-2 rounded col-span-2"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => setCurrentSection(2)}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Section 2: Course Content Structure */}
            {currentSection === 2 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Course Content Structure</h2>
                {courseData.contentStructure.map((chapter, chapterIndex) => (
                  <div key={chapter.id} className="border p-4 rounded space-y-4">
                    <div className="flex items-center space-x-4">
                      <input
                        type="text"
                        placeholder={`Chapter ${chapter.id} Title`}
                        value={chapter.title}
                        onChange={(e) => handleChapterChange(chapterIndex, e.target.value)}
                        className="border p-2 rounded flex-grow"
                      />
                    </div>
                    <div className="pl-8 space-y-2">
                      {chapter.topics.map((topic, topicIndex) => (
                        <div key={topic.id} className="flex items-center space-x-4">
                          <input
                            type="text"
                            placeholder={`Topic ${topic.id} Title`}
                            value={topic.title}
                            onChange={(e) => handleTopicChange(chapterIndex, topicIndex, 'title', e.target.value)}
                            className="border p-2 rounded flex-grow"
                          />
                          <input
                            type="text"
                            placeholder="Duration"
                            value={topic.duration}
                            onChange={(e) => handleTopicChange(chapterIndex, topicIndex, 'duration', e.target.value)}
                            className="border p-2 rounded w-32"
                          />
                        </div>
                      ))}
                      <button
                        onClick={() => addTopic(chapterIndex)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        + Add Topic
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={addChapter}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  + Add Chapter
                </button>
                <div className="flex justify-end">
                  <button
                    onClick={() => setCurrentSection(3)}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Section 3: Lesson Content */}
            {currentSection === 3 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Lesson Content</h2>
                {courseData.contentStructure.map(chapter => (
                  <div key={chapter.id} className="border p-4 rounded space-y-4">
                    <h3 className="font-semibold text-xl">
                      Chapter {chapter.id}: {chapter.title}
                    </h3>
                    {chapter.topics.map(topic => (
                      <div key={topic.id} className="pl-8 space-y-4 border-l-2 border-gray-200">
                        <h4 className="font-medium text-lg">
                          Topic {topic.id}: {topic.title} ({topic.duration})
                        </h4>
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded">
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Content Type
                              </label>
                              <select
                                className="border p-2 rounded w-full"
                                value={courseData.lessonContent[topic.id]?.content?.sections?.[0]?.type || 'paragraph'}
                                onChange={(e) => {
                                  const type = e.target.value
                                  handleLessonContentChange(chapter.id, topic.id, {
                                    title: topic.title,
                                    duration: topic.duration,
                                    content: {
                                      heading: topic.title,
                                      sections: [
                                        {
                                          type,
                                          content: courseData.lessonContent[topic.id]?.content?.sections?.[0]?.content || ''
                                        }
                                      ]
                                    }
                                  })
                                }}
                              >
                                <option value="paragraph">Paragraph</option>
                                <option value="heading">Heading</option>
                                <option value="list">List</option>
                                <option value="code">Code</option>
                              </select>
                            </div>
                            <textarea
                              placeholder="Enter lesson content here..."
                              value={courseData.lessonContent[topic.id]?.content?.sections?.[0]?.content || ''}
                              onChange={(e) => {
                                const type = courseData.lessonContent[topic.id]?.content?.sections?.[0]?.type || 'paragraph'
                                handleLessonContentChange(chapter.id, topic.id, {
                                  title: topic.title,
                                  duration: topic.duration,
                                  content: {
                                    heading: topic.title,
                                    sections: [
                                      {
                                        type,
                                        content: e.target.value
                                      }
                                    ]
                                  }
                                })
                              }}
                              className="border p-2 rounded w-full font-mono"
                              rows="6"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
                <div className="flex justify-end">
                  <button
                    onClick={activeTab === 'create' ? saveCourse : updateCourse}
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                  >
                    {activeTab === 'create' ? 'Save Course' : 'Update Course'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Update Course List */}
        {activeTab === 'update' && !selectedCourse && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Select Course to Update</h2>
            {courses.map(course => (
              <div key={course.id} className="border p-4 rounded flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{course.title}</h3>
                  <p className="text-gray-600">{course.description}</p>
                </div>
                <button
                  onClick={() => selectCourseForUpdate(course)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Delete Course List */}
        {activeTab === 'delete' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Delete Courses</h2>
            {courses.map(course => (
              <div key={course.id} className="border p-4 rounded flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{course.title}</h3>
                  <p className="text-gray-600">{course.description}</p>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete "${course.title}"?`)) {
                      deleteCourse(course.id)
                    }
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}