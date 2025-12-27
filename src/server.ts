import fastify from "fastify";

const server = fastify({logger: true});

const drivers = [
    {id: 1, name: "Felipe Massa", team: "Ferrari"},
    {id: 2, name: "Michael Schumacher", team: "Beneton"},
    {id: 3, name: "Ayrton Senna", team: "McLaren"}
];

server.get('/teams', async(request, response) => {
    response.type("application/json").code(200);
    return [{id: 1, name: 'Ferrari'}];
});

server.get("/drivers", async (request, response) => {
    response.type("application/json").code(200);
    return drivers;
});

interface DriverParams {
    id: string
}

server.get<{Params: DriverParams}>("/drivers/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find(driver => driver.id === id);

    if (driver) {
        response.type("application/json").code(200);
        return {driver}
    } 
    
    response.type("application/json").code(404);
    return {message: "Driver not found"};
});


server.listen({port: 3000}, () => {
    console.log('server listen on the port 3000')
})