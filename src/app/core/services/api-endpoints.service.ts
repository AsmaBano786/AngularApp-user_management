// Angular Modules
import { Injectable } from '@angular/core';
// Application Classes
import { UrlBuilder } from '../../shared/classes/url-builder';
import { QueryStringParameters } from '../../shared/classes/query-string-parameters';

// Application Constants
import { Constants } from 'src/app/config/constant';

@Injectable()
export class ApiEndpointsService {
  constructor(
    // Application Constants
    private _constants: Constants
  ) { }
  /* #region URL CREATOR */
  // URL
  private createUrl(
    action: string,
    isMockAPI: boolean = false
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      isMockAPI ? this._constants.API_MOCK_ENDPOINT :
        this._constants.API_ENDPOINT,
      action
    );
    return urlBuilder.toString();
  }
  // URL WITH QUERY PARAMS
  private createUrlWithQueryParameters(
    action: string,
    queryStringHandler?:
      (queryStringParameters: QueryStringParameters) => void
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this._constants.API_ENDPOINT,
      action
    );
    // Push extra query string params
    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }
    return urlBuilder.toString();
  }

  // URL WITH QUERY PARAMS
  private createUrlWithQueryParametersExclude(
    action: string,
    queryStringHandler?:
      (queryStringParameters: QueryStringParameters) => void
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this._constants.API_ENDPOINT,
      action
    );
    // Push extra query string params
    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }
    return urlBuilder.toString();
  }

  // URL WITH PATH VARIABLES
  private createUrlWithPathVariables(
    action: string,
    pathVariables: any[] = []
  ): string {
    let encodedPathVariablesUrl: string = '';
    // Push extra path variables
    for (const pathVariable of pathVariables) {
      if (pathVariable !== null) {
        encodedPathVariablesUrl +=
          `${encodeURIComponent(pathVariable.toString())}/`;
      }
    }
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this._constants.API_ENDPOINT,
      `${action}${encodedPathVariablesUrl}`
    );
    return urlBuilder.toString();
  }
  /* #endregion */

  private createPostInstallUrl(
    action: string,
    isMockAPI: boolean = false
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      isMockAPI ? this._constants.API_MOCK_ENDPOINT :
        '',
      action
    );
    return urlBuilder.toString();
  }


  public createUserEndpoint() {
    return this.createUrl(this._constants.createUserEndpoint);
  }
  public updateUserEndpoint(id:any) {
    return this.createUrl(this._constants.updateUserEndpoint + '/' + id);
  }
  
  public getUserListEndpoint() {
    return this.createUrl(this._constants.getUserListEndpoint);
  }
  public getUserByIdEndpoint(id:any){
    return this.createUrl(this._constants.getUserByIdEndpoint+ '/' + id);
  }
  
  public DeleteUserEndpoint(id:any){
    return this.createUrl(this._constants.DeleteUserEndpoint+ '/' + id);
  }
  public retrievePdfEndpoint(id:any){
    return this.createUrl(this._constants.retrievePdfEndpoint+ '/' + id);
  }
  
  public generatePdfEndpoint(id:any) {
    return this.createUrl(this._constants.generatePdfEndpoint+ '/' + id);
  }
  
}


