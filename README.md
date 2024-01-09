Location API
============

Description
-----------

An API to manage information about locations.

Installation
------------

Make sure you have Node.js installed on your machine.

1.  Clone this repository:

```git clone https://github.com/Ismaias/project-location-nestjs.git ```

1.  Install dependencies:

```cd project-location-nestjs npm install ```

1.  Set up environment variables:

Create a .env file in the project root using the provided .env.example file as a template. Replace the placeholders with appropriate values, such as LOCATION_API_CONNECTION_STRING for the database connection.

Usage
-----

### Running the application locally

To start the local server:

```npm run start:dev ```

The server will run at `http://localhost:3000`.

### Endpoints

#### Create a location

-   URL: `POST /v1/locations`
-   Request body:

`{
  "name": "Central Park",
  "city": "New York City",
  "state": "NY"
}`

#### Get all locations

-   URL: `GET /v1/locations`
-   Retrieves a list of all locations.

#### Get a location by ID

-   URL: `GET /v1/locations/:id`
-   Retrieves a specific location by ID.

#### Update a location

-   URL: `PUT /v1/locations/:id`
-   Request body:

`{
  "name": "Updated Park",
  "city": "New City",
  "state": "NC"
}`

Replace `:id` with the ID of the location to update.

#### Delete a location by ID

-   URL: `DELETE /v1/locations/:id`
-   Deletes a specific location by ID.

#### Sign-up

-   URL: `POST /v1/auth/signup`
-   Request body:

`{
  "email": "user123",
  "password": "securepassword"
}`

#### Login

-   URL: `POST /v1/auth/login`
-   Request body:

`{
  "email": "user123",
  "password": "securepassword"
}`


Testing
-------

To run tests:

```npm test ```

Contributing
------------

Feel free to contribute! Open an issue or submit a pull request.

