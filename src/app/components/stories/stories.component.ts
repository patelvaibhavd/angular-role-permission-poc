import { Component, OnInit } from '@angular/core';
import { StoriesService } from 'src/app/core/services/stories.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {
  stories = [];

  constructor(
    private _storiesService: StoriesService
  ) { }

  ngOnInit(): void {
    this.getStories();
  }

  getStories() {
    this._storiesService.getStories().subscribe((res) => {
      if (res && res.hits && res.hits.length) {
        this.stories = res.hits;
      }
    }, (error) => {
      console.log(error)
    })
  }

}
