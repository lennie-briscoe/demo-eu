export default {
    lerp: (a, b, n) => {
        return a * (1 - n) + b * n;
    },
    norm: (value, min, max) => {
        return (value - min) / (max - min);
    }
};
