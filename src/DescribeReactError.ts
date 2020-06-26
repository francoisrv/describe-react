export default class DescribeReactError extends Error {
  constructor(m: string) {
    super(m);

    this.name = 'DescribeReactError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}