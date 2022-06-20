 const datePatch = (obj: any) => {
  const dummy = [];
  const desc = obj.reverse()

  for (let i = 0; i < desc.length - 1; i++) {
    const prev = new Date(desc[i].date).getTime();

    const prevAft = new Date(desc[i + 1].date).getTime();



    if (!isNaN(prevAft)) {

      const minus = prevAft - prev;
      const day = minus / 1000 / 60 / 60 / 24;

      for (let j = 1; j < day; j++) {
        let whiteSpace = new Date(prev).getTime() + 86400000 * j;
        let a =  new Date(prev).getTime()
        
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
  const result = dummy.concat(desc);
  const sorted = result.sort((a, b) => {
    let da: any = new Date(a.date),
      db: any = new Date(b.date)
    return da - db;
  });

  return sorted;
};

export default datePatch