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
      title: "Microsoft Certified: Power BI Data Analyst Associate",
      issuer: "Microsoft",
      date: "2024",
      description:
        "The Microsoft Certified: Power BI Data Analyst Associate is a certificate issued by Microsoft to individuals who have completed and passed the PL-300 exam. This exam, held by Microsoft, tests a candidate's understanding of how to use the tools in Power BI.",
      skills: ["Power BI", "Data Visualization", "Data Analysis","Data Storytelling"],
      image: "/Microsoft-Certified.png",
      credentialUrl: "https://drive.google.com/file/d/1M4NJUczGkUJLmvmGKz2RXbgbQwiDPjlX/view?usp=sharing",
      type: "Intermediete",
    },
    {
      title: "Data Science (Fresh Graduate Academy)",
      issuer: "Digital Talent Scolarship - Kominfo",
      date: "2024",
      description: "The Data Science (Fresh Graduate Academy) is a program organized by the Digital Talent Scholarship - Kominfo for undergraduate students and professional workers. It teaches participants how to model, visualize, and analyze data using Power BI tools.",
      skills: ["Power BI", "Data Visualization", "Data Analyzing"],
      image: "/Fresh-Graduate.png",
      credentialUrl: "https://drive.google.com/file/d/1cuhPNfj8nDniP-oR7FwC27qKucFjQF32/view?usp=sharing",
      type: "Intermediete",
    },
    {
      title: "Excel Basics for Data Analysis",
      issuer: "IBM",
      date: "2024",
      description: "Certification in data modeling, visualization, and business intelligence using Power BI.",
      skills: ["Excel", "Data Analysis", "Data Preprocessing", "Data Visualization"],
      image: "/Excel-Basics.png",
      credentialUrl: "https://drive.google.com/file/d/1HEtZj9CuEYR0_IAHYoyQSr7OoCGU44r1/view?usp=sharing",
      type: "Intermediete",
    },
    {
      title: "TOEFL ITP",
      issuer: "ETS",
      date: "2025",
      description: "English Proficiency Test.",
      skills: ["English"],
      image: "/logo-ets.webp",
      credentialUrl: "https://drive.google.com/file/d/1-JdxfCOABJkQzSkzlWdSAIs-hJXdIH7H/view?usp=sharing",
      type: "Intermediete",
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
            Certificates
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto">
            A collection of my certifications and achievements for my skills.
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
