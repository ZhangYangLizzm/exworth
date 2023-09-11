export const getDirectionClass = (direction) => {
    if (!direction) {
      return "text-primary text-plus";
    }
    return "text-danger text-minus";
  };