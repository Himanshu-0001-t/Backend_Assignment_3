import Card from './components/card';

function App() {
  return (
    <main className='m-auto p-5'>
      <div className='grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 '>
        <Card />
      </div>
    </main>
  );
}

export default App;
