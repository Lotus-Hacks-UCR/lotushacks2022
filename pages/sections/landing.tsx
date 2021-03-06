import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import CountdownOutput from '@/components/Countdown'
import { WaveBorder } from '@/components/Page'
import { PrimaryButton, SecondaryButton } from '@/components/Button'
import Logo from '/public/assets/logo.png'

import styles from '@/styles/Wave.module.css'

export default function Landing() {
  const { data: session } = useSession()
  const [email, setEmail] = useState('')

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const openSignin = () => {
    const matchRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)

    if (email === '' || !matchRegex) {
      toast.error('Please enter a valid email.')
    }
    else {
      sessionStorage.setItem('email', email)
      signIn()
    }
  }

  useEffect(() => {
    sessionStorage.setItem('email', email)
  }, [email])

  return (
    <section className='relative flex flex-col justify-center items-center min-h-screen px-4 pt-24 pb-40 bg-stars bg-main-700'>
      {/* {session && session.user && session.user.email &&
        <div className='text-lg'>
          Logged in as {session.user.email}
        </div>
      } */}
      <div className='flex items-center gap-2'>
        <div className='font-bold text-4xl xs:text-5xl sm:text-6xl lg:text-8xl'>
          LOTUS
        </div>
        <div className='w-10 sm:w-16 lg:w-24'>
          <Image
            src={Logo}
            width={90}
            height={75}
            layout='responsive'
            objectFit='contain'
          />
        </div>
        <div className='font-bold text-4xl xs:text-5xl sm:text-6xl lg:text-8xl'>
          HACKS
        </div>
      </div>
      <div className='pt-2 text-center font-bold text-xl xs:text-2xl sm:text-4xl lg:text-5xl'>
        UCR'S 1<sup>st</sup> HARDWARE HACKATHON
      </div>
      <div className='mb-8'>
        <CountdownOutput
          completed='currently taking place!'
          heading='happening april 1-3, 2022'
          date='2022-04-01T00:00:00'
        />
      </div>
      {/* { session 
        ?
          <PrimaryButton
            label='Check In'
            internalLink='/checkin'
          />
        :
          <div className='flex flex-col md:flex-row gap-2 md:gap-0 items-center md:items-stretch w-full md:w-auto mb-4 text-xl lowercase'>
            <input 
              placeholder='Enter your email...' 
              value={email}
              onChange={handleChangeEmail}
              className='w-full md:w-[30rem] px-4 py-2 rounded-tl-3xl rounded-bl-lg rounded-tr-lg rounded-br-3xl md:rounded-r-none border-2 border-accent focus:border-accent-dark bg-main-700 text-xl text-primary outline-none'
            />
            <motion.button
              alt='Apply'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.03 }}
              onClick={() => openSignin()}
              className='flex justify-center items-center w-full sm:w-60 md:w-40 mb-2 sm:mb-0 px-4 py-2 rounded-tl-3xl rounded-bl-lg rounded-tr-lg rounded-br-3xl md:rounded-l-none bg-accent font-semibold text-main-700 lowercase'
            >
              Apply
            </motion.button>
          </div>
      } */}
      <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
        <PrimaryButton
          label='Sponsor Us'
          internalLink='/sponsor-us'
        />
        <SecondaryButton
          label='Join Our Team'
          externalLink='https://bit.ly/lotushackscommitteeforms'
        />
      </div>
      <WaveBorder
        waveClass={styles.landingWave}
        fill='fill-main-700'
      />
    </section>
  )
}
