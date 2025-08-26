"use client"

import { useEffect } from "react"

const StructuredData = ({
  pageType,
  title,
  description,
  url,
  courseData,
  projectData,
  faqData,
  breadcrumbs,
  customSchema,
}) => {
  useEffect(() => {
    const generateStructuredData = () => {
      const schemas = []

      // Organization Schema
      schemas.push({
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        name: "Developer's Library",
        description: "Premier online platform for learning programming with free courses and hands-on projects",
        url: window.location.origin,
        logo: `${window.location.origin}/logo.png`,
        sameAs: [
          "https://github.com/developers-library",
          "https://twitter.com/devlibrary",
          "https://linkedin.com/company/developers-library",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+1-555-DEV-LEARN",
          contactType: "customer service",
          availableLanguage: ["English"],
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "US",
        },
      })

      // Website Schema with Search Action
      schemas.push({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Developer's Library",
        description: "Learn programming with 100+ free courses and 500+ hands-on projects",
        url: window.location.origin,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${window.location.origin}/courses?search={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      })

      // Page-specific schemas
      if (pageType === "homepage") {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title || "Developer's Library - Learn Programming with Free Courses",
          description:
            description ||
            "Master programming with 100+ free courses and 500+ hands-on projects. Learn JavaScript, Python, React, Node.js and more.",
          url: url || window.location.href,
          mainEntity: {
            "@type": "ItemList",
            name: "Programming Courses",
            description: "Comprehensive collection of programming courses",
            numberOfItems: 100,
            itemListElement: [
              {
                "@type": "Course",
                name: "JavaScript Fundamentals",
                description: "Learn JavaScript from basics to advanced concepts",
                provider: {
                  "@type": "Organization",
                  name: "Developer's Library",
                },
              },
              {
                "@type": "Course",
                name: "React Development",
                description: "Build modern web applications with React",
                provider: {
                  "@type": "Organization",
                  name: "Developer's Library",
                },
              },
            ],
          },
        })
      }

      if (pageType === "courses") {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: title || "Programming Courses - Developer's Library",
          description: description || "Browse our comprehensive collection of programming courses",
          url: url || window.location.href,
          mainEntity: {
            "@type": "ItemList",
            name: "Course Catalog",
            numberOfItems: 100,
          },
        })
      }

      if (pageType === "course" && courseData) {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "Course",
          name: courseData.name,
          description: courseData.description,
          provider: {
            "@type": "Organization",
            name: "Developer's Library",
          },
          educationalLevel: courseData.level || "Beginner",
          courseCode: courseData.id,
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "online",
            instructor: {
              "@type": "Person",
              name: courseData.instructor || "Expert Instructor",
            },
          },
          aggregateRating: courseData.rating
            ? {
                "@type": "AggregateRating",
                ratingValue: courseData.rating,
                ratingCount: courseData.students || 1000,
              }
            : undefined,
        })
      }

      if (pageType === "projects") {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: title || "Programming Projects - Developer's Library",
          description: description || "Explore hands-on programming projects to build your portfolio",
          url: url || window.location.href,
          mainEntity: {
            "@type": "ItemList",
            name: "Project Portfolio",
            numberOfItems: 500,
          },
        })
      }

      if (pageType === "faq" && faqData) {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          name: title || "Frequently Asked Questions",
          description: description || "Common questions about Developer's Library courses and platform",
          url: url || window.location.href,
          mainEntity: faqData.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        })
      }

      if (pageType === "contact") {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: title || "Contact Us - Developer's Library",
          description: description || "Get in touch with Developer's Library team",
          url: url || window.location.href,
        })
      }

      // Breadcrumbs Schema
      if (breadcrumbs && breadcrumbs.length > 0) {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.name,
            item: crumb.url,
          })),
        })
      }

      // Custom Schema
      if (customSchema) {
        if (Array.isArray(customSchema)) {
          schemas.push(...customSchema)
        } else {
          schemas.push(customSchema)
        }
      }

      return schemas
    }

    // Remove existing structured data
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]')
    existingScripts.forEach((script) => {
      if (script.textContent.includes("Developer's Library")) {
        script.remove()
      }
    })

    // Add new structured data
    const schemas = generateStructuredData()
    schemas.forEach((schema) => {
      const script = document.createElement("script")
      script.type = "application/ld+json"
      script.textContent = JSON.stringify(schema)
      document.head.appendChild(script)
    })

    // Cleanup function
    return () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]')
      scripts.forEach((script) => {
        if (script.textContent.includes("Developer's Library")) {
          script.remove()
        }
      })
    }
  }, [pageType, title, description, url, courseData, projectData, faqData, breadcrumbs, customSchema])

  return null
}

export default StructuredData
