import { Project } from '@/types/project';

export const PROJECTS: Project[] = [
    {
        title: 'FILE MANAGER',
        imgSrc: 'images/fileManagerApp.png',
        technologies: [ 'Python','FLET','Matplotlib','NumPy', 'Pytest'],
//          darkdetect==0.8.0
        shortDescription: '_a file management automation tool.',
        longDescription: `This is a Python-based file management application developed using the Flet framework. The application allows users to organize files in a specified directory into categorized folders based on their file extensions. \n\n It also provides functionalities to add custom folders with specific file extensions, create backups before organizing, and generate a summary of the file types and their sizes.`,
        githubLink: 'https://github.com/Celestial-0/FILE-MANAGER',
        
    },
    {
        title: 'Currency Converter Application',
        imgSrc: 'images/CurrencyConverter.png',
        technologies: [ 'React', 'Tailwind','JavaScript' ,'HTML5', 'CSS3' ],
//          'API'
        shortDescription: '_a Currency Converter web .',
        longDescription: `Currency Converter web application built using React.js. It allows users to convert amounts between different currencies using real-time exchange rates fetched from an API. The app also features a dark mode toggle 🌙☀️ and the ability to swap 🔄 between the source and target currencies.`,
        githubLink: 'https://github.com/Celestial-0/ReactMinorProjects/tree/main/CurrencyConverter',
    },

]