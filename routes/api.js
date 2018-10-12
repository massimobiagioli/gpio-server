module.exports.create = (express, machineHandler) => {
    const router = express.Router();
    const circuitProvider = require('./../lib/circuit-provider').create();

    router.get('/ping', (req, res) => {
        res.send('pong');
    });
    
    router.get('/changeCircuit/:id', (req, res) => {
        let circuit = circuitProvider.getCircuitById(req.params.id);
        machineHandler.changeCircuit(circuit);
        res.send(circuit);
    });

    return router;
}
