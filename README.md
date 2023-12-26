# The Fastned Charging Game

**This is the Fastned React assessment. The assessment is intended to give us insights into your technical abilities, 
engineering approach, and general technical working habits. We view your performance on this assessment as indicative of
the work you will deliver as a Front End engineer.**

The assessment consists of an assignment to prepare beforehand and a presentation about your implementation of the 
assignment at Fastned’s office or through video conference.

We ask you to treat the assessment confidential so we can use it again in the future. Please submit your solution 
when you think it's ready.

---------------

## The Charging Game
You'll design and implement The Fastned Charging Game. The goal of the game is to provide electricity from our charger 
to your electrical vehicle (EV) as fast as possible. When the user starts a new game, a timer will run to measure how 
long it takes you to create an electric circuit from the **charger** to the **car**. As soon as the circuit is 
established, the timer will stop and your name, email and time will be added to the leaderboard. The game will show the 
names and email addresses of the top 5 players with their fastest time. You can use the 
[Leaderboard service](#leaderboard-service) to submit scores and retrieve the top players.

The **game board** consists of 9 cells, each containing an electrical cable. The charger is connected to the left side 
of the top left cell. The car is connected to the right side of the bottom right cell.

| **Charger →** | **cell** | **cell** | **cell** |           |
|---------------|----------|----------|----------|-----------|
|               | **cell** | **cell** | **cell** |           |
|               | **cell** | **cell** | **cell** | **→ Car** | 

Each **cell** contains an electrical **cable** connecting 2 sides of the **cell** in either a 90 degree angle or in a 
straight line:

* `-`
* `|`
* `┐`
* `└`
* `┘`
* `┌`

The cable in the cell can be rotated at 90 degree increments to connect different **sides** of each cell.

## Requirements
* Create the game using React (components).
* The game grid is a 3 by 3 grid of cells, each containing a (part of the) cable. The cables can be rotated by the player in steps of 90 degree increments.
* The game should detect when there is a full circuit from the charger to the car, stop the timer and add the user to the leaderboard.
* Every game should generate a new random puzzle.
  * The puzzle doesn't have to be solvable, because this can be quite complex.
  * When you have time remaining or just want to impress us, you can generate a random AND solvable puzzle.
* A timer is showing how long the current game is taking. The user also needs to provide their (nick)name and email address to use for the leaderboard.
* When the puzzle is solved (electricity can flow from the charger to the car), the (nick)name and email are send to the [Leaderboard service](#leaderboard-service), so it will show on the page.
* Validations rules for the data to be submitted:
    * Name: `required`,`lettersOnly`, `minLength: 3`
    * Email: `required`,`format: email`
* Records displayed in the leaderboard must be filterable by `name`.
* Our designer made the design for the [charger component](https://www.figma.com/file/zCsqKGsDDXSZQJocQyZVmk/FE-task?type=design&node-id=2582%3A13843&mode=design&t=FyTGWMo2MX31Ywfp-1) (Password: `wechargefast`) and your job is to build this component pixel perfect.
* **The rest of the game design and logic is up to you**. Feel free to make it as fancy as you want, if you want to show off a bit.
* Make sure there are component tests for the cell component containing the (partly) charger cable covering all of its functionality.
* Project should be written in Typescript.
* Project should have ESLint & prettier setup.
* Project should use React Queries (v4 or above) for the API requests.
* Take into consideration while building the game:
  * Readability and comprehensibility of the code (Clean code)
  * Testing your solution (e.g Unit testing)
  * Conscious design/technical decisions
* Big plus:
  * Using Next.js
  * Using Tailwind

## Leaderboard service
Your application can interact with the leaderboard service. This service is available in the [repository](./leaderboard) 
and can be started with Docker. The service provides 3 URLs:

`GET: /leaderboard` Returns the players with their name, email address and time

`POST: /leaderboard` Add the time, name and email address of a player to the leaderboard service

`DELETE: /leaderboard` Remove all times from the leaderboard. This can be useful if you want to reset the leaderboard 
while implementing your solution.

You can find more information about how to start this service locally in the [README.md](./leaderboard/README.md) file of the leaderboard
directory.
