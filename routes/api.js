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

    router.get('/terminateCircuit', (req, res) => {
        machineHandler.terminateCircuit();
        res.send('circuit terminated');
    });

    router.get('/doAction/:action', (req, res) => {
        let action = req.params.action;
        machineHandler.doAction(action);
        res.send(`action sent: ${action}`);
    });

    return router;
}
