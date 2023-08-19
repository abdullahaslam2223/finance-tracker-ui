import { Bars } from 'react-loader-spinner';

function Loader() {
    return(
        <div className='d-flex justify-content-center align-items-center' style={{minHeight: "70vh"}}>
            <div className='text-center'>
                <Bars
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                />
            </div>
        </div>
    );
}

export default Loader;