import Head from 'next/head'
import Image from 'next/image'
import SearchBar from '../components/SearchBar'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

 // Obtenemos la hora actual para cambiar el fondo dependiendo la hora
  // si la hora es:
  // de 5 hasta las 13 es dia 
  // de 13 hasta las 19 es tarde 
  // de 19 hasta las 24 o 0 hasta 5 es noche

  export default function Home() {
    
    const [claseFondo, setClaseFondo] = useState('');
  
    useEffect(() => {
      const dia = new Date();
      const horaActual = dia.getHours();
  
      if (horaActual >= 5 && horaActual < 13) {
        setClaseFondo('home-dia');
      } else if (horaActual >= 13 && horaActual < 19) {
        setClaseFondo('home-tarde');
      } else if ((horaActual >= 19 && horaActual <= 24) || (horaActual >= 0 && horaActual < 5)) {
        setClaseFondo('home-noche');
      }
    }, []);
  
    return (
      <div>
        <Head>
          <title>Weather App - Alexbv2615</title>
        </Head>
  
        <motion.div 
          className={claseFondo}
          initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{
                duration: 0.5,
                ease: "easeInOut"
            }}
        >
          <motion.div 
            className='title'
            initial={{ opacity: 0, y: 80}}
            animate={{ opacity: 1, y: 0}}
            transition={{
                duration: 0.5,
                ease: "easeInOut",
                delay: 0.3
            }}
          >
            <Image src='/image/titulo.svg' width={310} height={100} alt='' priority/>
          </motion.div>
  
          <motion.div 
            className='container'
            initial={{ opacity: 0, y: 80}}
            animate={{ opacity: 1, y: 0}}
            transition={{
                duration: 0.5,
                ease: "easeInOut",
                delay: 0.4
            }}
          >
            <SearchBar />
          </motion.div>
          <motion.footer 
            className='footer'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 0.5,
                ease: "easeInOut",
                delay: 0.5
            }}
          >created by Alexander Noel</motion.footer>
        </motion.div>
        
      </div>
    );
  }