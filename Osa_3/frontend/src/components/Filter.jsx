const Filter = (props) => {
    return (
      <div>
        <p>
            filter shown with <input value={props.newFilter} onChange={props.handleFilterChange} />
        </p>
      </div>
    )
}

export default Filter