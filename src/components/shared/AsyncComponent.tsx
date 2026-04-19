import * as React from "react";
import Loading from "./Loading";

interface Props {
  mockDelay?: number;
  importStatement: Promise<{ default: React.ComponentType<any> }>;
}

interface State {
  error: Error | null;
  hasError: boolean;
  info: React.ErrorInfo | null;
}

class AsyncComponent extends React.Component<Props, State> {
  state: State = {
    error: null,
    hasError: false,
    info: null,
  };

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ error, info, hasError: true });
  }

  render() {
    const { error, info } = this.state;

    return this.state.hasError && error && info ? (
      <div>
        <h1>you broke it doofus!</h1>
        <p>{error.message}</p>

        <p>
          {(info.componentStack ?? "").split("\n").map((i: React.ReactNode, key: number) => (
            <span key={key}>
              {i}
              <br />
            </span>
          ))}
        </p>
      </div>
    ) : (
      <AsyncLoader mockDelay={this.props.mockDelay} importStatement={this.props.importStatement} />
    );
  }
}

const AsyncLoader: React.FC<Props> = (props) => {
  const { mockDelay, importStatement } = props;
  const delay = typeof mockDelay === "number" ? mockDelay : 0;
  const [Item, setItem] = React.useState<React.ComponentType | null>(null);

  React.useEffect(() => {
    let isActive = true;

    const loadItem = async () => {
      const [moduleExports] = await Promise.all([
        importStatement,
        new Promise<void>((resolve) => setTimeout(resolve, delay)),
      ]);

      if (isActive) {
        setItem(() => moduleExports.default);
      }
    };

    void loadItem();

    return () => {
      isActive = false;
    };
  }, [delay, importStatement]);

  if (!Item) {
    return <Loading />;
  }

  return (
    <React.Suspense fallback={<Loading />}>
      <Item />
    </React.Suspense>
  );
};

export default AsyncComponent;
