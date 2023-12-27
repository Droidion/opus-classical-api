import { describe, expect, test } from 'bun:test'
import { filterUniqueBy } from './filterByUniqueId'

describe('filterUniqueBy', () => {
  test('filters unique elements', () => {
    const elements = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'John' },
      { id: 4, name: 'Bob' },
      { id: 5, name: 'Jane' },
    ]

    const uniqueElements = filterUniqueBy(elements, 'name')
    expect(uniqueElements.length).toBe(3)
    expect(uniqueElements[0]?.name).toBe('John')
    expect(uniqueElements[1]?.name).toBe('Jane')
    expect(uniqueElements[2]?.name).toBe('Bob')
  })
})
