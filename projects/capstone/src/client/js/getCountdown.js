const getCountdown = (inDate) => {
    let d = new Date();
    d.setHours(0, 0, 0, 0);
    console.log(d.getDate());
    // Convert from miliseconds to days
    const diffDate = inDate - d;
    const days = Math.round(diffDate * 1.15741e-8);
    return days;
}

export { getCountdown }