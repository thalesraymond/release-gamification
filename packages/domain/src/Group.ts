export default class Group {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly parent: Group | null,
  ) {}
}
