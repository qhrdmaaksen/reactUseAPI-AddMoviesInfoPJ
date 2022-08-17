import React, {useState, useEffect, useCallback} from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchMoviesHandler = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			/*동적 REST API 로 서로 다른 구획으로 db 의 서로 다른 노드들에 data 를 저장할수있게해주는 설정
			* -.json 을 붙인건 Firebase 필수 요구사항*/
			const response = await fetch('https://react-http-d5583-default-rtdb.firebaseio.com/movies.json');
			if (!response.ok) {
				throw new Error('데이터를 가져오는데 실패하였습니다.!');
			}

			const data = await response.json();
			console.log('fetchMoviesHandler data :::', data)

			const transformedMovies = data.results.map((movieData) => {
				return {
					/*id 는 Firebase 에 의하여 자동 추가됨*/
					title: movieData.title,
					openingText: movieData.opening_crawl,
					releaseDate: movieData.release_date,
				};
			});
			setMovies(transformedMovies);
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchMoviesHandler();
	}, [fetchMoviesHandler]);

	async function addMovieHandler(movie) {
		console.log(movie);
		setIsLoading(true);
		setError(null)
		try {
			/*POST 요청을 사용하려면 두 번째 인자를 이용해 외부로 전송하는 요청을 지정함 (method key 등)*/
			const response = await fetch('https://react-http-d5583-default-rtdb.firebaseio.com/movies.json', {
				method: 'POST',
				/*body 는 js 의 객체가아닌 JSON 데이터를 필요로함
				* -stringify  는 객체나 배열을 JSON 형식으로 바꿔줌*/
				body: JSON.stringify(movie),
				/*헤더가 없어도 요청은 정상적으로 처리해주지만, 요청을 받는 대다수 API 들은 헤더를 필요로함, 헤더를 통해 어떤 컨텐츠가 전달되는지 알수있기때문*/
				headers: {
					'Content-Type': 'application/json'
				}
			})
			if (!response.ok) {
				throw new Error('데이터를 보내는데 실패하였습니다.')
			}
			/*데이터를 가져옴, Firebase 가 전달하는 데이터는 JSON 형식*/
			const data = await response.json()
			console.log(data)
		} catch (error) {
			setError(error.message)
		}
		setIsLoading(false)
	}

	let content = <p>영화를 찾을 수 없습니다.</p>;

	if (movies.length > 0) {
		content = <MoviesList movies={movies}/>;
	}

	if (error) {
		content = <p>{error}</p>;
	}

	if (isLoading) {
		content = <p>Loading...</p>;
	}

	return (
			<React.Fragment>
				<section>
					<AddMovie onAddMovie={addMovieHandler}/>
				</section>
				<section>
					<button onClick={fetchMoviesHandler}>영화 정보 불러오기</button>
				</section>
				<section>{content}</section>
			</React.Fragment>
	);
}

export default App;
