const parseLine = (line) => {
  return Object.keys(line).reduce(
    (accumulator, currentValue) => { 
      if(currentValue!== "Amount") {
        accumulator[currentValue.toLocaleLowerCase()] = line[currentValue];
      };
      return accumulator
    },
    {}
  );
};

export default parseLine;
