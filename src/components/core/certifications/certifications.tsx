import { Flex } from '@radix-ui/themes'
import React from 'react'
import { SectionHeading } from '../section-heading'
import { CERTIFICATIONS } from '@/constants/certification'
import BlurFade from '@/components/magicui/blur-fade'
import CertificationUI from './CertificationUI'


export const Certifications = () =>  {
  return (
    <Flex direction={ 'column' } gap={ '6' } mb={ '2' } id='education'>
            <SectionHeading title={ 'Certifications' } />
            <Flex direction={ 'column' } className={ 'w-full' } gap={ '3' }>
            {CERTIFICATIONS.map((certificate, index) => (
              <BlurFade key={ index } delay={ 0.25 * index } inView>
                <CertificationUI {...certificate} />    
              </BlurFade>
            ))}    
            </Flex>
        </Flex>
  )
}
