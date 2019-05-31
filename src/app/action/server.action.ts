import {IServer} from '../model/IServer';

export class GetServerListAction {
  static readonly type = '[Server] Fetch server list';
  constructor() {}
}

export class StoreServerListAction {
  static readonly type = '[Server] Store server list';
  payload: IServer[];
  constructor(payload: IServer[]) {
    this.payload = payload;
  }
}
