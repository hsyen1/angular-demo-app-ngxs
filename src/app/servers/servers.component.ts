import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Actions, Select, Store} from '@ngxs/store';
import {ServerDetailsState} from '../state/server.state';
import {Observable} from 'rxjs';
import {IServer} from '../model/IServer';
import {GetServerListAction} from '../action/server.action';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  private servers: {id: number, name: string, status: string}[] = [];
  private serverList: IServer[] = [];

  @Select(ServerDetailsState.getHasData) hasData$: Observable<boolean>;
  @Select(ServerDetailsState.getLoading) loading$: Observable<boolean>;
  @Select(ServerDetailsState.getServerList) serverList$: Observable<IServer[]>;

  constructor(private serversService: ServersService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store,
              private action$: Actions) {
  }

  ngOnInit() {
    //this.servers = this.serversService.getServers();
    this.store.dispatch(new GetServerListAction());
    this.serverList$.subscribe(res => {
      this.serverList = res;
    });
  }

  onReload() {
    // this.router.navigate(['servers'], {relativeTo: this.route});
  }

}
