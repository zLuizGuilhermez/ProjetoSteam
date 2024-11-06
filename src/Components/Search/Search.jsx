import searchButton from '../../assets/search-w.png'
import '../Search/Search.css'

const Search = () => {
    return (
        <div className='searchBox'>
            <div className='search'>
                <input type="text" placeholder='Search your info' />
                <img src={searchButton} alt='Search icon' />
            </div>    
        </div>
    );
};

export default Search