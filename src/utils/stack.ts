export class Stack<T> {
  private data: T[] = []

  pop () {
    return this.data.pop()
  }

  top () {
    return this.data[this.size() - 1]
  }

  size () {
    return this.data.length
  }

  push (item: T) {
    this.data.push(item)
  }
}
