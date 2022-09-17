export const getDateToquery = (dateInfo: any) => {
  let dateToquery = "111111-invald";
  if (dateInfo !== "invalid") {
    const numberdateInfo = 0 + Number(dateInfo);

    const date = new Date();
    date.setDate(date.getDate() + numberdateInfo);

    dateToquery = date.toISOString().slice(0, 10).replace(/-/g, "");
  }
  return dateToquery;
};
