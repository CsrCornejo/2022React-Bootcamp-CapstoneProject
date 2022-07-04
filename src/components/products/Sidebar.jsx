import "./Sidebar.scss"

export default function Sidebar({ selected, handleSelect, categories, handleClear }) {

  const isSelected = (category) => selected.includes(category) ? "selected" : "not-selected"

  return (
    <div className="Sidebar">
      <div className="Sidebar-title">Categories</div>
      <nav className="Sidebar-content">
          {
            categories && categories.map(({ id, data: { name }}) => {
              return <li className={isSelected(id)} key={id}>
                <input
                  onChange={handleSelect}
                  type="checkbox"
                  value={id}
                  id={id}
                  checked={isSelected(id) === "selected"}
                />
                <label htmlFor={id}>{name}</label>
              </li>
            })
          }
          {
            selected && selected.length > 0 && (
              <button
                className="Sidebar-content_action"
                onClick={handleClear}
              >
                Clear
              </button>
            )
          }
      </nav>
    </div>
  );
}