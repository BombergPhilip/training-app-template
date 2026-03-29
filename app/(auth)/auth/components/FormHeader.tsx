interface IFormHeaderProps {
    title: string;
    description: string;
}

const FormHeader = ({ title, description }: IFormHeaderProps) => {
    return (
        <div className="flex flex-col gap-1 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
    );
};

export default FormHeader;
