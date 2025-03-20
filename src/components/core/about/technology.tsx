import BlurFade from '@/components/magicui/blur-fade';
import IconCloud from '@/components/magicui/icon-cloud';
import { TECHNOLOGIESFORSKILLS,TECHNOLOGIESFORICONCLOUD } from '@/constants/technologies';
import { Badge, Flex } from '@radix-ui/themes';
import { SectionHeading } from '../section-heading';

const icons: string[] = TECHNOLOGIESFORICONCLOUD.map( tech => tech.simpleIcon  );

export const Technology = () => {

    return (
        <Flex direction={ 'column' } gap={ '6' } className='w-full' mb={ '2' }>
            <SectionHeading title={ 'Skills' } />
            <Flex gap={ '3' } wrap={ 'wrap' }>
                { TECHNOLOGIESFORSKILLS.map((tech, index) => (
                    <BlurFade key={ index } delay={ 0.25 * index } inView>
                        <Badge variant={ 'solid' } highContrast>
                            { tech.title }
                        </Badge>
                    </BlurFade>
                )) }
            </Flex>
            
            <IconCloud iconSlugs={ icons } />

        </Flex>
    );
}