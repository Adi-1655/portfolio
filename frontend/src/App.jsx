import { ThemeProvider } from "./components/ThemeProvider";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Certifications } from "./components/sections/Certifications";
import { Projects } from "./components/sections/Projects";
import { Resume } from "./components/sections/Resume";
import { Contact } from "./components/sections/Contact";
import { HelmetProvider, Helmet } from "react-helmet-async";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminLogin } from "./components/admin/AdminLogin";
import { AdminLayout } from "./components/admin/AdminLayout";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { AdminProjects } from "./components/admin/AdminProjects";
import { AdminExperience } from "./components/admin/AdminExperience";
import { AdminProfile } from "./components/admin/AdminProfile";
import { AdminSkills } from "./components/admin/AdminSkills";
import { AdminCertifications } from "./components/admin/AdminCertifications";
import { AdminMessages } from "./components/admin/AdminMessages";

function PublicPortfolio() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans antialiased">
            <Navigation />
            <main className="flex-1">
                <Hero />
                <About />
                <Skills />
                <Certifications />
                <Projects />
                <Resume />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

function App() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Your Name",
        jobTitle: "Computer Science Student | Software Developer",
        url: "https://yourportfolio.com",
        sameAs: ["https://linkedin.com/in/username", "https://github.com/username"],
    };

    return (
        <HelmetProvider>
            <Helmet>
                <title>Your Name | Software Developer</title>
                <meta name="description" content="Portfolio of a Computer Science student specializing in full-stack development." />
                <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
            </Helmet>
            <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
                <Router>
                    <Routes>
                        <Route path="/" element={<PublicPortfolio />} />
                        <Route path="/admin" element={<AdminLogin />} />
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route path="dashboard" element={<AdminDashboard />} />
                            <Route path="projects" element={<AdminProjects />} />
                            <Route path="experience" element={<AdminExperience />} />
                            <Route path="skills" element={<AdminSkills />} />
                            <Route path="certifications" element={<AdminCertifications />} />
                            <Route path="messages" element={<AdminMessages />} />
                            <Route path="profile" element={<AdminProfile />} />
                        </Route>
                    </Routes>
                </Router>
            </ThemeProvider>
        </HelmetProvider>
    );
}

export default App;
