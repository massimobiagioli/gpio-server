module.exports.create = () => {

    const CIRCUIT_STATE = {
        UNKNOWN: 'UNKNOWN',
        IDLE: 'IDLE',
        INIT: 'INIT',
        TERMINATE: 'TERMINATE'
    };
    
    let circuitState = CIRCUIT_STATE.IDLE;
    let oldCircuitState = CIRCUIT_STATE.UNKNOWN;

    const loop = () => {
        oldCircuitState = circuitState

        switch (circuitState) {
            case CIRCUIT_STATE.IDLE:          
                break;        
            case CIRCUIT_STATE.INIT:
                break;
            case CIRCUIT_STATE.TERMINATE:
                break;
        }
    }

    const init = () => {
        circuitState = CIRCUIT_STATE.INIT;
        console.log("circuit dummy - init");
    }

    const terminate = () => {
        circuitState = CIRCUIT_STATE.TERMINATE;
        console.log("circuit dummy - terminate");
    }

    return {
        loop,
        init,
        terminate
    };

}