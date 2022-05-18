import crawler from "./crawler";

const interval = async () => {
  const currentDate = new Date();
  setInterval(() => {
    if (
      currentDate.getDay() !== 6 &&
      currentDate.getDay() !== 0 &&
      currentDate.getHours() >= 8 &&
      currentDate.getHours() <= 16
    ) {
      crawler();
    }
  }, 60000);
};

export default interval