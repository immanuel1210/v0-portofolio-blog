"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Download, Calendar, Award } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function Certificates() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleCards((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.1 },
    )

    const cards = document.querySelectorAll("[data-index]")
    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  const certificates = [
    {
      title: "Data Science Professional Certificate",
      issuer: "IBM",
      date: "2024",
      description:
        "Comprehensive program covering data science methodologies, machine learning, and data visualization techniques.",
      skills: ["Python", "Machine Learning", "Data Visualization", "SQL"],
      image: "/data-science-certificate.png",
      credentialUrl: "#",
      type: "Professional",
    },
    {
      title: "Machine Learning Specialization",
      issuer: "Stanford University",
      date: "2023",
      description: "Advanced coursework in supervised learning, unsupervised learning, and neural networks.",
      skills: ["TensorFlow", "Neural Networks", "Deep Learning", "Python"],
      image: "/machine-learning-certificate.jpg",
      credentialUrl: "#",
      type: "Specialization",
    },
    {
      title: "Power BI Data Analyst Associate",
      issuer: "Microsoft",
      date: "2023",
      description: "Certification in data modeling, visualization, and business intelligence using Power BI.",
      skills: ["Power BI", "DAX", "Data Modeling", "Business Intelligence"],
      image: "/power-bi-certificate.jpg",
      credentialUrl: "#",
      type: "Associate",
    },
    {
      title: "SQL for Data Science",
      issuer: "University of California, Davis",
      date: "2022",
      description: "Comprehensive training in SQL for data analysis and database management.",
      skills: ["SQL", "Database Design", "Data Analysis", "MySQL"],
      image: "/sql-certificate.jpg",
      credentialUrl: "#",
      type: "Course",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="hover:scale-105 transition-all duration-300">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-foreground">Certificates</h1>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-6">
            <Award className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Professional Certificates
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto">
            A collection of my professional certifications and achievements in data science, machine learning, and
            business intelligence.
          </p>
        </div>
      </section>

      {/* Certificates Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {certificates.map((cert, index) => (
              <Card
                key={index}
                data-index={index}
                className={`group hover:shadow-xl transition-all duration-700 border-border hover:-translate-y-2 ${
                  visibleCards.has(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{
                  animationDelay: `${index * 200}ms`,
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                    <ExternalLink className="h-8 w-8 text-white" />
                  </div>
                  <img
                    src={cert.image || "/placeholder.svg"}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                      {cert.type}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-primary font-medium">{cert.issuer}</p>
                    </div>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {cert.date}
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed">{cert.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto group/btn hover:text-primary transition-colors flex-1"
                      asChild
                    >
                      <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                        View Credential
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto group/btn hover:text-primary transition-colors"
                    >
                      <Download className="mr-2 h-3 w-3 group-hover/btn:translate-y-1 transition-transform" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-foreground mb-6">Interested in My Work?</h3>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Let's discuss how my certified skills can contribute to your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="group hover:scale-105 hover:shadow-lg transition-all duration-300">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Portfolio
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="hover:scale-105 transition-all duration-300 bg-transparent"
              asChild
            >
              <a href="mailto:immanuelsimarsoit@gmail.com">Contact Me</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
