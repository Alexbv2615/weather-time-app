import axios from 'axios';
import cities from '../../lib/city.list.json';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';

export async function getServerSideProps(context){
    
    const link = context.params.city;
    const city = getCity(link);

    if(!city){
        return {
            notFound: true,
        };
    };

    /*------------- hacemos peticion de los datos en openweathermap --------------*/
    const res = await axios(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.coord.lat}&lon=${city.coord.lon}&APPID=${process.env.API_KEY}&exclude=minutely&units=metric`
      );

    const data = res.data

    if(!data){
        return {
            notFound: true,
        };
    };
    /*-----------------------------------------------------------------------------*/

    /*------------- hacemos peticion de la hora en worldtimeapi --------------*/
    const resTime = await axios(
        `http://api.timezonedb.com/v2.1/get-time-zone?key=${process.env.API_KEY_TIME}&format=json&by=position&lat=${city.coord.lat}&lng=${city.coord.lon}`
       );

    const time = resTime.data

    if(!time){
        return {
            notFound: true,
        };
    };
    /*-----------------------------------------------------------------------------*/

    return {
        props: {
            link: link,
            data: data,
            time: time
        }
    }
};

const getCity = param => {
    // del param sacamos el id que usaremos
    const cityId = param.split('-').pop()

    // si no hay id retornamos null
    if(!cityId){
        return null;
    };

    // Buscamos la ciudad cuyo id coincida con el Json
    const city = cities.find(city => city.id.toString() == cityId)

    // si existe la ciudad retornamos, sino null
    if(city){
        return city;
    } else {
        return null;
    };
};

export default function City({ link, data, time }) {

    /*-------------- Hallamos la Hora Actual --------------*/
    const date = new Date(time.formatted);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    

    const horaActual = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
    /*-----------------------------------------------------*/
    

  return (
    <div>
        <Head>
          <title>{`${data.name} (${data.sys.country})`}</title>
        </Head>
    
        <motion.div 
            className='home-view'
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{
                duration: 0.3,
                ease: "easeInOut"
            }}
        >
            <motion.div 
                className='view'
                initial={{ opacity: 0, y: 20}}
                animate={{ opacity: 1, y: 0}}
                transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                    delay: 0.3
                }}
            >
                <motion.div
                    initial={{ opacity: 0, x: 20}}
                    animate={{ opacity: 1, x: 0}}
                    transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                        delay: 0.7
                    }}
                >
                    <Link href='/'>
                        <Image className='back' src='/image/botonBack.svg' alt='' width={70} height={30} />
                    </Link>
                </motion.div>
                

                <header className='view-head'>
                    <motion.h1
                        initial={{ opacity: 0, x: -20}}
                        animate={{ opacity: 1, x: 0}}
                        transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                            delay: 0.5
                        }}
                    >
                        {data.name}</motion.h1>

                    <motion.h1
                        initial={{ opacity: 0, x: 20}}
                        animate={{ opacity: 1, x: 0}}
                        transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                            delay: 0.6
                        }}
                    >
                        {`(${data.sys.country})`}</motion.h1>
                </header>

                <section className='view-weather'>
                    <motion.div
                        initial={{ opacity: 0, x: -20}}
                        animate={{ opacity: 1, x: 0}}
                        transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                            delay: 0.7
                        }}
                    >
                    {
                        data.weather[0].icon &&
                        <Image className='view-weather-icon' src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@4x.png`} alt='' width={200} height={200} priority/>
                    }
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, x: 20}}
                        animate={{ opacity: 1, x: 0}}
                        transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                            delay: 0.8
                        }}
                    >
                        {data.weather[0].main}</motion.h2>
                </section>

                <footer className='view-footer'>
                    <div className='view-footer-line'>
                        <motion.h3
                            initial={{ opacity: 0, x: -20}}
                            animate={{ opacity: 1, x: 0}}
                            transition={{
                                duration: 0.2,
                                ease: "easeInOut",
                                delay: 0.8
                            }}
                        >temp:</motion.h3>
                        
                        <motion.h3
                            initial={{ opacity: 0, x: -20}}
                            animate={{ opacity: 1, x: 0}}
                            transition={{
                                duration: 0.2,
                                ease: "easeInOut",
                                delay: 0.9
                            }}
                        >humidity:</motion.h3>

                        <motion.h3
                            initial={{ opacity: 0, x: -20}}
                            animate={{ opacity: 1, x: 0}}
                            transition={{
                                duration: 0.2,
                                ease: "easeInOut",
                                delay: 1
                            }}
                        >desc:</motion.h3>
                        
                        <motion.h3
                            initial={{ opacity: 0, x: -20}}
                            animate={{ opacity: 1, x: 0}}
                            transition={{
                                duration: 0.2,
                                ease: "easeInOut",
                                delay: 1.1
                            }}
                        >time:</motion.h3>
                    </div>
                    <div className='view-footer-line'>
                        <motion.h3
                            initial={{ opacity: 0, x: 20}}
                            animate={{ opacity: 1, x: 0}}
                            transition={{
                                duration: 0.2,
                                ease: "easeInOut",
                                delay: 0.85
                            }}
                        >{`${data.main.temp}°C`}</motion.h3>

                        <motion.h3
                            initial={{ opacity: 0, x: 20}}
                            animate={{ opacity: 1, x: 0}}
                            transition={{
                                duration: 0.2,
                                ease: "easeInOut",
                                delay: 0.95
                            }}
                        >{`${data.main.humidity}%`}</motion.h3>

                        <motion.h3
                            initial={{ opacity: 0, x: 20}}
                            animate={{ opacity: 1, x: 0}}
                            transition={{
                                duration: 0.2,
                                ease: "easeInOut",
                                delay: 1.05
                            }}
                        >{data.weather[0].description}</motion.h3>

                        <motion.h3
                            initial={{ opacity: 0, x: 20}}
                            animate={{ opacity: 1, x: 0}}
                            transition={{
                                duration: 0.2,
                                ease: "easeInOut",
                                delay: 1.15
                            }}
                        >{horaActual}</motion.h3>
                    </div>
                </footer>
            </motion.div>
        </motion.div>
    </div>
  )
};
