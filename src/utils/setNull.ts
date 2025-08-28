export default function setNull(data: any) {
  Object.keys(data).forEach((key) => {
    if (data[key] === null) {
      data[key] = undefined
    } else if (typeof data[key] === 'object') {
      setNull(data[key])
    }
  })
}
