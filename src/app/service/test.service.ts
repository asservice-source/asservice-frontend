
import { Injectable } from '@angular/core';

export class TestService {

  private _count = 0;

  get count(): number {
    return this._count;
  }

  constructor() { }

  public increase() {
    this._count++;
  }

  public decrease() {
    this._count--;
  }

}