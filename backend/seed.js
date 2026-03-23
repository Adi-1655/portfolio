const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    tags: [{ type: String }],
    github: { type: String },
    demo: { type: String },
    order: { type: Number, default: 0 }
}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

const ExperienceSchema = new mongoose.Schema({
    role: { type: String, required: true },
    company: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String },
    description: { type: String, required: true },
    order: { type: Number, default: 0 }
}, { timestamps: true });

const Experience = mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);

async function seed() {
    try {
        const pCount = await Project.countDocuments();
        if (pCount === 0) {
            await Project.insertMany([
                {
                    title: "E-Commerce Platform",
                    description: "A full-stack e-commerce solution with product management, secure checkout, and user authentication.",
                    image: "/placeholder-image.jpg",
                    tags: ["React", "Node.js", "MongoDB", "Tailwind"],
                    github: "https://github.com",
                    demo: "https://demo.com",
                },
                {
                    title: "Task Management App",
                    description: "Kanban style task management tool with drag-and-drop features and real-time collaboration.",
                    image: "/placeholder-image.jpg",
                    tags: ["React", "TypeScript", "Vite", "Firebase"],
                    github: "https://github.com",
                    demo: "https://demo.com",
                },
                {
                    title: "Portfolio Website V1",
                    description: "My first portfolio website built to showcase my initial projects during learning.",
                    image: "/placeholder-image.jpg",
                    tags: ["HTML", "CSS", "JavaScript"],
                    github: "https://github.com",
                }
            ]);
            console.log("Seeded Projects");
        }

        const eCount = await Experience.countDocuments();
        if (eCount === 0) {
            await Experience.insertMany([
                {
                    role: "Software Engineering Intern",
                    company: "Tech Innovations Inc.",
                    startDate: "2023",
                    endDate: "Present",
                    description: "Developed scalable backend microservices using Node.js and Express. Improved database querying speed by 25% via index optimization.",
                    order: 1
                },
                {
                    role: "Computer Science Student",
                    company: "University Name",
                    startDate: "2022",
                    endDate: "Present",
                    description: "Began Computer Science degree. Coursework focusing on Data Structures, Algorithms, Web Development, and Database Systems.",
                    order: 2
                }
            ]);
            console.log("Seeded Experience");
        }
    } catch (err) {
        console.error(err);
    }
    process.exit();
}

seed();
