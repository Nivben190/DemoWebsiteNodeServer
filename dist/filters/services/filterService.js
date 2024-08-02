"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFilter = exports.deleteFilter = exports.updateFilter = exports.getFilters = void 0;
const firebase_1 = require("../../DataAccess/firebase");
const getFilters = async () => {
    try {
        return await (0, firebase_1.getDataByCollectionName)('filters');
    }
    catch (error) {
        console.error('Error getting filters:', error);
    }
};
exports.getFilters = getFilters;
const updateFilter = async (filterId, name) => {
    try {
        await (0, firebase_1.updateDocById)(filterId, {
            collection: 'filters',
            name: name
        });
    }
    catch (error) {
        console.error('Error updating filter:', error);
    }
};
exports.updateFilter = updateFilter;
// Delete a document from the collection
const deleteFilter = async (filterId) => {
    try {
        await (0, firebase_1.deleteDocById)(filterId, 'filters');
        console.log('Filter deleted successfully!');
    }
    catch (error) {
        console.error('Error deleting filter:', error);
    }
};
exports.deleteFilter = deleteFilter;
const addFilter = async (filterData) => {
    try {
        const dataToAdd = {
            name: filterData,
            createDate: new Date()
        };
        await (0, firebase_1.add)(dataToAdd, 'filters');
    }
    catch (error) {
        console.error('Error adding filter:', error);
    }
};
exports.addFilter = addFilter;
