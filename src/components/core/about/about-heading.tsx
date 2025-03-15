import HyperText from '@/components/magicui/hyper-text';
import { VelocityScroll } from '@/components/magicui/scroll-based-velocity';
import { Flex, Heading } from '@radix-ui/themes';

export const AboutHeading = () => {
    return (
        <Flex gap={ '2' } justify={ 'between' } className={ 'w-full' }>
            <Flex direction={ 'column' } className={ 'overflow-x-hidden' }>
                <Heading size={{ initial: '7', sm: '9' }}>
                    <HyperText text={ "Hi! I'm Yash." } />
                </Heading>
                <Heading size={{ initial: '1', sm: '4' }} className={ 'overflow-hidden' }>
                    <VelocityScroll text={ 'Full-Stack Developer (MERN & Django) | Data Structures & Algorithms | AI/ML | B.Tech CS | Anime & Manga Enthusiast | Gamer |' } default_velocity={ 2 } />
                </Heading>
            </Flex>
        </Flex>
    );
}