export const selectDate = () => {
  const date = new Date();
  let year = date.getFullYear();
  let yearArr = [];
  let monthArr = [];
  let dayArr = [];
  for (let i = year; i >= 1920; i--) {
    yearArr.push(i);
  }
  for (let i = 1; i <= 12; i++) {
    monthArr.push(i);
  }
  for (let i = 1; i <= 31; i++) {
    dayArr.push(i);
  }
  let obj = {
    yearArr,
    monthArr,
    dayArr,
  };
  return obj;
};
