import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnChanges {
  @Input() pdfId: any;
  pdfSrc: SafeResourceUrl | null = null;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pdfId'] && this.pdfId) {
      this.loadPdf(this.pdfId);
    }
  }

  loadPdf(id: any): void {
    const apiUrl = `http://localhost:3000/pdf/retrieve/${id}`;
    this.http.get(apiUrl, { responseType: 'arraybuffer' }).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
    });
  }
}
