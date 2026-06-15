class PriorityQueue {
  constructor() {
    this.items = [];
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  swap(i, j) {
    [this.items[i], this.items[j]] = [
      this.items[j],
      this.items[i],
    ];
  }

  heapifyUp(index) {
    while (index > 0) {
      const parent =
        this.getParentIndex(index);

      if (
        this.items[parent].severity >=
        this.items[index].severity
      ) {
        break;
      }

      this.swap(parent, index);

      index = parent;
    }
  }

  heapifyDown(index) {
    const size = this.items.length;

    while (true) {
      let largest = index;

      const left =
        this.getLeftChildIndex(index);

      const right =
        this.getRightChildIndex(index);

      if (
        left < size &&
        this.items[left].severity >
          this.items[largest].severity
      ) {
        largest = left;
      }

      if (
        right < size &&
        this.items[right].severity >
          this.items[largest].severity
      ) {
        largest = right;
      }

      if (largest === index) {
        break;
      }

      this.swap(index, largest);

      index = largest;
    }
  }

  enqueue(incident) {
    this.items.push(incident);

    this.heapifyUp(
      this.items.length - 1
    );
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    if (this.items.length === 1) {
      return this.items.pop();
    }

    const root = this.items[0];

    this.items[0] =
      this.items.pop();

    this.heapifyDown(0);

    return root;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.items[0];
  }

  removeById(id) {
    const index =
      this.items.findIndex(
        (incident) =>
          incident._id.toString() ===
          id.toString()
      );

    if (index === -1) {
      return;
    }

    const last =
      this.items.pop();

    if (
      index <
      this.items.length
    ) {
      this.items[index] = last;

      this.heapifyUp(index);

      this.heapifyDown(index);
    }
  }

  getAll() {
    return [...this.items];
  }

  clear() {
    this.items = [];
  }

  isEmpty() {
    return (
      this.items.length === 0
    );
  }

  size() {
    return this.items.length;
  }
}

const emergencyQueue =
  new PriorityQueue();

module.exports = {
  PriorityQueue,
  emergencyQueue,
};