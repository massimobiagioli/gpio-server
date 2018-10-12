module.exports.create = () => {
    const circuits = {
        dummy: {
            clazz: 'dummy-circuit-handler'
        }
    }

    const getCircuitHandler = circuit => {
        if (!(circuit.id in circuits)) {
            return null;
        }
        return require(`./circuits/${circuits[circuit.id].clazz}`).create();
    }

    return {
        getCircuitHandler
    };

}
