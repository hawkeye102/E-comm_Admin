const Progressbar = ({ value, type }) => {
    const getColorClass = () => {
      switch (type) {
        case 'success':
          return 'bg-green-500';
        case 'warning':
          return 'bg-yellow-500';
        case 'error':
          return 'bg-red-500';
        default:
          return 'bg-blue-500';
      }
    };
  
    return (
      <div className='w-[100px] h-[8px] overflow-hidden rounded-sm bg-[#f1f1f1] ml-10'>
        <span
          className={`h-full block ${getColorClass()}`}
          style={{ width: `${value}%` }}
        ></span>
      </div>
    );
  };
  
  export default Progressbar;
  