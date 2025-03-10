import React, { useState, useEffect } from "react";
import {
  Mail,
  Github,
  ExternalLink,
  FolderOpen,
  Sun,
  Moon,
  Linkedin,
  Menu,
  X,
} from "lucide-react";
import TypingAnimation from "./components/TypingAnimation";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";

const ProjectCard = ({ title, description, techStack, link, github }) => (
  <div className="project-card" data-aos="fade-up">
    <div className="project-header">
      <FolderOpen className="project-icon" />
      <h3>{title}</h3>
    </div>
    <p className="project-description">{description}</p>
    <div className="project-footer">
      <div className="project-tech">{techStack}</div>
      <div className="project-links">
        <a
          href={github}
          className="project-link"
          aria-label="GitHub Repository"
        >
          <Github className="icon" />
        </a>
        {link && (
          <a href={link} className="project-link" aria-label="Live Demo">
            <ExternalLink className="icon" />
          </a>
        )}
      </div>
    </div>
  </div>
);
// Bio Section Component
const BioSection = () => {
  return (
    <div className="bio-section" data-aos="fade-up" data-aos-duration="1000">
      <p className="bio-text">
        As a master's student with a strong passion for technology, I bring
        proficiency in JavaScript, Java, and Python, complemented by robust
        full-stack development skills. My academic pursuits have equipped me
        with a solid understanding of computer networks, design patterns, and
        data structures, providing a comprehensive foundation for software
        development.
      </p>
    </div>
  );
};

// Modified Skills Section Component
const SkillsSection = ({ skills }) => {
  return (
    <div
      className="skills-section"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay="200"
    >
      <h3>Skills & Technologies</h3>

      <div className="skills-category">
        <h4>Frontend</h4>
        <div className="skills-grid">
          {skills.frontend.map((skill, index) => (
            <SkillBadge key={skill} skill={skill} delay={index * 50} />
          ))}
        </div>
      </div>

      <div className="skills-category">
        <h4>Backend</h4>
        <div className="skills-grid">
          {skills.backend.map((skill, index) => (
            <SkillBadge key={skill} skill={skill} delay={index * 50} />
          ))}
        </div>
      </div>

      <div className="skills-category">
        <h4>Database & Tools</h4>
        <div className="skills-grid">
          {skills.database.map((skill, index) => (
            <SkillBadge key={skill} skill={skill} delay={index * 50} />
          ))}
        </div>
      </div>

      <div className="skills-category">
        <h4>Other Skills</h4>
        <div className="skills-grid">
          {skills.other.map((skill, index) => (
            <SkillBadge key={skill} skill={skill} delay={index * 50} />
          ))}
        </div>
      </div>
    </div>
  );
};
// Modified Skill Badge Component with delay
const SkillBadge = ({ skill, delay }) => (
  <span className="skill-badge" data-aos="fade-up" data-aos-delay={delay}>
    {skill}
  </span>
);

// Modified Education Section Component
const EducationSection = () => {
  return (
    <div className="education-section">
      <h3>Education</h3>
      <div className="timeline">
        <div
          className="timeline-item"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="timeline-content">
            <h4 className="institution">University of Zurich</h4>
            <p className="degree">
              MA in Computational Linguistics and Language Technology
            </p>
            <p className="year">Sep 2022 - Present</p>
            <p className="location">Zurich, Switzerland</p>
            <div className="courses">
              <p className="courses-title">Key Courses:</p>
              <ul className="courses-list">
                <li>Data Structures and Algorithms</li>
                <li>Software Engineering</li>
                <li>Computer Networks and Distributed Systems</li>
                <li>Large Language Models</li>
                <li>Fundamentals of Software Systems</li>
                <li>Foundations of Data Science</li>
                <li>Software Construction</li>
                <li>Software Engineering Lab</li>
                <li>Advanced Techniques of Machine Translation</li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="timeline-item"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          <div className="timeline-content">
            <h4 className="institution">
              Huazhong University of Science and Technology
            </h4>
            <p className="degree">BEng in Material Science and Engineering</p>
            <p className="year">Sep 2018 - Jun 2022</p>
            <p className="location">Wuhan, China</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this new component after EducationSection
const ExperienceSection = () => {
  return (
    <div className="experience-section">
      <div className="timeline">
        <div
          className="timeline-item"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="timeline-content">
            <h4 className="institution">Sister Global</h4>
            <p className="degree">Software Engineer Intern</p>
            <p className="year">Sep 2024 - Nov 2024</p>
            <p className="location">Remote</p>
          </div>
        </div>

        <div
          className="timeline-item"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          <div className="timeline-content">
            <h4 className="institution">Hong Kong Baptist University</h4>
            <p className="degree">
              Research Assistant in Social Network Analysis
            </p>
            <p className="year">May 2021 - Feb 2022</p>
            <p className="location">Remote</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      // First check if there's a stored preference
      const storedPreference = localStorage.getItem("darkMode");
      if (storedPreference !== null) {
        return storedPreference === "true";
      }
      // If no stored preference, use system preference
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "experience", "projects"];
      let currentSection = "home";

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
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

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Get the computed scroll padding from CSS variable
      const computedStyle = getComputedStyle(document.documentElement);

      // Use different padding values for home vs other sections
      const navHeight =
        id === "home"
          ? parseInt(computedStyle.getPropertyValue("--scroll-padding-home"))
          : parseInt(computedStyle.getPropertyValue("--scroll-padding-other"));

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset;

      const scrollPosition = offsetPosition - navHeight;

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });

      setActiveSection(id);
      setMenuOpen(false); // Close menu after navigation
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Updated skills object with categories
  const skills = {
    frontend: ["React", "Vue", "JavaScript", "TypeScript", "HTML/CSS"],
    backend: ["Java", "Spring Boot", "Python", "Django", "Node.js", "Express"],
    database: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Docker", "Git"],
    other: ["Data Analysis", "Machine Translation", "Large Language Models"],
  };

  return (
    <div className={`page ${darkMode ? "dark" : ""}`}>
      <header>
        <nav>
          <div className="nav-container">
            <button
              onClick={toggleDarkMode}
              className="theme-toggle"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="icon" /> : <Moon className="icon" />}
            </button>

            <button
              className="mobile-menu-toggle"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="icon" /> : <Menu className="icon" />}
            </button>

            <ul className={menuOpen ? "open" : ""}>
              {["home", "about", "experience", "projects"].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => scrollTo(section)}
                    className={`nav-link ${
                      activeSection === section ? "active" : ""
                    }`}
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
            <div className="home-content">
              <div className="profile-section">
                <div className="profile-header">
                  <img
                    src="/images/avatar.jpg"
                    alt="Chenfei Xiong"
                    className="profile-image"
                    data-aos="fade-right"
                    data-aos-duration="1000"
                  />
                  <div className="profile-info">
                    <h1 data-aos="fade-left" data-aos-duration="1000">
                      <TypingAnimation text="Chenfei Xiong" speed={150} />
                    </h1>
                    <div
                      className="social-links"
                      data-aos="fade-up"
                      data-aos-delay="500"
                    >
                      <a
                        href="#"
                        className="social-link"
                        aria-label="Email"
                        onClick={(e) => {
                          e.preventDefault();
                          const user = "chenfei.xiong";
                          const domain = "outlook.com";
                          window.location.href = `mailto:${user}@${domain}`;
                        }}
                        data-email="chenfei[dot]xiong[at]outlook[dot]com"
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
                <BioSection />
              </div>
            </div>
          </div>
        </section>

        <section id="about">
          <div className="container">
            <div className="home-grid">
              <div className="left-column">
                <SkillsSection skills={skills} />
              </div>
              <div className="right-column">
                <EducationSection />
              </div>
            </div>
          </div>
        </section>

        <section id="experience">
          <div className="container">
            <h2>Experience</h2>
            <ExperienceSection />
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
                description="A comprehensive job application tracking tool built with popular MERN stack."
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
