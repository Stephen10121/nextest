export type Notification = {
  show: boolean;
  status: "alert" | "success" | "default";
  message: string;
};

const NotificationAlert = ({ status, message }: { status: "alert" | "success" | "default", message: string }) => {
  return (
    <h1>
      {status}
      {message}
    </h1>
  );
}

export default NotificationAlert;