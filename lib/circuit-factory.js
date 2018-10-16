module.exports.create = () => {

    const getCircuitHandler = circuit => {
        return require(`./circuits/${circuit.clazz}`).create();
    }

    return {
        getCircuitHandler
    };
}
