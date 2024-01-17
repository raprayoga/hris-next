export const getItemFromLocalStorage = (keyword: string) => {
  const dataFromStorage = localStorage.getItem(keyword)
  if (dataFromStorage) {
    const resultJson = JSON.parse(dataFromStorage)
    if (resultJson) {
      return resultJson
    }
  }
  return null
}