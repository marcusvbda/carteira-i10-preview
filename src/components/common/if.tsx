interface IProps {
    condition: any;
    children: JSX.Element;
}

export default function If({ condition, children }: IProps) {
    return condition ? children : <></>;
}
