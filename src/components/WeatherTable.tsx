import react from 'react';

const WeatherTable = () => {
    return (
        <div className='flex justify-center items-center min-h-[500px] w-2/3 m-[76px] border-4 border-blue-400'>
            <table className='w-full'>
                <thead>
                    <tr>
                        <th className='border-2 border-blue-400'>Weather</th>
                        <th className='border-2 border-blue-400'>Count</th>
                        <th className='border-2 border-blue-400'>Fill</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='border-2 border-blue-400'>Hot</td>
                        <td className='border-2 border-blue-400'>5</td>
                        <td className='border-2 border-blue-400'>Red</td>
                    </tr>
                    <tr>
                        <td className='border-2 border-blue-400'>Cool</td>
                        <td className='border-2 border-blue-400'>10</td>
                        <td className='border-2 border-blue-400'>Blue</td>
                    </tr>
                    <tr>
                        <td className='border-2 border-blue-400'>Cold</td>
                        <td className='border-2 border-blue-400'>15</td>
                        <td className='border-2 border-blue-400'>White</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default WeatherTable;