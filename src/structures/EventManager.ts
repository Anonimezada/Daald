import DaaldClient from "./Client";
import Event from '../structures/event';

export default class EventManager {
  public client: DaaldClient;

  constructor(client: DaaldClient) {
    this.client = client;
  }

  add(event: Event): void {
    event.run = event.run.bind(event);
    this.client.on(event.name, event.run);
  }
}