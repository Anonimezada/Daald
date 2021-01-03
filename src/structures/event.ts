import DaaldClient from "./Client";

export default abstract class Event {
  public client!: DaaldClient;

  public abstract run(...args: unknown[]): unknown;

  public dir!: string;

  public name!: string;

  constructor(client: DaaldClient, name: string) {
    this.client = client;
    this.name = name;
  }
}