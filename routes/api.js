/**
 * API Routes
 */
module.exports.create = (express, machineHandler) => {
    const router = express.Router();
    const circuitProvider = require('./../lib/circuit-provider').create();

    /**
     * Ping
     */
    router.get('/ping', (req, res) => {
        res.send('pong');
    });
    
    /**
     * Cambia circuito
     */
    router.get('/changeCircuit/:id', (req, res) => {
        let circuit = circuitProvider.getCircuitById(req.params.id);
        machineHandler.changeCircuit(circuit);
        res.send(circuit);
    });

    /**
     * Termina circuito attuale
     */
    router.get('/terminateCircuit', (req, res) => {
        machineHandler.terminateCircuit();
        res.send('circuit terminated');
    });

    /**
     * Esegue azione su circuito
     */
    router.get('/doAction/:action', (req, res) => {
        let action = req.params.action;
        machineHandler.doAction(action);
        res.send(`action sent: ${action}`);
    });

    return router;
}
