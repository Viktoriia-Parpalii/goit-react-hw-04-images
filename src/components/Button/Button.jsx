export const Button = ({ fetchMoreImages }) => {
  return (
    <button type="button" className="Button" onClick={fetchMoreImages}>
      Load more
    </button>
  );
};
