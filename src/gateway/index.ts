export class Gateway implements IGateway {
  async send(userId: string, message: string): Promise<void> {
    console.info(`INFO: sending message to user ${userId}`);
    console.info(`INFO: message - ${message}`);
  }
}

export interface IGateway {
  send(userId: string, message: string): Promise<void>;
}
