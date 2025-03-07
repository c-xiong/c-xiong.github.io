import React, { useState, useEffect } from "react";
import {
  Mail,
  Github,
  ExternalLink,
  FolderOpen,
  Sun,
  Moon,
  Linkedin,
} from "lucide-react";
import TypingAnimation from "./components/TypingAnimation";
import './App.css'

const ProjectCard = ({ title, description, techStack, link, github }) => (
  <div className="project-card">
    <div className="project-header">
      <FolderOpen className="icon" />
      <h3>{title}</h3>
    </div>
    <p className="project-description">{description}</p>
    <p className="project-tech">
      <span className="tech-label">Technologies:</span> {techStack}
    </p>
    <div className="project-links">
      <a href={github} className="project-link">
        <Github className="icon" />
        GitHub Repository
      </a>
      {link && (
        <a href={link} className="project-link">
          <ExternalLink className="icon" />
          Live Demo
        </a>
      )}
    </div>
  </div>
);

const HomePage = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("darkMode") === "true" ||
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    }
    return false;
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "projects", "contact"];
      let currentSection = "home";

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 0) {
            currentSection = section;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset;
      
      const scrollPosition = offsetPosition - navHeight;

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
      
      setActiveSection(id);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`page ${darkMode ? 'dark' : ''}`}>
      <header>
        <nav>
          <div className="nav-container">
            <button
              onClick={toggleDarkMode}
              className="theme-toggle"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="icon" />
              ) : (
                <Moon className="icon" />
              )}
            </button>

            <ul>
              {["home", "projects"].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => scrollTo(section)}
                    className={`nav-link ${activeSection === section ? 'active' : ''}`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                </li>
              ))}
            </ul>

            <div className="nav-spacer"></div>
          </div>
        </nav>
      </header>

      <main>
        <section id="home">
          <div className="container">
            <div className="profile-section">
              <div className="profile-header">
                <img
                  src="/images/avar.jpg"
                  alt="Chenfei Xiong"
                  className="profile-image"
                />
                <h1>
                  <TypingAnimation text="Chenfei Xiong" speed={150} />
                </h1>
              </div>
            </div>

            <div className="info-section">
              <div className="grid">
                <div className="education-section">
                  <h3>Education</h3>
                  <ul className="timeline">
                    <li className="timeline-item">
                      <p className="school-name">University of Zurich</p>
                      <p className="degree">MA in Computational Linguistics and Language Technology</p>
                      <p className="year">2022 - Present</p>
                    </li>
                    <li className="timeline-item">
                      <p className="school-name">Huazhong University of Science and Technology</p>
                      <p className="degree">BEng in Material Science and Engineering</p>
                      <p className="year">2018 - 2022</p>
                    </li>
                  </ul>
                </div>

                <div className="contact-section">
                  <h3>Contact</h3>
                  <div className="social-links">
                    <a
                      href="mailto:chenfei.xiong@outlook.com"
                      className="social-link"
                      aria-label="Email"
                    >
                      <Mail className="icon" />
                    </a>
                    <a
                      href="https://github.com/c-xiong"
                      className="social-link"
                      aria-label="GitHub"
                    >
                      <Github className="icon" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/chenfei-xiong/"
                      className="social-link"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="icon" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects">
          <div className="container">
            <h2>Projects</h2>
            <div className="projects-grid">
              <ProjectCard
                title="Hunspell Live - Spell Checking Tool"
                description="An open-source customized spell-checking tool that enables real-time spell checking using custom Hunspell dictionaries. Built for developers and linguistic researchers."
                techStack="Python, TypeScript, Django, React, Docker, PostgreSQL, JWT"
                github="https://github.com/c-xiong/hunspell_live"
                link="https://hunspell.chenfeixiong.com/"
              />
              <ProjectCard
                title="Jobify - Job tracking app"
                description="A comprehensive job application tracking tool built with modern web technologies."
                techStack="React, NodeJS, ExpressJS, MongoDB, JWT"
                github="https://github.com/c-xiong/Jobify"
                link="https://jobify-devf.onrender.com/"
              />
              <ProjectCard
                title="JoyJoin - Event platform"
                description="A microservices-based event management platform for organizing and participating in events."
                techStack="Java, Spring Boot, Vue.js, PostgreSQL, Docker"
                github="https://github.com/c-xiong/JoyJoin"
              />
              <ProjectCard
                title="Stratego - Online Game"
                description="Digital adaptation of the classic board game Stratego with online versus."
                techStack="Java, Spring Boot, React, WebSocket"
                github="https://github.com/sopra-fs23-group-22/sopra-fs23-group-22-client"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
