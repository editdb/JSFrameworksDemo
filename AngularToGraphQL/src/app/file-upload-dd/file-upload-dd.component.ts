import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';


@Component({
  selector: 'file-upload-dd',
  templateUrl: './file-upload-dd.component.html',
  styleUrls: [
    './file-upload-dd.component.css'
  ]
})
export class FileUploadDDComponent implements OnInit {
  dropZone : any;
  fileBase64 : any;
  @Output() fileUploadedEvent : EventEmitter<string> = new EventEmitter<string>();

  constructor(
  ) { }

  ngOnInit(): void {
    console.log('this.fileUploadedEvent=' + this.fileUploadedEvent);
  }

  @HostListener("dragover", ["$event"]) public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  @HostListener("dragleave", ["$event"]) public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
  
    var files = evt.dataTransfer.files; // FileList object.
    var file = files[0];
    
    // If we use onloadend, we need to check the readyState.
    var reader = new FileReader();
    var _this = this;
    console.log('this.fileUploadedEvent=' + this.fileUploadedEvent);
    _this.fileUploadedEvent = this.fileUploadedEvent;
    console.log('_this.fileUploadedEvent=' + _this.fileUploadedEvent);
    reader.onloadend = function(evt) {
      if (evt.target.readyState == FileReader.DONE) { // DONE == 2
        var fc : any = evt.target.result;

        _this.fileBase64 = btoa(fc);
        _this.fileUploadedEvent.emit(_this.fileBase64);
        
      }
    };

    reader.readAsBinaryString(file);

  }


}
