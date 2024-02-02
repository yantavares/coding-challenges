class PriorityQueue<T> {
  private items: { value: T; priority: number }[] = [];

  enqueue(value: T, priority: number): void {
    const node = { value, priority };
    this.items.push(node);
    this.items.sort((a, b) => a.priority - b.priority);
  }

  dequeue(): T | undefined {
    return this.items.shift()?.value;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  peek(): T | undefined {
    return this.items[0]?.value;
  }

  getCount(): number {
    return this.items.length;
  }
}

export default PriorityQueue;
