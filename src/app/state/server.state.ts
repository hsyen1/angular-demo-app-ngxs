import {IServer} from '../model/IServer';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {ServersService} from '../servers/servers.service';
import {GetServerListAction, StoreServerListAction} from '../action/server.action';

export class ServerListStateModel {
  public serverList? : IServer[];
  public loading: boolean;
  public hasData: boolean;
}

export const serverDefault: ServerListStateModel = {
  serverList: [],
  loading: false,
  hasData: false
};

@State<ServerListStateModel>({
  name: 'server',
  defaults: serverDefault
})

export class ServerDetailsState {

  constructor(private serverService: ServersService) {}

  @Selector()
  public static getServerList(state: ServerListStateModel) {
    return state.serverList;
  }

  @Selector()
  public static getHasData(state: ServerListStateModel) {
    return state.hasData;
  }

  @Selector()
  public static getLoading(state: ServerListStateModel) {
    return state.loading;
  }

  @Action(GetServerListAction)
  getServerList({patchState, getState, dispatch}: StateContext<ServerListStateModel>) {
    patchState({loading: true});
    const state = getState();
    if(state.hasData) {
      dispatch(new StoreServerListAction(state.serverList));
    }

    let serverList: IServer[] = this.serverService.getServers();
    if(serverList) {
      dispatch(new StoreServerListAction(serverList));
    }
  }

  @Action(StoreServerListAction)
  storeServerList({patchState}: StateContext<ServerListStateModel>, action: StoreServerListAction) {
    patchState({
      serverList: action.payload,
      hasData: true,
      loading: false
    });
  }
}
