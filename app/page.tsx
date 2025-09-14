"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, Menu, X } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import type { HTMLSection } from "react"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [typedText, setTypedText] = useState("")
  const [currentHobbyIndex, setCurrentHobbyIndex] = useState(0)
  const [hobbyTypedText, setHobbyTypedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const fullText = "Data Analysis & Machine Learning Enthusiast"
  const hobbies = ["reading books", "listening to pop music", "learning to cook"]

  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const workRef = useRef<HTMLSection>(null)
  const skillsRef = useRef<HTMLSection>(null)

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!visibleSections.has("about")) return

    const currentHobby = hobbies[currentHobbyIndex]

    if (!isTyping && !isDeleting) {
      // Start typing after a pause
      const startTimer = setTimeout(() => {
        setIsTyping(true)
      }, 500)
      return () => clearTimeout(startTimer)
    }

    if (isTyping && !isDeleting) {
      // Typing animation
      if (hobbyTypedText.length < currentHobby.length) {
        const typeTimer = setTimeout(() => {
          setHobbyTypedText(currentHobby.slice(0, hobbyTypedText.length + 1))
        }, 100)
        return () => clearTimeout(typeTimer)
      } else {
        // Finished typing, wait then start deleting
        const pauseTimer = setTimeout(() => {
          setIsDeleting(true)
        }, 2000)
        return () => clearTimeout(pauseTimer)
      }
    }

    if (isDeleting) {
      // Deleting animation
      if (hobbyTypedText.length > 0) {
        const deleteTimer = setTimeout(() => {
          setHobbyTypedText(hobbyTypedText.slice(0, -1))
        }, 50)
        return () => clearTimeout(deleteTimer)
      } else {
        // Finished deleting, move to next hobby
        setIsDeleting(false)
        setIsTyping(false)
        setCurrentHobbyIndex((prev) => (prev + 1) % hobbies.length)
      }
    }
  }, [visibleSections, hobbyTypedText, currentHobbyIndex, isTyping, isDeleting, hobbies])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 },
    )

    const sections = [aboutRef.current, workRef.current, skillsRef.current].filter(Boolean)
    sections.forEach((section) => section && observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "certificate") {
      window.location.href = "/certificates"
      return
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-foreground">Immanuel Simarsoit</h1>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <div className="hidden md:flex space-x-8">
              {[
                { label: "About", id: "about" },
                { label: "Work", id: "work" },
                { label: "Certificate", id: "certificate" },
                { label: "Experience", id: "experience" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>
          </div>

          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="py-4 space-y-2">
              {[
                { label: "About", id: "about" },
                { label: "Work", id: "work" },
                { label: "Certificate", id: "certificate" },
                { label: "Experience", id: "experience" },
              ].map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-2 text-slate-900 dark:text-slate-100 hover:text-primary hover:bg-muted rounded-lg transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance min-h-[1.2em]">
              {typedText}
              <span className="animate-pulse">|</span>
            </h2>
            <p
              className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "2s" }}
            >
              Turning data into valuable insights through analysis, visualization, and machine learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "2.5s" }}>
              <Button
                size="lg"
                className="group hover:scale-105 transition-all duration-300 hover:shadow-lg"
                onClick={() => scrollToSection("work")}
              >
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="hover:scale-105 transition-all duration-300 bg-transparent"
                asChild
              >
                <a href="https://drive.google.com/file/d/1ASJPImvuhwC8dKzzKEVJMww5kcVUJ-my/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Download CV
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className={`py-20 px-6 bg-muted/30 transition-all duration-1000 ${
          visibleSections.has("about") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-3">
                <h3 className="text-3xl font-bold text-foreground">Hi, </h3>
                <h3 className="text-3xl font-bold text-foreground">I'm Immanuel Simarsoit </h3>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                I have a strong passion for data management. I enjoy working with raw data, transforming it into
                meaningful information, and generating insights that drive decision-making. With a keen interest in
                technology, I am enthusiastic about solving problems and creating data-driven solutions.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed min-h-[1.5em]">
                In my free time I enjoy{" "}
                <span className="text-primary font-medium">
                  {hobbyTypedText}
                  <span className="animate-pulse">|</span>
                </span>
                .
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com/immanuel1210" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:scale-110 hover:shadow-md transition-all duration-300 bg-transparent"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                </a>
                <a href="https://www.linkedin.com/in/immanuel-simarsoit/" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:scale-110 hover:shadow-md transition-all duration-300 bg-transparent"
                  >
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-square rounded-2xl overflow-hidden group-hover:scale-105 transition-all duration-500 group-hover:shadow-2xl">
                <img
                  src="/profile-photo.jpg"
                  alt="Immanuel Simarsoit on a boat with turquoise water and tropical forest background"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section
        id="work"
        ref={workRef}
        className={`py-20 px-6 transition-all duration-1000 ${
          visibleSections.has("work") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Featured Work</h3>
          <div className="flex justify-center">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
              {[
                {
                  title: "Time Series Forecasting of Gold (USD) Prices with LSTM",
                  description:
                    "Developed a time series forecasting model to predict Gold-USD prices using 10 years of historical data with LSTM.",
                  tech: ["ML", "Python", "LSTM"],
                  image: "/gold-prediction-illustration.jpeg",
                  link: "https://github.com/immanuel1210/Prediksi-Harga-Emas-menggunakan-metode-LSTM",
                },
                {
                  title: "Risk, Return, and Liquidity Analysis of Banking Stocks vs. IHSG for the Period 2020–2025",
                  description:
                    "Comparative performance analysis of three Indonesian state-owned banks (BMRI, BBRI, BBNI) compared to the Composite Stock Price Index (IHSG) from 2020 to 2025",
                  tech: ["Excel", "Data Analysis", "Data Visualization"],
                  image: "/chart.jpg",
                  link: "https://github.com/immanuel1210/Analisis-Risiko-Return-dan-Likuiditas-Saham-Perbankan-vs-IHSG-Periode-2020---2025",
                },
              ].map((project, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-500 border-border hover:-translate-y-2 hover:scale-105"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="aspect-video bg-muted rounded-t-lg overflow-hidden relative">
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                      <ExternalLink className="h-8 w-8 text-white" />
                    </div>
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold text-foreground mb-2">{project.title}</h4>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-auto group/btn hover:text-primary transition-colors"
                      >
                        View Project
                        <ExternalLink className="ml-2 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        ref={skillsRef}
        className={`py-20 px-6 bg-muted/30 transition-all duration-1000 ${
          visibleSections.has("skills") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Skills & Technologies</h3>
          <div className="flex justify-center">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  category: "Analysis",
                  skills: ["Data Analysis", "Data Visualization", "Data Scientist", "Machine Learning"],
                },
                {
                  category: "Tools",
                  skills: ["Python", "Microsoft Office", "MySQL", "Power BI"],
                },
                {
                  category: "Soft Skill",
                  skills: ["Adaptability", "Responsibility", "Critical Thinking", "Problem Solving"],
                },
              ].map((skillGroup, index) => (
                <Card
                  key={index}
                  className="border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {skillGroup.category}
                    </h4>
                    <ul className="space-y-2">
                      {skillGroup.skills.map((skill, skillIndex) => (
                        <li
                          key={skill}
                          className="text-muted-foreground flex items-center hover:text-foreground transition-colors cursor-default"
                          style={{ animationDelay: `${index * 150 + skillIndex * 100}ms` }}
                        >
                          <div className="w-2 h-2 bg-primary rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-foreground mb-6">Let's Work Together</h3>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Have a project in mind? I'd love to hear about it and discuss how we can bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group hover:scale-105 hover:shadow-lg transition-all duration-300" asChild>
              <a href="https://github.com/immanuel1210" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                View Full Portfolio
              </a>
            </Button>
            <Button size="lg" className="group hover:scale-105 hover:shadow-lg transition-all duration-300" asChild>
              <a href="mailto:immanuelsimarsoit@gmail.com">
                <Mail className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                Get In Touch
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-125 hover:-translate-y-1"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/immanuel-simarsoit/"
                className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-125 hover:-translate-y-1"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-125 hover:-translate-y-1"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
