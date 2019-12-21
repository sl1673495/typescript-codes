// https://artsy.github.io/blog/2018/11/21/conditional-types-in-typescript/

type Action =
  | {
      type: 'INIT';
    }
  | {
      type: 'SYNC';
      emailAddress: number;
    }
  | {
      type: 'LOG_IN';
      emailAddress: string;
    }
  | {
      type: 'LOG_IN_SUCCESS';
      accessToken: string;
    };

type ActionType = Action['type'];

// And let's say that any actions that don't require
// extra parameters are 'simple' actions.
declare function dispatch(type: SimpleActionType): void;
// this signature is just like before
declare function dispatch<T extends ActionType>(
  type: T,
  args: ExtractActionParameters<Action, T>,
): void;

type ExtractActionParameters<A, T> = A extends { type: T } ? ExcludeTypeField<A> : never;

type ExcludeTypeKey<K> = K extends 'type' ? never : K;

type ExcludeTypeField<A> = { [K in ExcludeTypeKey<keyof A>]: A[K] };

type Test = ExcludeTypeField<Action>;
// => { emailAddress: string }

type ExtractSimpleAction<A> = A extends any ? ({} extends ExcludeTypeField<A> ? A : never) : never;

type SimpleActionType = ExtractSimpleAction<Action>['type'];

dispatch('INIT');

type EmailAddress = string | string[] | null | undefined;

type NonNullableEmailAddress = NonNullable<EmailAddress>;

type A = null extends string | null ? 'asd': 'dsa'