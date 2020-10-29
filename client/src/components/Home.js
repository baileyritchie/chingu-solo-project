import Nav from './Nav';
import Question from './Question';
import Answer from './Answer';

function Home () {
  return <>
    <div className="">
        <header className="">
          <Nav/>
          <div className="flex flex-wrap items-center justify-center h-screen bg-gray-200">
            <div className="flex flex-wrap items-center justify-center m-4 py-4 bg-gray-100 ">
              <Question/>
              <ul className="flex flex-wrap items-center justify-center px-4">
              {[1,2,3,4].map((val) => <li className="w-2/4 py-6"><Answer/></li>)}
            </ul>
            </div>
          </div>
        </header>
      </div>
  </>
}

export default Home;