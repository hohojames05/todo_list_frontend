/*tslint:disable:no-any*/
export interface ApiResponse {
    data: any;
    errors: string;
    error?: { errors: string };
    status: any;
    meta?: any;
  }
  