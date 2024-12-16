import Fastify from 'fastify'
import cors from '@fastify/cors';
import { drivers, teams } from './repository/data';

const server = Fastify({
  logger: true
});

server.register(cors, {
  origin: "*"
})

interface IdParam {
  id: string
}


// Declare a route
server.get('/teams', async (request, response) => {
    response.type("application/json").code(200);
    return teams;
})

server.get<{Params: IdParam}>('/teams/:id', async (request, response) => {
  const id: number = parseInt(request.params.id);
  response.type("application/json")
  let team = teams.find(q => q.id == id)
  if (!team)
  {
    response.code(404);
    return {message: `Team id: ${id}, not found`}
  }
    
  response.code(200);
  return team;
})

server.get('/drivers', async (request, response) => {
  response.type("application/json").code(200);
  return drivers;
})

server.get<{Params: IdParam}>('/drivers/:id', async (request, response) => {
  const id: number = parseInt(request.params.id);
  response.type("application/json")
  let driver = drivers.find(q => q.id == id)
  if (!driver)
  {
    response.code(404);
    return {message: `Driver id: ${id}, not found`}
  }
    
  response.code(200);
  return driver;
})

// Run the server!
try {

  server.listen({ port: 1701 }, () => {
    console.log("node server up")
  })
} catch (err) {
  server.log.error(err)
  process.exit(1)
}