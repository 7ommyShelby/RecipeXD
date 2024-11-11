import './App.css'
import Details from './comp/Details';
import Home from './comp/Home';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { store } from './comp/reduxtk/store';
import { Provider } from 'react-redux';
import Favourites from './comp/Favourites';
import Navbar from './comp/Navbar';

function App() {

  // 14ee1985c92d6f3175f067b22b0f918f



  // const myfun = (...args) => {
  //   args.map((e) => {
  //     // console.log(e); //gives an array of arguments
  //   })
  //   // console.log(...args);

  // }
  // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  // console.log(...arr);
  // myfun(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);



  return (
    <>
      <Provider store={store}>

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<main className='bg-neutral-800 h-screen min-h-fit w-full text-gray-100'>
              <Navbar />
              <Home />
            </main>} />
            <Route path='/:id/details' element={<Details />} />
            <Route path='/fav' element={<Favourites />} />
          </Routes>
        </BrowserRouter>

      </Provider>
    </>
  )
}

export default App
