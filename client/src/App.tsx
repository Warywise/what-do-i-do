import './App.scss';
import Header from './components/header';
import BoardsBox from './components/board/BoardsBox';
import InfoBar from './components/InfoBar';

function App() {

  return (
    <>
      <Header />
      <div>
        <BoardsBox />
      </div>
      <InfoBar />
    </>
  )
}

export default App
