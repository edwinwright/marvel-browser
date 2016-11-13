const deepFreeze = function (o) {
  Object.freeze(o);

  Object.getOwnPropertyNames(o).forEach((prop) => {
    if ({}.hasOwnProperty.call(o, prop)
    && o[prop] !== null
    && (typeof o[prop] === 'object' || typeof o[prop] === 'function')
    && !Object.isFrozen(o[prop])) {
      deepFreeze(o[prop]);
    }
  });

  return o;
};

export default deepFreeze;
