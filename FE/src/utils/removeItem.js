// Xóa phan tu khoi mang
export const remove = (item, list) => {
  let index = list.indexOf(item, 0);
  list.splice(index, 1);
  return list;
};
