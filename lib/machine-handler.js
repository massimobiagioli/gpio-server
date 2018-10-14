module.exports.create = (options) => {
    const logger = require('./logger');
    const circuitFactory = require('./circuit-factory').create();

    const DEFAULT_LOOP_INTERVAL = 500;

    const MACHINE_STATE = {
        UNKNOWN: 'UNKNOWN',
        IDLE: 'IDLE',
        CHANGE_CIRCUIT: 'CHANGE_CIRCUIT',
        LOOP_CIRCUIT: 'LOOP_CIRCUIT',
        TERMINATE_CIRCUIT: 'TERMINATE_CIRCUIT'
    };

    let machineState = MACHINE_STATE.IDLE;
    let oldMachineState = MACHINE_STATE.UNKNOWN;
    let externalInterval = null;
    let circuit = null;
    let circuitHandler = null;

    const getMachineState = () => {
        return machineState;
    };    

    const changeCircuit = (newCircuit) => {
        machineState = MACHINE_STATE.CHANGE_CIRCUIT;
        circuit = newCircuit;
        logger.info(`New circuit: ${JSON.stringify(circuit)}`);
    };    

    const terminateCircuit = () => {
        machineState = MACHINE_STATE.TERMINATE_CIRCUIT;
        logger.info(`Stopping circuit: ${JSON.stringify(circuit)}`);
    };

    const doAction = action => {
        let command = circuit.commands[action];
        if (!command) {
            logger.error(`Bad action: ${action}`);
            return;
        }
        logger.info(`Command ${command.action} sent to circuit: ${circuit.id}`);
        circuitHandler.executeCommand(command);
    };

    const start = () => {
        externalInterval = setInterval(() => {
            notifyStateChanged();  
            oldMachineState = machineState

            switch (machineState) {
                case MACHINE_STATE.IDLE:          
                    break;        
                case MACHINE_STATE.CHANGE_CIRCUIT:      
                    handleChangeCircuit();          
                    break;
                case MACHINE_STATE.LOOP_CIRCUIT:
                    handleLoopCircuit();
                    break;
                case MACHINE_STATE.TERMINATE_CIRCUIT:
                    handleTerminateCircuit();
                    break;
            }
        
        }, options.loopInterval || DEFAULT_LOOP_INTERVAL);    
    };

    const handleChangeCircuit = () => {
        if (!circuit) {
            logger.error('Undefined circuit');
            machineState = MACHINE_STATE.IDLE;
            return;
        }
        circuitHandler = circuitFactory.getCircuitHandler(circuit);
        if (!circuitHandler) {
            logger.error(`Bad circuit id: ${circuit.id}`);
            machineState = MACHINE_STATE.IDLE;
            return;
        }
        machineState = MACHINE_STATE.LOOP_CIRCUIT;
        circuitHandler.init();
    };

    const handleLoopCircuit = () => {
        circuitHandler.loop();
    };

    const handleTerminateCircuit = () => {
        circuitHandler.terminate();
        machineState = MACHINE_STATE.IDLE;
        logger.info(`Circuit terminated: ${JSON.stringify(circuit)}`);
        circuit = null;
    };

    const notifyStateChanged = () => {
        if (machineState !== oldMachineState) {
            logger.info(`Machine state changed: ${oldMachineState} -> ${machineState}`);
        }
    };

    const shutdown = () => { 
        clearInterval(externalInterval);
    };
    
    return {
        getMachineState,
        changeCircuit,
        terminateCircuit,
        start,
        shutdown,
        doAction
    };

}
