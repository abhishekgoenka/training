import { TestBed, inject } from '@angular/core/testing';
import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Post } from './model/post';
import { ApplicationError } from './model/application-error';

describe('DataService', () => {
  let httpTestingController: HttpTestingController;
  let service: DataService;

  const mockData: Post[] = [
    { id: 1, userId: 1, title: 'dummy title 1', body: 'dummy body 1' },
    { id: 2, userId: 1, title: 'dummy title 2', body: 'dummy body 2' },
    { id: 3, userId: 2, title: 'dummy title 3', body: 'dummy body 3' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(DataService);
  });

  afterEach(() => {
    // This tests that all HTTP requests have been handled,
    // and that there are none pending. If there were, then that would also cause the test to fail.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all the posts', () => {
    service.posts().subscribe((posts: Post[]) => {
      expect(posts.length).toBe(3);
    });
    const postsRequest: TestRequest = httpTestingController.expectOne('http://localhost:3000/posts');

    // Back in my code, I'm going to test that the HTTP request made by
    // GET all posts used the GET HTTP verb.
    expect(postsRequest.request.method).toBe('GET');

    postsRequest.flush(mockData);
  });

  it('should return HTTP Error', () => {
    service.posts().subscribe(() =>  fail('this should have been an error'),
    (error: ApplicationError) => {
      expect(error.errorNumber).toBe(100);
      expect(error.errorMsg).toBe('Server Error');
    });
    const postsRequest: TestRequest = httpTestingController.expectOne('http://localhost:3000/posts');

    postsRequest.flush('error', {
      status: 500,
      statusText: 'Server Error'
    });
  });
});
