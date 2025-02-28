const isValidEnumValue = (value, enumObject) => {
    return Object.values(enumObject).includes(value);
};

const listEnumValues = (enumObject) => Object.values(enumObject);

const isValidAmount = (value) => {
    return /^\d+(\.\d{1,2})?$/.test(value);
}

module.exports = { isValidEnumValue, listEnumValues, isValidAmount};