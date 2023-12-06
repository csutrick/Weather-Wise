# Weather Wise

Signup or login to your account to search cities, view current weather, and a 5 day forcast. Favorite cities that you search alot for fast searching.

## Table of Contents

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Features](#features)
- [Contact](#contact)
- [License](#license)

## About

First either signup or login, user must be logged in to use the application. Using openweathermap.org the user is able to search a city and retrieve current day weather and a 5 day forcast for desired location. Once the user searches a city you can see the search go into the past search container, these searches are stored in local storage. Once the API returns the weather data the user has the option to favorite the city for quick searching in the favorite component, the users favorite are stores within the database. This application uses Bcrypt and json webtokens to ensure that user data is secure.

## Installation

1. **Clone the repository**
   - git clone https://github.com/csutrick/Weather-Wise

2. **Navigate to project directory**
   - cd weather-wise

3. **Install**
   - npm install

4. **Install cleint dependencies**
   - cd client
   - npm install
   - cd ..

## Usage

1. **Seed the database**
   - npm run seed

2. **Run Develop**
   - npm run develop

2. **View Website**
   - Open your browser and visit http://localhost:3000 to use Weather Wise

## Technologies

This project was built with:
- React
- Javascript
- GraphQL
- Express
- Apollo Server
- Tailwinds

## Features

1. **Bcrypt**
   - Bcrypt is employed in the authentication system to securely hash and store user passwords. When a user creates an account or updates their password, Bcrypt is used to hash the password before it is stored in the database. During login, the hashed password is compared to the stored hash to verify the user's identity

2. **Jsonwebtoken**
   - Jsonwebtoken is used in user authentication within Weather Wise. After a user successfully logs in, a JWT is generated and included in subsequent requests to authenticate and authorize the user's access to protected routes. The server validates the JWT to ensure the integrity and authenticity of the user.

3. **Openweather.org**
   - Weather Wise utilizes the OpenWeatherMap API to fetch real-time weather data based on user queries. When a user searches for a city, the application sends a request to the OpenWeatherMap API, retrieves the relevant weather information, and presents it to the user in a clear format.

4. **Tailwinds**
   - Tailwind CSS is the primary styling framework used in Weather Wise to create a consistent and visually appealing user interface.

## Contact

If you'd like to get in touch, discuss a potential project, or just have a chat about web development, feel free to reach out to me:

- Porfolio: (https://github.com/csutrick/personal-portfolio)

Thank you for visiting my project!

## License

The MIT License (MIT)

Copyright (c) 2015 Chris Kibble

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.