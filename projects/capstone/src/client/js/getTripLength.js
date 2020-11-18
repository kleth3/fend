const getTripLength = (start, end) => {
    console.log(start, end);
    const diff = end - start;
    const days = Math.round(diff * 1.15741e-8);
    return days;
}

export { getTripLength };