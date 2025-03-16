import { Flex } from '@radix-ui/themes';
import { SectionHeading } from '../section-heading';
import { PROJECTS } from '@/constants/projects';
import { ProjectCard } from './project-card';

export const Projects = () => {
    return (
        <Flex direction={ 'column' } gap={ '6' } mb={ '2' } id="projects" >
            <SectionHeading title={ 'Projects' } />
            <Flex className={ 'w-full' } gap={ '3' } wrap={ 'wrap' } justify={ 'between' }>
                { PROJECTS.map((project, index) => (
                    <ProjectCard project={ project } key={ index } index={ index } />
                ))}
            </Flex>
        </Flex>
    );
}