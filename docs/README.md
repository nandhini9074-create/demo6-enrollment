# Demo6 Enrollment API

## Overview
The Demo6 Enrollment API provides endpoints for managing card enrollments and unenrollments for users. It allows users to enroll new cards and remove existing cards from their accounts.

## Features
- **Enroll a card**: Add a new card to a user's account.
- **Unenroll a card**: Remove an existing card from a user's account.

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/nandhini9074-create/mimojo-enrollment-template-service-main.git
   ```
2. Navigate to the project directory:
   ```bash
   cd mimojo-enrollment-template-service-main
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the application:
   ```bash
   npm run start
   ```

## Environment Variables
The following environment variables are required to run the application:
- `SERVER_HTTP_HOST`: Host for the HTTP server.
- `SERVER_HTTP_PORT`: Port for the HTTP server.
- `NODE_ENV`: Environment (e.g., `local`, `production`).
- `IS_SWAGGER_ENABLED`: Enable Swagger documentation (`true` or `false`).
- `GRAVITEE_ENDPOINT`: Endpoint for Gravitee Gateway.

## API Endpoints

### Enroll a Card
**POST** `/card/enroll`

**Description**: Enrolls a specific card from the user.

**Request Body**:
```json
{
  "customerId": "string",
  "schemeUserId": "string",
  "cardDetails": [
    {
      "cardId": "string",
      "schemeCardId": "string",
      "cardLast4": "string",
      "isNewCard": true,
      "supplementaryCards": [
        {
          "cardId": "string",
          "schemeCardId": "string",
          "cardLast4": "string",
          "isNewCard": true
        }
      ]
    }
  ]
}
```

**Response**:
```json
{
  "success": true,
  "message": "Card enrolled successfully",
  "data": {}
}
```

---

### Unenroll a Card
**POST** `/card/unenroll`

**Description**: Unenrolls a specific card from the user.

**Request Body**:
```json
{
  "unenrollCards": [
    {
      "mimojoCardId": "string",
      "replaceSchemeCardId": "string"
    }
  ]
}
```

**Response**:
```json
{
  "success": true,
  "message": "Card unenrolled successfully",
  "data": {}
}
```

## Documentation
Swagger documentation is available at `/api-docs` when the application is running locally.

## License
This project is licensed under the MIT License.

## References
- [GitHub Repository](https://github.com/nandhini9074-create/mimojo-enrollment-template-service-main)
- [Swagger Documentation](http://localhost:3000/api-docs)