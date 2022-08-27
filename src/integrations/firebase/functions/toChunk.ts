export function toChunk<T>(stringArray: T[], chunkSize: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < stringArray.length; i += chunkSize) {
    const chunk: T[] = stringArray.slice(i, i + chunkSize)
    result.push(chunk)
  }
  return result
}

export default toChunk
