// https://blog.andrewbran.ch/expressive-react-component-apis-with-discriminated-unions/
interface CommonSelectProps {
  placeholder?: string;
}

interface SingleSelectPropsFragment {
  multiple: false;
  value: string;
  onChange: (newValue: string[]) => void;
}

interface MultipleSelectPropsFragment {
  multiple: true;
  value: string[];
  onChange: (newValue: string[]) => void;
}

interface UngroupedSelectPropsFragment {
  grouped?: false;
  options: string[];
}

type OptionGroup = {
  title: string;
  options: string[];
};

interface GroupedSelectPropsFragment {
  grouped: true;
  options: OptionGroup[];
  renderGroup: (group: OptionGroup) => React.ReactNode;
}

// 利用集合来避免穷举所有组合
type SelectProps = CommonSelectProps &
  (SingleSelectPropsFragment | MultipleSelectPropsFragment) &
  (UngroupedSelectPropsFragment | GroupedSelectPropsFragment);

// 这样 就可以通过传入的 grouped 来区分是选择 UngroupedSelectPropsFragment 还是 GroupedSelectPropsFragment
// multiple 也是同理
function Select<T> (props: T): void
