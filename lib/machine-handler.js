/**
 * Gestore macchina a stati
 */
module.exports.create = (options) => {
    const logger = require('./logger');
    const circuitFactory = require('./circuit-factory').create();

    // Costanti per valori di default
    const DEFAULT_LOOP_INTERVAL = 500;

    // Stati della macchina
    const MACHINE_STATE = {
        UNKNOWN: 'UNKNOWN',
        IDLE: 'IDLE',
        CHANGE_CIRCUIT: 'CHANGE_CIRCUIT',
        LOOP_CIRCUIT: 'LOOP_CIRCUIT',
        TERMINATE_CIRCUIT: 'TERMINATE_CIRCUIT'
    };

    // Stato macchina
    let machineState = MACHINE_STATE.IDLE;  
    
    // Stato macchina precedente
    let oldMachineState = MACHINE_STATE.UNKNOWN;
    
    // Intervallo loop esterno
    let externalInterval = null;

    // Circuito attuale
    let circuit = null;

    // Circuito precedente
    let circuitHandler = null;

    /**
     * Restituisce stato macchina attuale
     */
    const getMachineState = () => {
        return machineState;
    };    

    /**
     * Effettua il cambio di circuito
     * @param {object} newCircuit Nuovo circuito 
     */
    const changeCircuit = (newCircuit) => {
        machineState = MACHINE_STATE.CHANGE_CIRCUIT;
        circuit = newCircuit;
        logger.info(`New circuit: ${JSON.stringify(circuit)}`);
    };    

    /**
     * Termina circuito attuale
     */
    const terminateCircuit = () => {
        machineState = MACHINE_STATE.TERMINATE_CIRCUIT;
        logger.info(`Stopping circuit: ${JSON.stringify(circuit)}`);
    };

    /**
     * Esegue azione
     * @param {string} action Azione da eseguire 
     */
    const doAction = action => {
        let command = circuit.commands[action];
        if (!command) {
            logger.error(`Bad action: ${action}`);
            return;
        }
        logger.info(`Command ${command.action} sent to circuit: ${circuit.id}`);
        circuitHandler.executeCommand(command);
    };

    /**
     * Loop
     */
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

    /**
     * Gestione cambio circuito
     */
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

    /**
     * Gestione loop interno
     */
    const handleLoopCircuit = () => {
        circuitHandler.loop();
    };

    /**
     * Gestione terminazione circuito
     */
    const handleTerminateCircuit = () => {
        circuitHandler.terminate(() => {
            machineState = MACHINE_STATE.IDLE;
            logger.info(`Circuit terminated: ${JSON.stringify(circuit)}`);
            circuit = null;    
        });
    };

    /**
     * Notifica cambio di stato
     */
    const notifyStateChanged = () => {
        if (machineState !== oldMachineState) {
            logger.info(`Machine state changed: ${oldMachineState} -> ${machineState}`);
        }
    };

    /**
     * Termina macchina
     */
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
