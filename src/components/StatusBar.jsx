const StatusBar = ({ status }) => {
  return (
    <nav
      className={`navbar navbar-expand-lg container-fluid mb-5 ${
        status ? "Done" : "InProgress"
      }`}
    >
      {status ? "Done" : "In Progress"}
    </nav>
  );
};
export default StatusBar
