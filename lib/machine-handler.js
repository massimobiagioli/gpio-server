module.exports.create = options => {
    
    const DEFAULT_LOOP_INTERVAL = 500;

    const MACHINE_STATE = {
        UNKNOWN: 'UNKNOWN',
        INIT: 'INIT',
        CHANGE_CIRCUIT: 'CHANGE_CIRCUIT'
    }

    let machineState = MACHINE_STATE.INIT;
    let oldMachineState = MACHINE_STATE.UNKNOWN;
    let externalInterval;

    const getMachineState = () => {
        return machineState;
    }    

    const start = () => {
        externalInterval = setInterval(() => {
            switch (machineState) {
                case MACHINE_STATE.INIT:            
                    break;        
                case MACHINE_STATE.CHANGE_CIRCUIT:                
                    break;
            }
            oldMachineState = machineState
        
        }, options.loopInterval || DEFAULT_LOOP_INTERVAL);    
    }

    const shutdown = () => { 
        clearInterval(externalInterval);
    };
    
    return {
        getMachineState,
        start,
        shutdown
    }

}