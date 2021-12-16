
export const getLocation = (args: { lat?: string; lon?: string; }) => {
  const { lat, lon } = args

  if (lat && lon) {
    return lat + "," + lon
  }
  return null
}
