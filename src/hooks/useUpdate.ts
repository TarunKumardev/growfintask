import {  type ChangeEvent , useState  } from 'react';
export const useUpdateElement = <T  extends { id : number } >(element: T, updateById: (id: number, newElement: T) => void) => {
    const [updatedElement, setUpdatedElement] = useState<T>(element);

    const handleInputChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
        setUpdatedElement(prev => ({ ...prev, [name]: value } as T));
    };

    const handleSubmit = () => updateById(element.id, updatedElement);

    return { updatedElement, handleInputChange, handleSubmit };
};
