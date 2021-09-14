export const getCorrectDate = (date, options) => {
  const currentOption =
    options === "time"
      ? { weekday: "short", month: "short", hour: "2-digit", minute: "2-digit" }
      : { weekday: "short", month: "short", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", currentOption);
};
