import React from 'react';

const SelectCountry = (props)=>{
  
  const {
    hideSelect,
    countries,
    handleSelect
  } = props;
  
  return(
  <div className="seleCont">
    <div className="seleHead">
      <h3>Add Country</h3>
      <img width='24px'onClick={hideSelect} className='invert' src='/svg/xmark-regular.svg' />
    </div>
    {countries.map((country, i) => (
      <div className="sele" key={country.id} onClick={()=>{handleSelect(country.id, country.name, country.country )}}>
        <p>{country.country}</p>
      </div>
    ))}

  </div>
  )
}

export default SelectCountry;