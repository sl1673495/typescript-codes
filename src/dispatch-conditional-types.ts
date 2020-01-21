type ActionsForDispatch =
  | {
      type: 'INIT';
    }
  | {
      type: 'SYNC';
    }
  | {
      type: 'LOG_IN';
      emailAddress: string;
    }
  | {
      type: 'LOG_IN_SUCCESS';
      accessToken: string;
    };

declare function dispatch(action: Action): void;

dispatch({
  type: 'INIT',
});

dispatch({
  type: 'LOG_IN',
  emailAddress: '123',
});
