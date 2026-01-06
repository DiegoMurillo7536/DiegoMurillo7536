/**
 * Translations
 * Contains all text content in Spanish and English
 */

const translations = {
    es: {
        // Navbar
        nav: {
            home: 'Inicio',
            about: 'Sobre Mí',
            projects: 'Proyectos Personales',
            education: 'Educación y Experiencia',
            experience: 'Experiencia',
            skills: 'Habilidades',
            contact: 'Contacto'
        },
        
        // Hero Section
        hero: {
            greeting: 'Hola, soy',
            name: 'Diego Alexander Murillo Suárez',
            title: 'Desarrollador Backend',
            description: 'Apasionado por crear soluciones robustas y escalables',
            ctaProjects: 'Ver Proyectos',
            ctaContact: 'Contactar',
            ctaDownloadCV: 'Descargar CV'
        },
        
        // About Section
        about: {
            title: 'Sobre Mí',
            personalDescription: 'Desarrollador backend apasionado por la tecnología y la naturaleza. Disfruto creando soluciones que realmente ayudan a las personas a resolver problemas complejos.',
            professionalDescription: 'Especializado en AWS Serverless y Python, diseño soluciones cloud que optimizan procesos y mejoran la eficiencia operativa. Busco colaborar con equipos que valoren la innovación y las mejores prácticas.'
        },
        
        // Projects Section
        projects: {
            title: 'Proyectos Personales',
            viewCode: 'Ver Código',
            viewDemo: 'Ver Demo',
            technologies: 'Tecnologías',
            items: [
                {
                    title: 'Chatbot para recordar eventos importantes',
                    description: 'Chatbot para recordar eventos importantes, se puede agregar eventos y se puede ver la lista de eventos.',
                    technologies: ['Python','Llama IA', 'MongoDB', 'Pydantic'],
                    image: 'images/projects/test_project.jpg',
                    github: 'https://github.com/diegoa31052004/remember-events',
                    demo: 'https://remember-events.vercel.app/'
                },
                {
                    title: 'Donación hacia fundaciones de animales',
                    description: 'Donación hacia fundaciones de animales, se puede donar hacia diferentes fundaciones y se puede ver las metas de cada una de ellas.',
                    technologies: ['Python', 'FastAPI', 'React', 'TailwindCSS', 'PostgreSQL'],
                    image: 'images/projects/test_project.jpg',
                    github: 'https://github.com/diegoa31052004/donation-foundation-animals',
                    demo: 'https://donation-foundation-animals.vercel.app/'
                },
                {
                    title: 'Aplicación de finanzas personales',
                    description: 'Aplicación para registar ingresos y gastos con chatbot para realizar consultas sobre las finanzas.',
                    technologies: ['Python', 'Django', 'Jinja2', 'PostgreSQL', 'Llama IA'],
                    image: 'images/projects/test_project.jpg',
                    github: 'https://github.com/example/project3',
                    demo: 'https://notifications.example.com'
                },
                {
                    title: 'Calendario de eventos',
                    description: 'Calendario de eventos, se puede agregar eventos y se puede ver la lista de eventos.',
                    technologies: ['Python', 'Django', 'Jinja2', 'TailwindCSS', 'MySQL'],
                    image: 'images/projects/test_project.jpg',
                    github: 'https://github.com/example/project3',
                    demo: 'https://notifications.example.com'
                }
            ]
        },
        
        // Education & Experience
        educationExperience: {
            title: 'Educación y Experiencia'
        },
        education: {
            title: 'Educación',
            items: [
                {
                    title: 'Técnico',
                    institution: '',
                    dates: '',
                    description: '',
                    achievements: []
                },
                {
                    title: 'Tecnólogo',
                    institution: '',
                    dates: '',
                    description: '',
                    achievements: []
                },
                {
                    title: 'Carrera Profesional',
                    institution: '',
                    dates: 'En curso',
                    description: '',
                    achievements: []
                }
            ]
        },
        experience: {
            title: 'Experiencia',
            items: []
        },
        
        // Skills Section
        skills: {
            title: 'Habilidades',
            backend: 'Backend',
            frontend: 'Frontend',
            databases: 'Bases de Datos',
            tools: 'Herramientas'
        },
        
        // Contact Section
        contact: {
            title: 'Contacto',
            subtitle: '¿Tienes un proyecto en mente? ¡Hablemos!',
            name: 'Nombre',
            email: 'Email',
            subject: 'Asunto',
            message: 'Mensaje',
            send: 'Enviar',
            sending: 'Enviando...',
            success: '¡Mensaje enviado exitosamente!',
            error: 'Error al enviar el mensaje. Por favor, intenta de nuevo.'
        },
        
        // Footer
        footer: {
            rights: 'Todos los derechos reservados'
        }
    },
    
    en: {
        // Navbar
        nav: {
            home: 'Home',
            about: 'About Me',
            projects: 'Projects',
            education: 'Education & Experience',
            experience: 'Experience',
            skills: 'Skills',
            contact: 'Contact'
        },
        
        // Hero Section
        hero: {
            greeting: 'Hi, I am',
            name: 'Diego Alexander Murillo Suárez',
            title: 'Backend Developer',
            description: 'Passionate about creating robust and scalable solutions',
            ctaProjects: 'View Projects',
            ctaContact: 'Contact',
            ctaDownloadCV: 'Download CV'
        },
        
        // About Section
        about: {
            title: 'About Me',
            personalDescription: 'Backend developer passionate about technology and nature. I enjoy creating solutions that truly help people solve complex problems.',
            professionalDescription: 'Specialized in AWS Serverless and Python, I design cloud solutions that optimize processes and improve operational efficiency. I seek to collaborate with teams that value innovation and best practices.'
        },
        
        // Projects Section
        projects: {
            title: 'Projects',
            viewCode: 'View Code',
            viewDemo: 'View Demo',
            technologies: 'Technologies',
            items: [
                {
                    title: 'Chatbot to remember important events',
                    description: 'Chatbot to remember important events, you can add events and view the list of events.',
                    technologies: ['Python', 'Llama IA', 'MongoDB', 'Pydantic'],
                    image: 'images/projects/test_project.jpg',
                    github: 'https://github.com/diegoa31052004/remember-events',
                    demo: 'https://remember-events.vercel.app/'
                },
                {
                    title: 'Donation to animal foundations',
                    description: 'Donation to animal foundations, you can donate to different foundations and view the goals of each one.',
                    technologies: ['Python', 'FastAPI', 'React', 'TailwindCSS', 'PostgreSQL'],
                    image: 'images/projects/test_project.jpg',
                    github: 'https://github.com/diegoa31052004/donation-foundation-animals',
                    demo: 'https://donation-foundation-animals.vercel.app/'
                },
                {
                    title: 'Personal finance application',
                    description: 'Application to record income and expenses with a chatbot to make queries about finances.',
                    technologies: ['Python', 'Django', 'Jinja2', 'PostgreSQL', 'Llama IA'],
                    image: 'images/projects/test_project.jpg',
                    github: 'https://github.com/example/project3',
                    demo: 'https://notifications.example.com'
                },
                {
                    title: 'Event calendar',
                    description: 'Event calendar, you can add events and view the list of events.',
                    technologies: ['Python', 'Django', 'Jinja2', 'TailwindCSS', 'MySQL'],
                    image: 'images/projects/test_project.jpg',
                    github: 'https://github.com/example/project3',
                    demo: 'https://notifications.example.com'
                }
            ]
        },
        
        // Education & Experience
        educationExperience: {
            title: 'Education & Experience'
        },
        education: {
            title: 'Education',
            items: [
                {
                    title: 'Technical Degree',
                    institution: '',
                    dates: '',
                    description: '',
                    achievements: []
                },
                {
                    title: 'Technologist',
                    institution: '',
                    dates: '',
                    description: '',
                    achievements: []
                },
                {
                    title: 'Professional Career',
                    institution: '',
                    dates: 'In progress',
                    description: '',
                    achievements: []
                }
            ]
        },
        experience: {
            title: 'Experience',
            items: []
        },
        
        // Skills Section
        skills: {
            title: 'Skills',
            backend: 'Backend',
            frontend: 'Frontend',
            databases: 'Databases',
            tools: 'Tools'
        },
        
        // Contact Section
        contact: {
            title: 'Contact',
            subtitle: 'Have a project in mind? Let\'s talk!',
            name: 'Name',
            email: 'Email',
            subject: 'Subject',
            message: 'Message',
            send: 'Send',
            sending: 'Sending...',
            success: 'Message sent successfully!',
            error: 'Error sending message. Please try again.'
        },
        
        // Footer
        footer: {
            rights: 'All rights reserved'
        }
    }
};

