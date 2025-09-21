declare module 'react-input-mask' {
  interface InputMaskProps extends React.InputHTMLAttributes<HTMLInputElement> {
    mask: string;
    alwaysShowMask?: boolean;
    maskChar?: string | null;
    beforeMaskedValueChange?: (
      newState: { value: string; selection: { start: number; end: number } },
      oldState: { value: string; selection: { start: number; end: number } },
      userInput: string,
      maskOptions: any
    ) => { value: string; selection: { start: number; end: number } };
  }

  const InputMask: React.FC<InputMaskProps>;
  export default InputMask;
}
