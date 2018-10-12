module.exports.create = () => {

    const getCircuitById = circuitId => {
        // MOCK
        return {
            id: circuitId,
            description: 'Dummy Circuit'
        };
    }

    return {
        getCircuitById
    };

}
