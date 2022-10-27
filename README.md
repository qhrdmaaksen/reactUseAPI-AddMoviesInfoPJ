# reactUseAPI-AddMoviesInfoPJ
## 영화 정보 api 등록 및 영화 정보 api 가져오기

```js

영화 정보 프로젝트
1. 영화 정보 등록
2. 영화 정보 가져오기
3. 영화 정보 목록 출력하기

React CSS Html

Components 폴더
  AddMovie.js : 영화 정보 추가 form 컴포넌트
  Movie.js : 영화 아이템을 props 로 받을 컴포넌트
  MovieList.js : 영화 정보를 리스트로 만들어줄 컴포넌트
==================================================
App.js : 영화 정보 추가 및 불러오기 api 로직 작성 및 영화 목록 , 영화 추가 출력해줄 컴포넌트

Function
  AddMovie.js
    submitHandler : useRef 로 영화 제목, 영화 정보, 출시일 변경 시
      이벤트 값을 받아 제출해줄 함수
    filteredExpenses : 선택된 연도에 따른 데이터 출력 함수
  App.js
    fetchMoviesHandler : 데이터 서버에서 api 로 영화 정보를 가져올 함수
    addMovieHandler : 영화 정보를 데이터 서버에 api 로 보내줄 함수
  
```

영화 정보 사이트 첫 화면

![20221028_054235](https://user-images.githubusercontent.com/75942405/198396166-5932f160-2c9f-4603-a4e9-44b2d7471706.png)

영화 정보 등록 후 데이터 서버에 등록된 영화 정보

![20221028_054225](https://user-images.githubusercontent.com/75942405/198396270-a0b76cc7-6ea2-4abf-a908-95cf4a427f96.png)

영화 정보 불러오기로 리스트 출력된 화면

![20221028_054248](https://user-images.githubusercontent.com/75942405/198396281-a0f7949e-570b-4838-999a-4fac04165082.png)

