export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const valueMask = (value) => {
	if (isNaN(value)) return value;
	var result = value.toLocaleString() + ` рублей`;
	return result;
}
