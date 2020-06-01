import { Injectable } from '@angular/core';
import { HttpProxyService } from 'src/app/shared/services/http-proxy.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private readonly httpProxyService: HttpProxyService) {}

  /**
   * to list projects
   */
  getProjects(): Observable<any> {
    return this.httpProxyService.get(`projects.json`);
  }
}
