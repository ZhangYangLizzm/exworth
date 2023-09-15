export const DirectionClass = (direction:number|boolean) => {
  if (!direction) {
    return "text-primary text-plus";
  }
  return "text-danger text-minus";
};