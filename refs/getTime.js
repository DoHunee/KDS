const getTimePassedSec = () => {
  const date = new Date();
  const time = date.getTime();
  return Math.round(time / 1000);
};
export default getTimePassedSec;