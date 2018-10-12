module.exports.create = (options, logger) => {
    
    const DEFAULT_LOOP_INTERVAL = 500;

    const MACHINE_STATE = {
        UNKNOWN: 'UNKNOWN',
        IDLE: 'IDLE',
        CHANGE_CIRCUIT: 'CHANGE_CIRCUIT'
    }

    let machineState = MACHINE_STATE.IDLE;
    let oldMachineState = MACHINE_STATE.UNKNOWN;
    let externalInterval = null;
    let circuit = null;

    const getMachineState = () => {
        return machineState;
    }    

    const changeCircuit = (newCircuit) => {
        machineState = MACHINE_STATE.CHANGE_CIRCUIT;
        circuit = newCircuit;
        logger.info(`New circuit: ${JSON.stringify(circuit)}`);
    }    

    const start = () => {
        externalInterval = setInterval(() => {
            notifyStateChanged();  

            switch (machineState) {
                case MACHINE_STATE.IDLE:          
                    break;        
                case MACHINE_STATE.CHANGE_CIRCUIT:                
                    break;
            }
            
            oldMachineState = machineState
        
        }, options.loopInterval || DEFAULT_LOOP_INTERVAL);    
    }

    const notifyStateChanged = () => {
        if (machineState !== oldMachineState) {
            logger.info(`Machine state changed: ${oldMachineState} -> ${machineState}`);
        }
    }

    const shutdown = () => { 
        clearInterval(externalInterval);
    };
    
    return {
        getMachineState,
        changeCircuit,
        start,
        shutdown
    };

}
