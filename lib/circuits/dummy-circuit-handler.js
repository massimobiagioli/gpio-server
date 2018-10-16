module.exports.create = () => {

    const CIRCUIT_STATE = {
        UNKNOWN: 'UNKNOWN',
        IDLE: 'IDLE',
        INIT: 'INIT',
        LOOP: 'LOOP',
        TERMINATE: 'TERMINATE'
    };
    
    const CIRCUIT_COMMANDS = {
        UNKNOWN: 'UNKNOWN',
        NONE: 'NONE',
        SWITCH_ON: 'switchOn',
        SWITCH_OFF: 'switchOff'
    };

    let circuitState = CIRCUIT_STATE.IDLE;
    let oldCircuitState = CIRCUIT_STATE.UNKNOWN;

    let command = CIRCUIT_COMMANDS.NONE;
    let oldCommand = CIRCUIT_COMMANDS.UNKNOWN;

    const loop = () => {
        oldCircuitState = circuitState

        switch (circuitState) {
            case CIRCUIT_STATE.IDLE:          
                break;        
            case CIRCUIT_STATE.INIT:
                handleInit();
                break;
            case CIRCUIT_STATE.LOOP:
                handleLoop();
                break;
            case CIRCUIT_STATE.TERMINATE:
                handleTerminate();
                break;
        }
    };

    const init = () => {
        circuitState = CIRCUIT_STATE.INIT;
    };

    const terminate = callback => {
        circuitState = CIRCUIT_STATE.TERMINATE;
        callback();
    };

    const executeCommand = newCommand => {
        command = newCommand;
    };

    const switchOn = () => {
        console.log('LED ON');
    };

    const switchOff = () => {
        console.log('LED OFF');
    };

    const handleInit = () => {
        console.log('init .....');
        circuitState = CIRCUIT_STATE.LOOP;
    };

    const handleLoop = () => {
        if (command.action === oldCommand.action) {
            return;
        }
        oldCommand = command;

        switch (command.action) {
            case CIRCUIT_COMMANDS.SWITCH_ON:
                switchOn();
                break;
            case CIRCUIT_COMMANDS.SWITCH_OFF:
                switchOff();
                break;
        }
    }

    const handleTerminate = () => {
        console.log('term .....');
        switchOff();
    };

    return {
        loop,
        init,
        terminate,
        executeCommand
    };

}