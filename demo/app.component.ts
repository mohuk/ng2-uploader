import { Component, OnInit, NgZone, EventEmitter } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <input type="file"
          ngFileSelect
          [options]="extendedOptions"
          [events]="uploadEvents"
          (onUpload)="handleUpload($event)"
          (onPreviewData)="handlePreviewData($event)"
          (onUploadRejected)="handleRejected($event)">

    <p *ngIf="previewData && !response">
      <button class="button" (click)="startUpload()">Start Upload</button>
      <img [src]="previewData" alt="Preview Data" class="preview-img">
    </p>
    <div>
      Response: {{ response | json }}
    </div>

    <div>
      Progress: {{ progress }}%
    </div>
  `
})
export class AppComponent implements OnInit {
  previewData: any;
  progress: number = 0;
  response: any;
  extendedOptions: any = {
    url: 'api/upload',
    calculateSpeed: true,
    filterExtensions: true,
    allowedExtensions: ['image/png', 'image/jpeg'],
    autoUpload: true,
    previewUrl: true,
    maxSize: 6400,
    data: {
      userId: 12, isAdmin: true
    },
    customHeaders: {
      'custom-header': 'value'
    },
    authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UifQ.xuEv8qrfXu424LZk8bVgr9MQJUIrp1rHcPyZw_KSsds',
    authTokenPrefix: 'Bearer'
  };;

  private basicOptions: Object;
  private uploadEvents: EventEmitter<any> = new EventEmitter();

  constructor(
    private zone: NgZone
  ) { }

  ngOnInit() {
  }

  handleUpload(data: any): void {
    this.zone.run(() => {
      this.response = data;
      this.progress = Math.floor(data.progress.percent / 100);
    });
  }

  handlePreviewData(data: any): void {
    this.previewData = data;
  }

  startUpload() {
    this.uploadEvents.emit('startUpload');
  }

  handleRejected(data: any) {
    console.log(data);
  }
}
