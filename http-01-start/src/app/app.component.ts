import { PostsService } from "./posts.service";
import { Post } from "./post.model";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  // INJECT HttpClient INTO CONSTRUCTOR
  constructor(private http: HttpClient, private postsService: PostsService) {}

  // FETCH POSTS AUTOMATICALLY ON LOAD USING NGONINIT
  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe((errorMessage) => {
      this.error = errorMessage;
    });

    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      (error) => {
        this.isFetching = false;
        this.error = error.message;
      }
    );
  }

  onCreatePost(postData: Post) {
    // Send Http request
    // this.http
    //   .post<{ name: string }>(
    //     "https://ng-complete-angular-b34c8-default-rtdb.firebaseio.com/posts.json",
    //     postData
    //   )
    //   .subscribe((responseData) => {
    //     console.log(responseData);
    //   });
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request, and error handling
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      (error) => {
        this.isFetching = false;
        this.error = error.message;
      }
    );
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  // private fetchPosts() {
  //   this.isFetching = true;
  //   // this.http
  //   //   .get<{ [key: string]: Post }>(
  //   //     "https://ng-complete-angular-b34c8-default-rtdb.firebaseio.com/posts.json"
  //   //   )
  //   //   .pipe(
  //   //     map((responseData) => {
  //   //       const postsArray: Post[] = [];
  //   //       for (const key in responseData) {
  //   //         if (responseData.hasOwnProperty(key)) {
  //   //           postsArray.push({ ...responseData[key], id: key });
  //   //         }
  //   //       }
  //   //       return postsArray;
  //   //     })
  //   //   )
  //   //   .subscribe((posts) => {
  //   //     this.isFetching = false;
  //   //     this.loadedPosts = posts;
  //   //   });
  // }

  onHandleError() {
    this.error = null;
  }

  // destroys, unsubscribes, prevents memory leaks
  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
