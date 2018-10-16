module.exports.create = () => {
  
    const getCircuitById = circuitId => {
        // MOCK
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
