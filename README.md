# noaa-api

![image of GHCN API](./public/image.png)

REST API for retrieving info about weather stations using station ID.

The data is sourced from here:
ftp://ftp.ncdc.noaa.gov/pub/data/ghcn/daily/by_year/2022.csv.gz
ftp://ftp.ncdc.noaa.gov/pub/data/ghcn/daily/readme.txt

Instructions to run locally:

1. Download and unzip the CSV at the link above.

2. Create a MySQL db named `weather` and modify `weather.sql` so that the path to the CSV is correct.

3. Run the query to populate the db.

4. Run `npm i` to install deps for the app and `npm start` to run. Visit `localhost:3000` to use the UI or `/station/<station_id>` to get the raw JSON response.
