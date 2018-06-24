# Objective
1. Unit Testing continued 
2. Code coverage
3. End-to-End Testing
4. Package

# HTTP Testing
The `HttpClientTestingModule` is an Angular module that just configures a test backend for your HTTP request. You have to configure your test to import and use it, but then it just handles the request, and you don't really have to think about it much again. You will have a little more interaction with the `HttpTestingController` class. It creates mock HTTP requests for the requests made in your app, and includes methods that lets you specify the `HttpResponse` that should be returned by the mock request. You can write tests against the mock requests, as well as how your application code processed the response returned by the mock request. 

### Configure TestBed
data.service.spec.ts
```typescript
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
```

### Test DataService
```typescript
 it('should be created', () => {
    expect(service).toBeTruthy();
  });
```

### Should return all the posts
```typescript
  it('should return all the posts', () => {
    service.posts().subscribe((posts: Post[]) => {
      expect(posts.length).toBe(3);
    });
    const postsRequest: TestRequest = httpTestingController.expectOne('http://localhost:3000/posts');

    // Back in my code, I'm going to test that the HTTP request made by
    // GET all posts used the GET HTTP verb.
    expect(postsRequest.request.method).toBe('GET');

    postsRequest.flush(mockData);

    // This tests that all HTTP requests have been handled,
    // and that there are none pending. If there were, then that would also cause the test to fail.
    httpTestingController.verify();
  });
```
We can also `httpTestingController.verify();` method to `afterEach`, as it is required for all the tests.
```typescript
  afterEach(() => {
    httpTestingController.verify();
  });
```
**Todo** : Test other methods of DataService.
