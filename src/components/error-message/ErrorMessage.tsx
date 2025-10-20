const ErrorMessage = ({ message = "" }: { message: string | undefined }) => {
  return message && <span className="text-red-400">{message}</span>;
};
export default ErrorMessage;
