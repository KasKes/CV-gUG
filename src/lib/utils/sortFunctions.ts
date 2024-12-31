// sort by date
export const sortByDate = (array: any[]) => {
  const sortedArray = array.sort((postA: any, postB: any) => {
    if (!postA.data.date) return 1;
    if (!postB.data.date) return -1;

    const dateA = new Date(postA.data.date ?? "").valueOf();
    const dateB = new Date(postB.data.date ?? "").valueOf();

    return dateB - dateA; // Descending order (latest first)
  });
  return sortedArray;
};

// sort product by weight
export const sortByWeight = (array: any[]) => {
  const withWeight = array.filter(
    (item: { data: { weight: any } }) => item.data.weight,
  );
  const withoutWeight = array.filter(
    (item: { data: { weight: any } }) => !item.data.weight,
  );
  const sortedWeightedArray = withWeight.sort(
    (a: { data: { weight: number } }, b: { data: { weight: number } }) =>
      a.data.weight - b.data.weight,
  );
  const sortedArray = [...new Set([...sortedWeightedArray, ...withoutWeight])];
  return sortedArray;
};