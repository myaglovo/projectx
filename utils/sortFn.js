export function sortByDate(arrayOfObjects, sortType) {
  if (sortType === "asc") {
    return arrayOfObjects.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  }
  if (sortType === "desc") {
    return arrayOfObjects.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }
}
