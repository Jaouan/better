type ErrorProps = {
  message: string;
};
export const Error = ({ message }: ErrorProps) => (
  <div className="w-fit m-auto my-8 text-center bg-error rounded-lg p-2 px-4">
    {message}
  </div>
);
