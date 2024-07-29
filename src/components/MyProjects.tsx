import React from 'react'
import { motion } from 'framer-motion';

const projects = [
    {
        gif: 'link_to_gif1.gif',
        title: 'Project 1',
        description: '<p>This is a description for project 1</p>',
        link: 'https://github.com/user/project1'
    },
    {
        gif: 'link_to_gif2.gif',
        title: 'Project 2',
        description: '<p>This is a description for project 2</p>',
        link: 'https://github.com/user/project2'
    },
    // Add more project objects here
];

const Card = ({ gif, title, description, link }: { gif: string, title: string, description: string, link: string }) => (
    <motion.div className="card" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <img src={gif} alt={title} className="card-gif" />
        <h3 className="card-title">{title}</h3>
        <div className="card-description" dangerouslySetInnerHTML={{ __html: description }} />
        <a href={link} className="card-link">Source Code</a>
    </motion.div>
);

function MyProjects() {
    return (
        <section className="container">
            <motion.div className="card-container" drag="x" dragConstraints={{ left: -300, right: 300 }}>
                {projects.map((project, index) => (
                    <Card
                        key={index}
                        gif={project.gif}
                        title={project.title}
                        description={project.description}
                        link={project.link}
                    />
                ))}
                {projects.map((project, index) => (
                    <Card
                        key={index + projects.length}
                        gif={project.gif}
                        title={project.title}
                        description={project.description}
                        link={project.link}
                    />
                ))}
            </motion.div>
            <motion.div className="card-container reverse" drag="x" dragConstraints={{ left: -300, right: 300 }}>
                {projects.map((project, index) => (
                    <Card
                        key={index + 2 * projects.length}
                        gif={project.gif}
                        title={project.title}
                        description={project.description}
                        link={project.link}
                    />
                ))}
                {projects.map((project, index) => (
                    <Card
                        key={index + 3 * projects.length}
                        gif={project.gif}
                        title={project.title}
                        description={project.description}
                        link={project.link}
                    />
                ))}
            </motion.div>
        </section>
    );
}

export default MyProjects;
