interface ListProps {
  image: string;
  title: string;
  body: string;
}

export default function List(props: ListProps) {
  return (
    <div>
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="list-row">
          <div>
            <img className="size-10 rounded-box" src={props.image} />
          </div>
          <div>
            <div>{props.title}</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              Remaining Reason
            </div>
          </div>
          <p className="list-col-wrap text-xs">{props.body}</p>
        </li>
      </ul>
    </div>
  );
}
