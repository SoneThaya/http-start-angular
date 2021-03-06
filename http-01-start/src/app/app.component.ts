import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  // INJECT HttpClient INTO CONSTRUCTOR
  constructor(private http: HttpClient) {}

  // FETCH POSTS AUTOMATICALLY ON LOAD USING NGONINIT
  ngOnInit() {
    this.fetchPosts()
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http
      .post(
        "https://ng-complete-angular-b34c8-default-rtdb.firebaseio.com/posts.json",
        postData
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts()
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http
      .get(
        "https://ng-complete-angular-b34c8-default-rtdb.firebaseio.com/posts.json"
      )
      .subscribe((posts) => {
        console.log(posts);
      });
  }
}
