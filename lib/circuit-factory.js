/**
 * Factory per creazione circuitHandler
 */
module.exports.create = () => {
    const logger = require('./logger');

    /**
     * Restituisce nuova istanza della classe handler per il circuito specificato
     * @param {object} circuit Circuito da gestire 
     */
    const getCircuitHandler = circuit => {
        try {
            return require(`./circuits/${circuit.clazz}`).create();
        } catch (e) {
            logger.error(`Bad circuit class: ${circuit.clazz}`);
            return null;
        }         
    }

    return {
        getCircuitHandler
    };
}
