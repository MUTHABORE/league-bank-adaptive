export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const valueMask = (value, unit=` рублей`) => {
	console.log(value)
	console.log(value.toLocaleString() + unit)
	if (isNaN(value) || value === `Некорректное значение`) return value;
	return value.toLocaleString() + unit;
};

export const yearsMask = (years) => {
	return years + ` лет`;
};

export const valueFloorPenny = (value) => {
	return Math.floor(value * 100) / 100;
};
