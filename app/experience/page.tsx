"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, MapPin, ExternalLink, Briefcase, Users } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function Experience() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleItems((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.1 },
    )

    const items = document.querySelectorAll("[data-index]")
    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  const workExperiences = [
    {
      title: "Perencanaaan dan Pengelolaan SDM",
      company: "PT. Pelindo Multi Terminal",
      location: "Medan, Indonesia",
      period: "May 2025 - Aug 2025",
      type: "Internship",
      description:
        "During my internship at the Human Resource Planning and Management Division of PT Pelindo Multi Terminal, I was responsible for managing intern data entry and updates in spreadsheets, as well as preparing and consolidating attendance records to ensure accurate allowance payments. I also supported the recruitment process by coordinating interview schedules and preparations, while actively contributing to company activities as a Team Leader, documentation staff, MC, and promotional material designer. In addition, I managed the division’s intern Instagram account by creating and publishing content to highlight internship activities.",
      achievements: [
        "Trusted as Team Leader for the Company Visit Event of Universiti Malaysia Sarawak at Pelindo Multi Terminal, where I coordinated and collaborated with fellow interns to ensure the event was successfully executed.",
        "Appointed as Team Leader for the Tour Talent: Kampung Komunitas Ibu Profesional Sumatera Utara event, collaborating with mentors and fellow interns to organize participant welcoming activities at Bandar Deli Passenger Terminal. Responsible for introducing the company’s roles and functions to participants while ensuring the event was well-coordinated and successfully executed.",
      ],
      skills: ["Data Entry", "Spreadsheet", "Graphic Design", "Figma", "Leadership","Responsibility","Team Work","Time Management","Communication","Problem Solving"],
    }
  ]

  const organizationExperiences = [
    {
      title: "Vice President",
      company: "Data Science Student Association",
      location: "University of North Sumatra",
      period: "Aug 2023 - Jul 2024",
      type: "Leadership",
      description:
        "Led a team of 50+ members in organizing data science workshops, competitions, and networking events. Managed organizational strategy and collaborated with industry partners.",
      achievements: [
        "Organized 8 major workshops with 500+ participants",
        "Increased membership by 60%",
        "Secured partnerships with 5 tech companies",
      ],
      skills: ["Leadership", "Event Management", "Strategic Planning", "Public Speaking", "Team Management"],
    },
    {
      title: "Project Manager",
      company: "Tech Innovation Club",
      location: "University of North Sumatra",
      period: "Jan 2023 - Dec 2023",
      type: "Volunteer",
      description:
        "Managed multiple technology projects and hackathons. Coordinated between different teams and ensured project deliverables met quality standards and deadlines.",
      achievements: [
        "Successfully delivered 12 projects on time",
        "Led team of 25 developers and designers",
        "Won 2nd place in National Hackathon",
      ],
      skills: ["Project Management", "Agile Methodology", "Team Coordination", "Problem Solving", "Communication"],
    },
    {
      title: "Community Outreach Coordinator",
      company: "Digital Literacy Foundation",
      location: "Medan, Indonesia",
      period: "Mar 2022 - Aug 2023",
      type: "Volunteer",
      description:
        "Organized digital literacy programs for underserved communities. Developed curriculum and trained volunteers to teach basic computer skills and digital awareness.",
      achievements: [
        "Trained 200+ community members",
        "Established 3 learning centers",
        "Created comprehensive training materials",
      ],
      skills: ["Community Engagement", "Curriculum Development", "Training", "Social Impact", "Volunteer Management"],
    },
  ]

  const ExperienceSection = ({
    title,
    icon: Icon,
    experiences,
    startIndex,
  }: {
    title: string
    icon: any
    experiences: any[]
    startIndex: number
  }) => (
    <section className="pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <Icon className="h-8 w-8 text-primary" />
          <h3 className="text-3xl font-bold text-foreground">{title}</h3>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => {
            const globalIndex = startIndex + index
            return (
              <div
                key={index}
                data-index={globalIndex}
                className={`transition-all duration-1000 ${
                  visibleItems.has(globalIndex) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ animationDelay: `${globalIndex * 200}ms` }}
              >
                <Card className="group hover:shadow-xl transition-all duration-500 border-border hover:-translate-y-1">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {exp.title}
                          </h4>
                          <Badge
                            variant={
                              exp.type === "Internship"
                                ? "secondary"
                                : exp.type === "Freelance"
                                  ? "outline"
                                  : exp.type === "Leadership"
                                    ? "default"
                                    : "secondary"
                            }
                            className="text-xs"
                          >
                            {exp.type}
                          </Badge>
                        </div>
                        <h5 className="text-lg font-semibold text-muted-foreground mb-3">{exp.company}</h5>
                      </div>
                      <div className="flex flex-col md:items-end gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed">{exp.description}</p>

                    <div className="mb-6">
                      <h6 className="text-sm font-semibold text-foreground mb-3">Key Achievements:</h6>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li
                            key={achIndex}
                            className="text-muted-foreground flex items-start hover:text-foreground transition-colors"
                          >
                            <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 group-hover:scale-150 transition-transform duration-300"></div>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h6 className="text-sm font-semibold text-foreground mb-3">Technologies & Skills:</h6>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm" className="hover:scale-105 transition-all duration-300">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Experience</h1>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">Professional Experience</h2>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
            My journey in data science, analytics, and leadership across professional and organizational roles
          </p>
        </div>
      </section>

      {/* Experience Sections */}
      <div className="px-6">
        <ExperienceSection title="Work Experience" icon={Briefcase} experiences={workExperiences} startIndex={0} />

        <ExperienceSection
          title="Organization Experience"
          icon={Users}
          experiences={organizationExperiences}
          startIndex={workExperiences.length}
        />
      </div>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-foreground mb-6">Ready to Work Together?</h3>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Let's discuss how my experience can contribute to your next project
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group hover:scale-105 hover:shadow-lg transition-all duration-300" asChild>
              <a href="mailto:immanuelsimarsoit@gmail.com">
                <ExternalLink className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                Get In Touch
              </a>
            </Button>
            <Link href="/">
              <Button
                variant="outline"
                size="lg"
                className="hover:scale-105 transition-all duration-300 bg-transparent"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
