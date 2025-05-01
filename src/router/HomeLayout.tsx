import { useState } from 'react';
import { WeatherHook } from '../hooks/weather.hook';

export const HomeLayout = () => {
    const [city, setCity] = useState('')
    const { setQuery, data, error } = WeatherHook()

    const handleOnKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && city.trim()) {
            setQuery(city.trim())
            setCity('')
            console.log(data)
        }
    };

    { error && <p className="text-red-500">{error}</p> }

    return (
        <div className="w-[70%]
         flex flex-col justify-center
         items-center gap-8 relative">
            <div className='w-full bg-slate-400/20 h-full p-8 rounded-lg 
            drop-shadow-2xl flex flex-col items-center gap-8'>
                <label className="input bg-slate-200 w-[100%]">
                    <svg className="h-[1em] opacity-50"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input
                        type="search"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyDown={handleOnKey}
                        placeholder="Search" />
                </label>

                <div className='w-[100%] min-h-[30vh] 
                bg-transparent rounded-md drop-shadow-2xl flex gap-4'>
                    <div className='bg-slate-200 rounded-md w-1/4'>

                    </div>
                    <div className=' bg-slate-200 rounded-md w-3/4 p-4 relative'>
                        <h2 className='text-8xl
                         font-bold text-slate-600/20'>
                            <span><img className='inline-block'
                                src={data?.weather.urlIcon} alt={data?.weather.main} />
                            </span>{data?.nameCity}</h2>
                        <h3 className='text-slate-500/50 font-medium'>
                            La temperatura actual es:</h3>
                        <h2 className='text-9xl text-slate-600/30 font-bold absolute
                         bottom-4 right-4'>{`${data?.main.temp} Cº`}</h2>
                    </div>
                </div>

            </div>

        </div>
    );
};
