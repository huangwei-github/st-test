import { Injectable } from '@angular/core';
import { LazyService } from '@delon/util';

@Injectable()
export class StartupService {
  constructor(private lazy: LazyService) { }
  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.lazy.load([
        'https://cdnjs.cloudflare.com/ajax/libs/ajv/8.1.0/ajv.min.js',
      ])
        .then(() => resolve(null));
    });
  }
}

export function StartupServiceFactory(startupService: StartupService): Function {
  return () => startupService.load();
}