import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-collection-grid',
  templateUrl: './collection-grid.component.html',
  styleUrls: ['./collection-grid.component.css']
})
export class CollectionGridComponent implements OnInit {

  images: string[] = [];

  ngOnInit(): void {
    const imageCount = 286; // Replace with the actual number of images
    for (let i = 1; i <= imageCount; i++) {
      const imageNumber = i.toString().padStart(3, '0'); // Pad the number with leading zeros
      this.images.push(`assets/images/A1_${imageNumber}_EN.webp`);
    }
  }
}