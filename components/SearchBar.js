import Image from 'next/image'
import cities from '../lib/city.list.json';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SearchBar() {
    
  const [ search, setSearch ] = useState("");
  const [ results, setResults ] = useState([]);

  const handleCancel = () => {
    setSearch("");
  };

  const handleInput = (e) => {
    const { value } = e.target;
    setSearch(value);

    let matchingCities = [];

    if(value.length > 3) {
        for(let city of cities) {
            if(matchingCities.length >=5 ){
                break;
            }

            const match = city.name.toLowerCase().startsWith(value.toLowerCase());

            if(match){
                const cityData = {
                    ...city,
                    link: `${city.name.toLowerCase().replace(/ /g, "-")}-${city.id}`
                }
                matchingCities.push(cityData);
            }
        }
    };

    setResults(matchingCities)
  };

  return (
    <div className='search'>
       <input type='text' value={search} onChange={handleInput} placeholder='What city will we look today?'/>
       {
        !search.length > 0 ?
        <Image className='search-icon' src='/image/search.svg' width={22} height={22} alt='' />
        :
        <Image className='search-icon' src='/image/cancel.svg' width={22} height={22} alt='' onClick={handleCancel} />
       }
       {
        search.length > 3 && (
            <ul>
                {
                    results.length > 0 ? (
                        results.map((city, index) => (
                            <li key={index}>
                                <Link href={`/location/${city.link}`}>
                                        {city.name}
                                        {city.state ? `, ${city.state}` : ''}
                                        <span> ({city.country})</span>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <li className='search__no-results'>No results found</li>
                    )
                }
            </ul>
        )
       }
       
    </div>
  )
}
