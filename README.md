# BCU-Backend

BCU-Backend is a Node.js backend project for managing and serving data for the Mickey's Hub application.

## Features

- RESTful API endpoints
- User authentication and authorization
- Database integration
- Error handling and logging

## Folder Structure

```
BCU-Backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── utils/
├── config/
├── tests/
├── package.json
├── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

```bash
npm install
```

### Running the Server

```bash
npm start
```

### Environment Variables

Create a `.env` file in the root directory and configure the following:

```
PORT=3000
DB_URI=your_database_uri
JWT_SECRET=your_jwt_secret
```

## API Documentation

See [`docs/API.md`](docs/API.md) for detailed endpoint information.

## Testing

```bash
npm test
```

## Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you would like to change.

## License

MIT
