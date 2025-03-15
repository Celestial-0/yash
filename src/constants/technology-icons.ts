import { Technology } from '@/types/technology';
import { IconType } from 'react-icons';
import {  
    RiCss3Fill,  
    RiHtml5Fill,  
    RiNextjsFill,  
    RiReactjsLine,  
    RiTailwindCssFill,  
    RiJavascriptFill,  
    RiGitBranchFill,  
    RiGithubFill,  
    RiUbuntuFill  
} from 'react-icons/ri';  
import {  
    BiLogoTypescript,  
    BiLogoMongodb,  
    BiLogoPostgresql,  
    BiLogoNodejs,  
    BiLogoJava,  
    BiLogoPython,  
    BiLogoCPlusPlus,  
} from "react-icons/bi";  
import {  
    SiExpress,  
    SiDjango,  
    SiFramer,  
    SiMui,  
    SiVercel, 
    SiMysql, 
    SiAnaconda,  
    SiNumpy,  
    SiPandas,   
    SiIntellijidea,  
    SiSpyderide,  
    SiLinux,
    SiAndroid,
    SiKotlin,
} from "react-icons/si"; 


import { FaDocker } from "react-icons/fa";
import { FaRust } from "react-icons/fa";


import FletIcon from '@/components/core/icons/FletIcon';
import MatplotlibIcon from '@/components/core/icons/MatplotlibIcon';
import SeabornIcon from '@/components/core/icons/SeabornIcon';
import PytestIcon from '@/components/core/icons/PytestIcon';
import CIconBW from '@/components/core/icons/CIconBW';

export const TECHNOLOGY_ICONS: Record<Technology, IconType> = {  
    'React': RiReactjsLine,  
    'Next.js': RiNextjsFill,  
    'Tailwind': RiTailwindCssFill,  
    'HTML5': RiHtml5Fill,  
    'CSS3': RiCss3Fill,  
    'TypeScript': BiLogoTypescript,  
    'JavaScript': RiJavascriptFill,  
    'MongoDB': BiLogoMongodb,  
    'PostgreSQL': BiLogoPostgresql,  
    'Node.js': BiLogoNodejs,  
    'Express.js': SiExpress,  
    'MySQL': SiMysql,  
    'Python': BiLogoPython,  
    'Django': SiDjango,  
    'FLET': FletIcon as IconType,
    'NumPy': SiNumpy,  
    'Pandas': SiPandas,  
    'Seaborn': SeabornIcon as IconType,  
    'Matplotlib': MatplotlibIcon as IconType,
    'Pytest': PytestIcon as IconType,  
    'C': CIconBW as IconType,  
    'C++': BiLogoCPlusPlus,  
    'Java': BiLogoJava,  
    'Rust': FaRust,  
    'Android': SiAndroid,
    'Kotlin': SiKotlin,
    'IntelliJ IDEA': SiIntellijidea,  
    'Spyder': SiSpyderide,  
    'Anaconda': SiAnaconda,  
    'Docker': FaDocker,  
    'Material UI': SiMui,  
    'Vercel': SiVercel,  
    'Git': RiGitBranchFill,  
    'GitHub': RiGithubFill,  
    'Framer Motion': SiFramer,  
    'Linux': SiLinux  

    // other

};
