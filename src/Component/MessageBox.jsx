import Alert from "react-bootstrap/Alert";

export default function MessageBox(props) {
  return <Alert variant={props.variant || "dark"}>{props.children}</Alert>;
}
