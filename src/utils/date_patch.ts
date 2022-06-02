export const datePatch = (obj: any) => {
  const dummy = [];
  for (let i = 0; i < obj.length - 1; i++) {
    const prev = new Date(obj[i].date).getTime();

    const prevAft = new Date(obj[i + 1].date).getTime();

    if (!isNaN(prevAft)) {
      const minus = prevAft - prev;
      const day = minus / 1000 / 60 / 60 / 24;

      for (let j = 1; j < day; j++) {
        let whiteSpace = new Date(prev).getTime() + 86400000 * j;
        if (
          new Date(whiteSpace).getDay() !== 0 &&
          new Date(whiteSpace).getDay() !== 6
        ) {
          let str = {
            date: new Date(whiteSpace).toISOString().split("T")[0],
          };
          dummy.push(str);
        }
      }
    }
  }
  const result = dummy.concat(obj);

  result.sort((a, b) => {
    let da: any = new Date(a.date),
      db: any = new Date(b.date)
    return da - db;
  });
  return result;
};