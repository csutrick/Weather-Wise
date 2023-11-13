<input placeholder="City name" name="userInput" type="text"
value={city} onChange={(e) => setCity(e.target.value)}
className='mb-2 bg-white text-black pl-1 rounded-lg w-[250px] h-[40px]'
/>
<button type="button" onClick={handleSearch}
className='my-2 bg-white text-black px-4 py-1 font-bold active:bg-red-400'>
  Search
</button>
{/* Result container */}
<div className='mt-2 bg-red-400 w-[250px] min-h-[400px]'>
  {/* Display weather data here */}
  {weatherData && (
    <div>
      <h2>Weather Data:</h2>
      <pre>{JSON.stringify(weatherData, null, 2)}</pre>
    </div>
  )}
</div>