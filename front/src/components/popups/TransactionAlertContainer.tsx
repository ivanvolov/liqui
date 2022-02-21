import { ToastContainer } from "react-toastify";

export const TransactionAlertContainer = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export enum TransactionAlertStatus {
  Failed,
  Started,
  Succeeded,
}

export const getTransactionAlertMessage = (
  type: TransactionAlertStatus,
  msg: string
) => {
  if (type === TransactionAlertStatus.Failed)
    return `The ${msg} transaction failed 🤯`;
  if (type === TransactionAlertStatus.Started)
    return `The ${msg} transaction is executing, please wait 👌`;
  if (type === TransactionAlertStatus.Succeeded)
    return `The ${msg} transaction succeeded 😏`;
};
