import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class Constants {

  public readonly API_ENDPOINT: string = environment.apiUrl;
  public readonly API_MOCK_ENDPOINT: string = environment.apiMockUrl;
  public readonly API_IS_DEVELOPMENT_ENV: boolean = environment.production;

  public readonly createUserEndpoint: string = 'users'
  
  public readonly updateUserEndpoint: string = 'users'
  public readonly getUserListEndpoint: string = 'users'

  
  public readonly getUserByIdEndpoint: string = 'users'
  public readonly DeleteUserEndpoint: string = 'users'

  
  public readonly retrievePdfEndpoint: string = 'pdf/retrieve'
  public readonly generatePdfEndpoint: string = 'pdf/generate'

}
