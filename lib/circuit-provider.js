/**
 * Data provider per circuiti
 */
module.exports.create = () => {
    
    /**
     * Reperisce il circuito da repository
     * @param {int} circuitId Id circuito 
     */
    const getCircuitById = circuitId => {
        // TODO: sostituire dati mock con fetch da repository
        return {
            id: circuitId,
            description: 'Dummy Circuit',
            clazz: 'dummy-circuit-handler',
            commands: {
                on: {
                    action: 'switchOn'
                },
                off: {
                    action: 'switchOff'
                }
            }
        };
    };

    return {
        getCircuitById
    };

}
