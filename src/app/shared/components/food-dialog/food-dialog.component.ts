import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FoodInterface } from '../../../core/models/food.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { APIDescriptionInterface } from '../../../core/models/apiDescription.interface copy';
import 'hammerjs';

@Component({
  selector: 'app-food-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food-dialog.component.html',
  styleUrl: './food-dialog.component.sass'
})
export class FoodDialogComponent implements OnInit{

  safeHtmlContent: SafeHtml | null = null;

  constructor(
    public dialogRef: MatDialogRef<FoodDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: FoodInterface, 
    private http: HttpClient,
    private sanitizer: DomSanitizer) 
  {
   
  }

  ngOnInit(): void {
      this.fetchHtmlContent();
  }

  fetchHtmlContent() {
    this.http.get<APIDescriptionInterface>(`https://amperoid.tenants.foodji.io/products/${this.data.id}/description`)
      .pipe(
        tap(response => console.log('API response:', response)),  // Log the response for debugging
        map(response => response.data),
        map(htmlContent => this.sanitizer.bypassSecurityTrustHtml(htmlContent))
      )
      .subscribe(
        (safeHtml: SafeHtml) => {
          console.log(safeHtml);
          this.safeHtmlContent = safeHtml},
        (error) => console.error('Error fetching HTML content:', error)
      );
  }

  close(): void {
    this.dialogRef.close();
  }
}


