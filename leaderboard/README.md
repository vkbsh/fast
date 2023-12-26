# Leaderboard service

This is the leaderboard service that provides a list of all players with their times.
You should use this service as backend service for your application.

## Start the service

You'll need Docker installed to start the service. First we will build the image:
```
docker build . --tag leaderboard
```

Next, start the service and keep it running in the terminal:
```
docker run -p 12345:12345 leaderboard
```

You can stop the service by pressing `CTRL+C`. Whenever you stop and restart the service, the leaderboard will
be cleared.

## Endpoints

The services has 3 endpoints to use.

### `GET /leaderboard`

Returns the players including their time (in seconds):

#### Response
```
{
    "scores": [
        {
            "name": "Anna",
            "email": "anna@me.com",
            "seconds": 55
        },
        {
            "name": "Bob",
            "email": "bob@me.com",
            "seconds": 52
        },
        {
            "name": "Charles",
            "email": "charles@me.com",
            "seconds": 74
        },
        {
            "name": "Dave",
            "email": "dave@me.com",
            "seconds": 32
        }
    ]
}
```

### `POST /leaderboard`

Adds a player and their time to the leaderboard.

#### Request
```
{
    "name": "Edwin",
    "email": "edwin@me.com",
    "seconds": 33
}
```

#### Response
```
{
    "scores": [
        {
            "name": "Anna",
            "email": "anna@me.com",
            "seconds": 55
        },
        {
            "name": "Bob",
            "email": "bob@me.com",
            "seconds": 52
        },
        {
            "name": "Charles",
            "email": "charles@me.com",
            "seconds": 74
        },
        {
            "name": "Dave",
            "email": "dave@me.com",
            "seconds": 32
        },
        {
            "name": "Edwin",
            "email": "edwin@me.com",
            "seconds": 33
        }
    ]
}
```

### `DELETE /leaderboard`

Remove all players and their times from the leaderboard.
This can be useful when testing the application.
