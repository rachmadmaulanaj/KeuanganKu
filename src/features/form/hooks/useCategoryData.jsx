import { useState, useEffect } from 'react'
import { getDataCategory } from '../services/categoryService'

export default function useCategoryData() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadDataCategory = async () => {
            try {
                const categoriesData = await getDataCategory();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        loadDataCategory();
    }, []);

    return { categories };
}