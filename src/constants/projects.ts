import { Project } from '@/types/project';

export const PROJECTS: Project[] = [
    {
        title: 'Elder Guard',
        imgSrc: 'images/Elder Guard.png',
        technologies: ['Next.js', 'TypeScript', 'Vercel', 'Tailwind', 'Framer Motion', 'JavaScript', 'HTML5', 'CSS3'],
        //          darkdetect==0.8.0
        shortDescription: '_a AI-powered IoT system for elderly health monitoring.',
        longDescription: `ElderGuard is an innovative AI-powered, IoT-based health monitoring and emergency alert system designed to ensure the safety and well-being of elderly individuals. It integrates multiple sensors with an ESP32 microcontroller to monitor vital signs, detect unusual activities like falls, and track environmental conditions. The system processes real-time data and sends immediate alerts to caregivers via SMS. ElderGuard is a non-intrusive solution that offers both autonomy and remote monitoring through a web platform, enhancing elderly care with instant emergency notifications..`,
        githubLink: 'https://github.com/Celestial-0/elderguard',
        liveLink: 'https://elderguard.vercel.app/',

    },
    {
        title: 'FILE MANAGER',
        imgSrc: 'images/fileManagerApp.png',
        technologies: ['Python', 'FLET', 'Matplotlib', 'NumPy', 'Pytest'],
        //          darkdetect==0.8.0
        shortDescription: '_a file management automation tool.',
        longDescription: `This is a Python-based file management application developed using the Flet framework. The application allows users to organize files in a specified directory into categorized folders based on their file extensions. \n\n It also provides functionalities to add custom folders with specific file extensions, create backups before organizing, and generate a summary of the file types and their sizes.`,
        githubLink: 'https://github.com/Celestial-0/FILE-MANAGER',
        urlDescription: 'Demo Video',
        liveLink: 'https://youtu.be/N5y7y4f_V-g',

    },
    {
        title: 'Currency Converter Application',
        imgSrc: 'images/CurrencyConverter.png',
        technologies: ['React', 'Tailwind', 'JavaScript', 'HTML5', 'CSS3'],
        //          'API'
        shortDescription: '_a Currency Converter web .',
        longDescription: `Currency Converter web application built using React.js. It allows users to convert amounts between different currencies using real-time exchange rates fetched from an API. The app also features a dark mode toggle 🌙☀️ and the ability to swap 🔄 between the source and target currencies.`,
        githubLink: 'https://github.com/Celestial-0/ReactMinorProjects/tree/main/CurrencyConverter',
    },

]