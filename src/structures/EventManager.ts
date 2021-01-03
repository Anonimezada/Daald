import Client from './Client'

export default class EventManager {

  private client: Client;
  private events: Map<string, string>;

  constructor(client: Client){
    this.client = client;
    this.events = new Map();
  }

  add(name: string, filepath:string, event) {
    event.dir = filepath;
    event.run = event.run.bind(event);
    this.client.on(name, event.run);
    this.events.set(name, event);
  }
}
