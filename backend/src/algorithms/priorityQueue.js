class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(incident) {
    this.items.push(incident);

    this.items.sort(
      (a, b) => b.severity - a.severity
    );
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    return this.items.shift();
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.items[0];
  }

  removeById(id) {
    this.items = this.items.filter(
      (incident) =>
        incident._id.toString() !==
        id.toString()
    );
  }

  getAll() {
    return this.items;
  }

  clear() {
    this.items = [];
  }

  isEmpty() {
    return this.items.length === 0;
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