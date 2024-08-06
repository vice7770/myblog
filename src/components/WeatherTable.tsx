import react from 'react';

const WeatherTable = () => {
    return (
        <div className='flex flex-col w-[800px] h-[600px] justify-center items-center border-2 border-gray-200 rounded-md'>
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