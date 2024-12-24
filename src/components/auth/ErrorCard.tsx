import { CardWrapper } from "./CardWrapper";
import { BsExclamationTriangle } from "react-icons/bs";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong."
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center text-xl">
        <BsExclamationTriangle className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
