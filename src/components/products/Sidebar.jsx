import "./Sidebar.scss"

export default function Sidebar({ selected, handleSelect, categories }) {

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
                />
                <label htmlFor={id}>{name}</label>
              </li>
            })
          }
      </nav>
    </div>
  );
}