module.exports = (playersArr) => {
  if (typeof playersArr === "object" && playersArr.length <= 100) {
    const sortedList = playersArr.sort((a, b) => {
      return b.points - a.points;
    });

    const top10Players = sortedList.splice(0, 10);

    return top10Players;
  } else return [];
};
