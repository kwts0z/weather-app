import Image from 'next/image';

import humidity from '../../assets/humidity.svg';
import wind from '../../assets/wind.svg';

export interface BoardProps {
  name: string,
  temp: number,
  humid: number,
  wind: number,
  icon: string
}

export default function Board(props: BoardProps) {
  return (
    <div className="flex rounded-2xl shadow-2xl backdrop-blur-md text-white items-center justify-center py-20 pl-20 pr-12">
      <div className='flex flex-col w-full h-full items-center space-y-5'>
        <div className='flex flex-col items-center'>
          <img className={props.icon == "" ? 'h-24 w-24' : 'scale-100'} src={props.icon == "" ? "/cloud.png" : props.icon} alt='weather'/>
          <h1 className='text-2xl font-bold'>{props.name}</h1>
        </div>
        <div className='flex flex-row items-center'>  
          <Image src={wind} alt='wind speed'/>
          <h1 className='pl-1 pr-5'>{props.wind}m/s</h1>

          <Image src={humidity} alt='humidity'/>
          <h1 className='pr-5'>{props.humid}%</h1>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={120}
          height={170}
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          viewBox="0 0 24 24"
        >
          <defs>
            <mask id="mask">
              <rect x="0" y={24-(props.temp*0.7)} width="100" height="100" fill="white" />
            </mask>
            <linearGradient id="grad" x1="0%" y1="55%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#00C9FF" />
              <stop offset="50%" stopColor="#FF2600" />
            </linearGradient>
          </defs>
          <path
            d="M14 14 V0 a2.5 2.5 0 0 0-5 0 v16 a4.5 4.5 0 1 0 5 0z"
            fill="transparent"
          />

          <path
            d="M14 14 V0.1 a2.5 2.5 0 0 0-5 0 v16 a4.5 4.5 0 1 0 5 0z"
            fill="url(#grad)"
            mask="url(#mask)"
          />
        </svg>
        <h1>{props.temp}°C</h1>
      </div>
    </div>
  )
}