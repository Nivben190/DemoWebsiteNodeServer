import { add, deleteDocById, getDataByCollectionName, updateDocById } from "../../DataAccess/firebase";


export const getFilters = async () => {
    try {
        return await getDataByCollectionName('filters');
    } catch (error) {
        console.error('Error getting filters:', error);
    }
} ;

export const updateFilter = async (filterId: string, name: any) => {
    try {
        await updateDocById(filterId, {
            collection: 'filters',
            name: name
        });
    } catch (error) {
        console.error('Error updating filter:', error);
    }
};

// Delete a document from the collection
export const deleteFilter = async (filterId: string) => {
    try {
        await deleteDocById(filterId, 'filters');
        console.log('Filter deleted successfully!');
    } catch (error) {
        console.error('Error deleting filter:', error);
    }
};


export const addFilter = async (filterData: any) => {
    try {
        const dataToAdd=
        {
            name: filterData,
            createDate: new Date()

        }
        await add(dataToAdd, 'filters');
    } catch (error) {
        console.error('Error adding filter:', error);
    }
};
