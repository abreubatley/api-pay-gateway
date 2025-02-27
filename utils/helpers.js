const isValidEnumValue = (value, enumObject) => {
    return Object.values(enumObject).includes(value);
};

const listEnumValues = (enumObject) => Object.values(enumObject);

module.exports = { isValidEnumValue, listEnumValues};