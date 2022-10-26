

const validateCollection = (collection = '', collectionsAllowed = []) => {

    if(!collectionsAllowed.includes(collection)){
      throw new Error(`Coleccion ${collection} no permitida -- ${collectionsAllowed}`);
    }

    return true;

}

module.exports = {
  validateCollection
}