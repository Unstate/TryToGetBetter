import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useFormHandler = <T>(
    initialData: Partial<T>,
    apiCall: (data: T) => Promise<void>,
    redirectPath?: string
) => {
    const [data, setData] = useState<Partial<T>>(initialData);
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (data) {
            await apiCall(data as T);
            if (redirectPath) {
                navigate(redirectPath);
            }
        } else {
            console.error("Данные отсутствуют");
        }
    };

    const reset = () => {
        setData({})
    }

    return { reset, data, handleChange, handleSubmit };
};
