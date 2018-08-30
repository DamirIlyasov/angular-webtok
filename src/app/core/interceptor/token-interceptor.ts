/******************************************************************************
 *                                                                            *
 * Copyright (c) 2018 by ACI Worldwide Inc.                                   *
 * All rights reserved.                                                       *
 *                                                                            *
 * This software is the confidential and proprietary information of ACI       *
 * Worldwide Inc ("Confidential Information"). You shall not disclose such    *
 * Confidential Information and shall use it only in accordance with the      *
 * terms of the license agreement you entered with ACI Worldwide Inc.         *
 *                                                                            *
 ******************************************************************************/

import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { StorageService } from '../service/storage.service';
import { Observable } from 'rxjs';


const HEADER_AUTHORIZATION = 'Authorization';
const AUTHORIZATION_HEADER_PREFIX = 'JWT';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {
  }

  intercept(request: HttpRequest<Object>, next: HttpHandler): Observable<HttpEvent<Object>> {
    return next.handle(this.addToken(request));
  }

  private addToken(request: HttpRequest<Object>): HttpRequest<Object> {
    const token = this.storageService.getToken();
    if (!token) {
      return request;
    }
    return request.clone({
      setHeaders: {
        [HEADER_AUTHORIZATION]: `${AUTHORIZATION_HEADER_PREFIX} ${token}`
      }
    });
  }
}
