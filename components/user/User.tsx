import components from './User.module.css';

const User = (props: { name: string, type: "channel" | "name", active: boolean }) => {
  return (
    <button className={components.user}>
        <p className={components.name}>{props.name}</p>
        <div className={components.extra}>
            <div className={props.active ? components.active : components.inactive}></div>
            <p>{props.type}</p>
        </div>
    </button>
  );
}


export default User;