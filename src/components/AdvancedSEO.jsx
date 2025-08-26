"use client"

import { useEffect } from "react"

export default function AdvancedSEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  structuredData,
  type = "website",
  breadcrumbs = [],
  author,
  publishedTime,
  modifiedTime,
}) {
  const siteUrl = "https://developers-library.com"
  const fullTitle = title
    ? `${title} | Developer's Library`
    : "Developer's Library - Master Programming with Free Courses & Projects"
  const fullDescription =
    description ||
    "Learn JavaScript, Python, React, Node.js and more with our comprehensive interactive courses and hands-on projects. Join 50,000+ developers worldwide - completely FREE!"
  const fullCanonicalUrl = canonicalUrl || siteUrl
  const fullOgImage = ogImage || `${siteUrl}/og-image.png`

  useEffect(() => {
    // Helper to generate enhanced structured data
    const getEnhancedStructuredData = () => {
      const baseSchemas = [
        // Organization Schema
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
          name: "Developer's Library",
          url: siteUrl,
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/logo.png`,
            width: 512,
            height: 512,
          },
          description: fullDescription,
          foundingDate: "2024",
          founder: {
            "@type": "Person",
            name: "Developer's Library Team",
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+1-555-0123",
            contactType: "customer service",
            email: "support@developers-library.com",
            availableLanguage: ["English"],
          },
          sameAs: [
            "https://twitter.com/devslibrary",
            "https://github.com/developers-library",
            "https://linkedin.com/company/developers-library",
          ],
        },
        // WebSite Schema with Search Action
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          url: siteUrl,
          name: "Developer's Library",
          description: fullDescription,
          publisher: {
            "@id": `${siteUrl}/#organization`,
          },
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${siteUrl}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        },
        // Educational Organization Schema
        {
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "@id": `${siteUrl}/#educational-organization`,
          name: "Developer's Library",
          url: siteUrl,
          description: fullDescription,
          educationalCredentialAwarded: "Certificate of Completion",
          hasCredential: {
            "@type": "EducationalOccupationalCredential",
            name: "Programming Certificate",
            credentialCategory: "certificate",
          },
        },
      ];

      // Add breadcrumbs if provided
      if (breadcrumbs.length > 0) {
        baseSchemas.push({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.name,
            item: `${siteUrl}${crumb.url}`,
          })),
        });
      }

      // Add custom structured data if provided
      if (structuredData) {
        if (Array.isArray(structuredData)) {
          baseSchemas.push(...structuredData);
        } else {
          baseSchemas.push(structuredData);
        }
      }

      return baseSchemas;
    };

    // Update document title
    document.title = fullTitle

    // Update meta tags
    const updateMetaTag = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
      let meta = document.querySelector(selector)
      if (!meta) {
        meta = document.createElement("meta")
        if (property) {
          meta.setAttribute("property", name)
        } else {
          meta.setAttribute("name", name)
        }
        document.head.appendChild(meta)
      }
      meta.setAttribute("content", content)
    }

    // Update link tags
    const updateLinkTag = (rel, href) => {
      let link = document.querySelector(`link[rel="${rel}"]`)
      if (!link) {
        link = document.createElement("link")
        link.setAttribute("rel", rel)
        document.head.appendChild(link)
      }
      link.setAttribute("href", href)
    }

    // Basic meta tags
    updateMetaTag("description", fullDescription)
    if (keywords) updateMetaTag("keywords", keywords)
    updateMetaTag("robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1")
    updateMetaTag("author", author || "Developer's Library")
    updateMetaTag("viewport", "width=device-width, initial-scale=1.0")
    updateMetaTag("theme-color", "#3b82f6")
    updateMetaTag("msapplication-TileColor", "#3b82f6")

    updateMetaTag("og:type", type, true)
    updateMetaTag("og:title", fullTitle, true)
    updateMetaTag("og:description", fullDescription, true)
    updateMetaTag("og:url", fullCanonicalUrl, true)
    updateMetaTag("og:image", fullOgImage, true)
    updateMetaTag("og:image:width", "1200", true)
    updateMetaTag("og:image:height", "630", true)
    updateMetaTag("og:site_name", "Developer's Library", true)
    updateMetaTag("og:locale", "en_US", true)
    if (publishedTime) updateMetaTag("article:published_time", publishedTime, true)
    if (modifiedTime) updateMetaTag("article:modified_time", modifiedTime, true)

    updateMetaTag("twitter:card", "summary_large_image")
    updateMetaTag("twitter:site", "@devslibrary")
    updateMetaTag("twitter:creator", "@devslibrary")
    updateMetaTag("twitter:title", fullTitle)
    updateMetaTag("twitter:description", fullDescription)
    updateMetaTag("twitter:image", fullOgImage)

    updateMetaTag("application-name", "Developer's Library")
    updateMetaTag("apple-mobile-web-app-title", "Developer's Library")
    updateMetaTag("format-detection", "telephone=no")

    // Canonical URL
    updateLinkTag("canonical", fullCanonicalUrl)

    const enhancedStructuredData = getEnhancedStructuredData()

    // Remove existing structured data scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]')
    existingScripts.forEach((script) => script.remove())

    // Add new structured data
    enhancedStructuredData.forEach((schema, index) => {
      const script = document.createElement("script")
      script.setAttribute("type", "application/ld+json")
      script.setAttribute("data-schema-id", `schema-${index}`)
      script.textContent = JSON.stringify(schema)
      document.head.appendChild(script)
    })

    // Cleanup function
    return () => {
      // Cleanup is handled by React's effect system
    }
  }, [
    fullTitle,
    fullDescription,
    keywords,
    fullCanonicalUrl,
    fullOgImage,
    structuredData,
    type,
    breadcrumbs,
    author,
    publishedTime,
    modifiedTime,
  ])

  return null
}
