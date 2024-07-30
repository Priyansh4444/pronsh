import React from 'react'
import { motion } from 'framer-motion';

function MyProjects() {
    const text = 'My Projects';
    return (
        <section className="container mb-52">
            <div className="group relative text-center flex flex-col">
                <span className="glitch text-6xl" data-text={text}>
                    {text}
                </span>
            </div>
        </section>
    );
}

export default MyProjects;
