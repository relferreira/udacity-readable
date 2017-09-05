export function organizeValues(values, sortBy, order, selectedCategory = null) {
  return values
    .filter(value => !value.deleted)
    .filter(
      value => (selectedCategory ? value.category === selectedCategory : value)
    )
    .sort(
      (value1, value2) =>
        order === 'asc'
          ? value1[sortBy] - value2[sortBy]
          : value2[sortBy] - value1[sortBy]
    );
}
