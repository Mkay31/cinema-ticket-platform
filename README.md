## How to Test and Run the Project

#### Update your .env file with your database credentials:
```bash
    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME=your_db_username
    DB_PASSWORD=your_db_password
    DB_DATABASE=cinema_db
    PORT=9000
```

### Running the Project

1. Install dependencies:
    ```bash
    npm install --f
    ```

2. Create build:
    ```bash
    npm run build

3. Start the development server:
    ```bash
    npm start
    ```



#### Create Cinema
```bash
curl --location 'http://localhost:9000/cinema' \
--header 'Content-Type: application/json' \
--data '{
    "name": "cinema1",
    "totalSeats": 20
}'
```

#### Get Cinema List 
```bash
curl --location 'http://localhost:9000/cinema'
```

#### Get Cinema by id 
```bash
curl --location 'http://localhost:9000/cinema/:id'
```

#### Purchase Seat
```bash
curl --location 'http://localhost:9000/cinema/:id/purchase-seat' \
--header 'Content-Type: application/json' \
--data '{
    "seatNumber" :1
}'
```

#### Purchase First Two Consecutive Seats
```bash
curl --location --request POST 'http://localhost:9000/cinema/:id/purchase-consecutive-seats' \
```
