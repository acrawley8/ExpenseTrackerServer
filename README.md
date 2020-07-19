

# ExpenseTrackerServer



## Usage



## Developing
Run both the front and back end applications: `npm run dev`



## Deploying

*Build client-side application*
`npm run updateClient`

*Building Docker containers and pushing to Docker Hub:*
<version> should take the form "v#.#.#", ie "v1.1.6"
`docker build . -t acrawley08/expense-app:<version>`
`docker push acrawley08/expense-app:<version>`
