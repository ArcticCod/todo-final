export default function AddNew({ setModal }) {
  return (
    <div className="add-new">
      <button
        className="add-new-text"
        onClick={() => {
          setModal(true);
        }}
      >
        + Add New Project
      </button>
    </div>
  );
}
