export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const valueMask = (value) => {
	console.log(value)
	console.log(value.toLocaleString() + ` рублей`)
	if (isNaN(value)) return value;
	return value.toLocaleString() + ` рублей`;
};
