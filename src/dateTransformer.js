function dateTransformer(isoDate) {
  return (
    isoDate.slice(8, 10) +
    "/" +
    isoDate.slice(5, 7) +
    "/" +
    isoDate.slice(0, 4) +
    " " +
    isoDate.slice(11, 13) +
    ":" +
    isoDate.slice(14, 16)
  );
}

export default dateTransformer;

//2022-02-28T08:00:00.000Z
