export function filterUniqueBy<T, K extends keyof T>(
  arr: T[],
  prop: K,
  prop2?: K,
): T[] {
  return arr.reduce((acc: T[], curr) => {
    if (
      !acc.some(el =>
        prop2
          ? el[prop] === curr[prop] && el[prop2] === curr[prop2]
          : el[prop] === curr[prop],
      )
    )
      acc.push(curr)

    return acc
  }, [])
}
