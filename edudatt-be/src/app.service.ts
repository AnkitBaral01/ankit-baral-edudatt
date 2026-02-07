import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      success: true,
      message: 'जय वांकल || नमः सिद्धम || जय माजीसा !!'
    };
  }
}
