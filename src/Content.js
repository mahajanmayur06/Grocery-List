import ItemList from './ItemLists';
// reacts needs key for each list item
// <> this is called fragment
const Content = ({ items, handleCheck, handleDelete }) => {
    return (
        <> 
        {items.length ? (
            <ItemList
                items = {items}
                handleCheck = {handleCheck}
                handleDelete = {handleDelete}
            />
        ) : (
            <p style={{ marginTop: '2rem' }}>Your list is empty.</p>
        )}
        </>
    );
};

export default Content;
