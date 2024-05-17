const WeatherCard=({date,temp_min,temp_max,press,humi})=>{
    const formatDate=(timestamp)=>{
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }
    const  kelvinToCelsius=(kelvin)=>{
        // Convert Kelvin to Celsius
        const celsius = kelvin - 273.15;
    
        // Round to 2 decimal places
        const roundedCelsius = Math.round(celsius * 100) / 100;
    
        return roundedCelsius;
    }
    date=formatDate(date);
    return(
        <table className="weather-card">
            <tbody>
            <tr>
                <td colSpan={2}>Date: {date}</td>
            </tr>
            <tr>
                <td colSpan={2}>Temperature</td>
            </tr>
            <tr>
                <td>Min</td>
                <td>Max</td>
            </tr>
            <tr>
                <td>{kelvinToCelsius(temp_min)}</td>
                <td>{kelvinToCelsius(temp_max)}</td>
            </tr>
            <tr>
                <td>Pressure</td>
                <td>{press}</td>
            </tr>
            <tr>
                <td>Humidity</td>
                <td>{humi}</td>
            </tr>
            </tbody>
        </table>
    )
}

export default WeatherCard;